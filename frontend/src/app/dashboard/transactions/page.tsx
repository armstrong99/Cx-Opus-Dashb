import TransactionsClientPage from "@/app/dashboard/transactions/transactions-client";
import { listTransactionsAction } from "@/app/actions/transactions";

export default async function TransactionsPage() {
  const transactionsResult = await listTransactionsAction();
  const initialTransactions = transactionsResult.success ? transactionsResult.data : [];

  return <TransactionsClientPage initialTransactions={initialTransactions} />;
}
