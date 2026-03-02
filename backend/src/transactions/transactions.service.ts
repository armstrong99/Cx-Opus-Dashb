import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
}

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];

  findAll(): Transaction[] {
    return this.transactions;
  }

  findOne(id: string): Transaction {
    const transaction = this.transactions.find((t) => t.id === id);
    if (!transaction) {
      throw new NotFoundException(`Transaction #${id} not found`);
    }
    return transaction;
  }

  create(dto: CreateTransactionDto): Transaction {
    const transaction: Transaction = {
      id: Date.now().toString(),
      ...dto,
      date: new Date(dto.date),
    };
    this.transactions.push(transaction);
    return transaction;
  }

  remove(id: string): void {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Transaction #${id} not found`);
    }
    this.transactions.splice(index, 1);
  }
}
