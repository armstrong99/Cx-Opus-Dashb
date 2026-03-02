export class CreateTransactionDto {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}
