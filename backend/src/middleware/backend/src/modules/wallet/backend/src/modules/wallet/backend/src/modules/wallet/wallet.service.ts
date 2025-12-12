import { prisma } from "../../config/db";

export async function getBalance(userId: string) {
  const wallet = await prisma.user_wallets.findUnique({
    where: { user_id: userId },
  });

  if (!wallet) {
    // If wallet doesn't exist, create one
    return prisma.user_wallets.create({
      data: { user_id: userId, balance: 0 },
    });
  }

  return wallet;
}

export async function getTransactions(userId: string, limit: number, offset: number) {
  return prisma.wallet_transactions.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    take: limit,
    skip: offset,
  });
}

export async function transfer(senderId: string, receiverEmail: string, amount: number, description: string) {
  if (amount <= 0) throw new Error("Invalid amount");

  const receiver = await prisma.users.findUnique({
    where: { email: receiverEmail }
  });

  if (!receiver) throw new Error("Receiver not found");

  if (receiver.id === senderId) {
    throw new Error("You cannot transfer to yourself");
  }

  const senderWallet = await prisma.user_wallets.findUnique({
    where: { user_id: senderId },
  });

  if (!senderWallet || senderWallet.balance < amount) {
    throw new Error("Insufficient balance");
  }

  return prisma.$transaction(async (tx) => {

    // Deduct from sender
    await tx.user_wallets.update({
      where: { user_id: senderId },
      data: { balance: { decrement: amount } },
    });

    await tx.wallet_transactions.create({
      data: {
        user_id: senderId,
        wallet_id: senderWallet.id,
        amount,
        type: "payment",
        net_amount: amount,
        status: "completed",
        payment_method: "wallet",
        description,
      },
    });

    // Add to receiver
    const receiverWallet = await tx.user_wallets.upsert({
      where: { user_id: receiver.id },
      update: { balance: { increment: amount } },
      create: { user_id: receiver.id, balance: amount },
    });

    await tx.wallet_transactions.create({
      data: {
        user_id: receiver.id,
        wallet_id: receiverWallet.id,
        amount,
        type: "reward",
        net_amount: amount,
        status: "completed",
        payment_method: "wallet",
        description: `Received from ${senderId}`,
      },
    });

    return { success: true, transferred: amount };
  });
}
