"use server";

import {
  createTransaction,
  deleteTransaction,
  findAllTransactions,
  findTransactionById,
  type CreateTransactionInput,
  type TransactionRecord,
  type TransactionStatus,
} from "@/lib/server/transactions-store";

export type TransactionView = {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  method: string;
};

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

function toViewModel(transaction: TransactionRecord): TransactionView {
  return {
    id: transaction.id,
    merchant: transaction.description,
    category: transaction.category,
    date: dateFormatter.format(transaction.date),
    amount: transaction.type === "income" ? transaction.amount : -transaction.amount,
    status: transaction.status,
    method: transaction.method,
  };
}

export async function listTransactionsAction(): Promise<ActionResult<TransactionView[]>> {
  const transactions = findAllTransactions().map(toViewModel);
  return {
    success: true,
    data: transactions,
  };
}

export async function getTransactionAction(id: string): Promise<ActionResult<TransactionView>> {
  const transaction = findTransactionById(id);
  if (!transaction) {
    return {
      success: false,
      error: `Transaction #${id} not found`,
    };
  }

  return {
    success: true,
    data: toViewModel(transaction),
  };
}

export async function createTransactionAction(
  payload: CreateTransactionInput,
): Promise<ActionResult<TransactionView>> {
  if (!payload.description.trim()) {
    return {
      success: false,
      error: "Description is required",
    };
  }

  if (!payload.date || Number.isNaN(new Date(payload.date).getTime())) {
    return {
      success: false,
      error: "A valid date is required",
    };
  }

  if (!Number.isFinite(payload.amount) || payload.amount <= 0) {
    return {
      success: false,
      error: "Amount must be greater than 0",
    };
  }

  const transaction = createTransaction(payload);

  return {
    success: true,
    data: toViewModel(transaction),
  };
}

export async function deleteTransactionAction(id: string): Promise<ActionResult<null>> {
  const removed = deleteTransaction(id);
  if (!removed) {
    return {
      success: false,
      error: `Transaction #${id} not found`,
    };
  }

  return {
    success: true,
    data: null,
  };
}
