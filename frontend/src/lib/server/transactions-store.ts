import "server-only";

export type TransactionType = "income" | "expense";
export type TransactionStatus = "Completed" | "Pending" | "Settled";

export type TransactionRecord = {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
  status: TransactionStatus;
  method: string;
};

export type CreateTransactionInput = {
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  status?: TransactionStatus;
  method?: string;
};

const transactions: TransactionRecord[] = [
  { id: "TRX-9841", type: "expense", amount: 79.0, description: "Stripe Atlas", category: "SaaS", date: new Date("2026-03-01"), status: "Completed", method: "Visa •••• 2873" },
  { id: "TRX-9837", type: "income", amount: 2400.0, description: "Client Payment - Northstar", category: "Income", date: new Date("2026-02-28"), status: "Settled", method: "Bank Transfer" },
  { id: "TRX-9822", type: "expense", amount: 312.44, description: "AWS", category: "Infrastructure", date: new Date("2026-02-27"), status: "Completed", method: "Mastercard •••• 4930" },
  { id: "TRX-9819", type: "expense", amount: 24.0, description: "Notion", category: "Productivity", date: new Date("2026-02-26"), status: "Completed", method: "Visa •••• 2873" },
  { id: "TRX-9811", type: "income", amount: 5600.0, description: "Salary - February", category: "Income", date: new Date("2026-02-25"), status: "Settled", method: "Direct Deposit" },
  { id: "TRX-9805", type: "expense", amount: 45.0, description: "Figma", category: "Design", date: new Date("2026-02-24"), status: "Pending", method: "Mastercard •••• 4930" },
  { id: "TRX-9798", type: "expense", amount: 14.4, description: "Google Workspace", category: "SaaS", date: new Date("2026-02-23"), status: "Completed", method: "Visa •••• 2873" },
  { id: "TRX-9790", type: "income", amount: 1800.0, description: "Freelance - Acme Corp", category: "Income", date: new Date("2026-02-22"), status: "Settled", method: "Bank Transfer" },
  { id: "TRX-9784", type: "expense", amount: 34.5, description: "Uber Eats", category: "Food", date: new Date("2026-02-21"), status: "Completed", method: "Visa •••• 2873" },
  { id: "TRX-9776", type: "expense", amount: 15.99, description: "Netflix", category: "Entertainment", date: new Date("2026-02-20"), status: "Completed", method: "Mastercard •••• 4930" },
];

const normalizeAmount = (amount: number) => Math.abs(amount);

const fallbackMethod = (type: TransactionType) => (type === "income" ? "Bank Transfer" : "Card");

export function findAllTransactions(): TransactionRecord[] {
  return transactions.map((transaction) => ({ ...transaction }));
}

export function findTransactionById(id: string): TransactionRecord | null {
  const transaction = transactions.find((item) => item.id === id);
  return transaction ? { ...transaction } : null;
}

export function createTransaction(input: CreateTransactionInput): TransactionRecord {
  const record: TransactionRecord = {
    id: `TRX-${Date.now()}`,
    type: input.type,
    amount: normalizeAmount(input.amount),
    description: input.description.trim(),
    category: input.category,
    date: new Date(input.date),
    status: input.status ?? "Completed",
    method: input.method?.trim() || fallbackMethod(input.type),
  };

  transactions.unshift(record);
  return { ...record };
}

export function deleteTransaction(id: string): boolean {
  const index = transactions.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  transactions.splice(index, 1);
  return true;
}
