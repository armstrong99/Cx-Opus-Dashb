"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createTransactionAction,
  type TransactionView,
} from "@/app/actions/transactions";

type TransactionStatus = "Completed" | "Pending" | "Settled";
type Transaction = TransactionView & { icon: string };

type NewTransactionForm = {
  merchant: string;
  category: string;
  amount: string;
  type: "Expense" | "Income";
  status: TransactionStatus;
  method: string;
  date: string;
};

const filters = ["All", "Income", "Expenses", "Completed", "Pending"] as const;
type Filter = (typeof filters)[number];

const categoryIcons: Record<string, string> = {
  Income: "💰",
  SaaS: "💳",
  Infrastructure: "☁️",
  Productivity: "📝",
  Design: "🎨",
  Food: "🍔",
  Entertainment: "🎬",
  Transfer: "🏦",
  Utilities: "⚡",
  Shopping: "🛍️",
};

const categoryOptions = Object.keys(categoryIcons);

const defaultForm: NewTransactionForm = {
  merchant: "",
  category: "SaaS",
  amount: "",
  type: "Expense",
  status: "Completed",
  method: "",
  date: new Date().toISOString().slice(0, 10),
};

function amountClass(amount: number) {
  return amount >= 0 ? "text-emerald-400" : "text-white";
}

function statusBadge(status: string) {
  if (status === "Pending")
    return "bg-amber-500/10 text-amber-400 ring-amber-500/20";
  if (status === "Settled")
    return "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20";
  return "bg-slate-500/10 text-slate-400 ring-slate-500/20";
}

function categoryBadge(category: string) {
  const map: Record<string, string> = {
    Income: "bg-emerald-500/10 text-emerald-400",
    SaaS: "bg-violet-500/10 text-violet-400",
    Infrastructure: "bg-orange-500/10 text-orange-400",
    Productivity: "bg-blue-500/10 text-blue-400",
    Design: "bg-pink-500/10 text-pink-400",
    Food: "bg-amber-500/10 text-amber-400",
    Entertainment: "bg-rose-500/10 text-rose-400",
    Transfer: "bg-cyan-500/10 text-cyan-400",
    Utilities: "bg-indigo-500/10 text-indigo-400",
    Shopping: "bg-fuchsia-500/10 text-fuchsia-400",
  };
  return map[category] ?? "bg-slate-500/10 text-slate-400";
}

function withIcon(transaction: TransactionView): Transaction {
  return {
    ...transaction,
    icon: categoryIcons[transaction.category] ?? "💳",
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 8 },
};

export default function TransactionsClientPage({
  initialTransactions,
}: {
  initialTransactions: TransactionView[];
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions.map(withIcon),
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form, setForm] = useState<NewTransactionForm>(defaultForm);
  const [isSaving, setIsSaving] = useState(false);
  const [createError, setCreateError] = useState("");

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (activeFilter === "Income") result = result.filter((t) => t.amount > 0);
    else if (activeFilter === "Expenses")
      result = result.filter((t) => t.amount < 0);
    else if (activeFilter !== "All")
      result = result.filter((t) => t.status === activeFilter);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.merchant.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeFilter, searchQuery, transactions]);

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const pending = transactions
    .filter((t) => t.status === "Pending")
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const metrics = [
    {
      label: "Total Volume",
      value: `$${(totalIncome + totalExpenses).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-7.5L16.5 3m0 0L12 7.5M16.5 3v13.5"
          />
        </svg>
      ),
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Income",
      value: `$${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
      ),
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Spend",
      value: `$${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
          />
        </svg>
      ),
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Pending",
      value: `$${pending.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  const openCreateModal = () => {
    setCreateError("");
    setForm(defaultForm);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateError("");
    setIsCreateModalOpen(false);
  };

  const createTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateError("");

    const numericAmount = Number(form.amount);
    if (
      !form.merchant.trim() ||
      !form.method.trim() ||
      Number.isNaN(numericAmount) ||
      numericAmount <= 0 ||
      !form.date
    ) {
      setCreateError("Fill all required fields with valid values.");
      return;
    }

    setIsSaving(true);
    const result = await createTransactionAction({
      type: form.type === "Income" ? "income" : "expense",
      amount: numericAmount,
      description: form.merchant.trim(),
      category: form.category,
      date: form.date,
      status: form.status,
      method: form.method.trim(),
    });
    setIsSaving(false);

    if (!result.success) {
      setCreateError(result.error);
      return;
    }

    setTransactions((prev) => [withIcon(result.data), ...prev]);
    closeCreateModal();
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-semibold text-white">Transactions</h1>
            <p className="mt-1 text-sm text-slate-400">
              Track movement across cards, transfers, and subscriptions.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            + New Transaction
          </button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${m.bg} ${m.color}`}
                >
                  {m.icon}
                </span>
                <div>
                  <p className="text-xs text-slate-400">{m.label}</p>
                  <p className="text-lg font-semibold text-white">{m.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 sm:w-72"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  filter === activeFilter
                    ? "bg-white text-slate-900 shadow-lg shadow-white/10"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs tracking-wide text-slate-500 uppercase">
                  <th className="px-6 py-4 font-medium">Transaction</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Method</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredTransactions.map((item) => (
                    <motion.tr
                      key={item.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      transition={{ duration: 0.25 }}
                      className="group border-b border-white/5 transition-colors hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-base transition-colors group-hover:bg-white/15">
                            {item.icon}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {item.merchant}
                            </p>
                            <p className="text-xs text-slate-500">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-medium ${categoryBadge(item.category)}`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {item.method}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusBadge(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 text-right text-sm font-semibold ${amountClass(item.amount)}`}
                      >
                        {item.amount >= 0 ? "+" : "-"}$
                        {Math.abs(item.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="space-y-2 p-4 md:hidden">
            <AnimatePresence mode="popLayout">
              {filteredTransactions.map((item) => (
                <motion.div
                  key={item.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-base">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.merchant}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.date} &middot; {item.category}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusBadge(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{item.method}</span>
                    <span className={`text-sm font-semibold ${amountClass(item.amount)}`}>
                      {item.amount >= 0 ? "+" : "-"}$
                      {Math.abs(item.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTransactions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <svg
                className="mb-3 h-10 w-10 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <p className="text-sm text-slate-400">
                No transactions match your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="mt-2 text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
            onClick={closeCreateModal}
          >
            <motion.form
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onSubmit={createTransaction}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Add New Transaction
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Create a transaction and add it to your list instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Close
                </button>
              </div>

              {createError && (
                <p className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                  {createError}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Merchant
                  <input
                    type="text"
                    value={form.merchant}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, merchant: event.target.value }))
                    }
                    placeholder="e.g. Github"
                    required
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Category
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, category: event.target.value }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                  >
                    {categoryOptions.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-slate-900"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm text-slate-300">
                  Type
                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        type: event.target.value as NewTransactionForm["type"],
                      }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                  >
                    <option value="Expense" className="bg-slate-900">
                      Expense
                    </option>
                    <option value="Income" className="bg-slate-900">
                      Income
                    </option>
                  </select>
                </label>

                <label className="text-sm text-slate-300">
                  Amount
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.amount}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, amount: event.target.value }))
                    }
                    placeholder="0.00"
                    required
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, date: event.target.value }))
                    }
                    required
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Status
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        status: event.target.value as TransactionStatus,
                      }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                  >
                    <option value="Completed" className="bg-slate-900">
                      Completed
                    </option>
                    <option value="Pending" className="bg-slate-900">
                      Pending
                    </option>
                    <option value="Settled" className="bg-slate-900">
                      Settled
                    </option>
                  </select>
                </label>

                <label className="text-sm text-slate-300 sm:col-span-2">
                  Payment Method
                  <input
                    type="text"
                    value={form.method}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, method: event.target.value }))
                    }
                    placeholder="e.g. Visa •••• 1234"
                    required
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                  />
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? "Saving..." : "Save Transaction"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
