"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ───── dummy data ───── */

const revenueData = [
  { month: "Jul", income: 4200, expenses: 2800 },
  { month: "Aug", income: 4800, expenses: 3100 },
  { month: "Sep", income: 3900, expenses: 2600 },
  { month: "Oct", income: 5300, expenses: 3400 },
  { month: "Nov", income: 4700, expenses: 2900 },
  { month: "Dec", income: 6100, expenses: 3800 },
  { month: "Jan", income: 5800, expenses: 3200 },
  { month: "Feb", income: 6400, expenses: 3500 },
];

const weeklySpend = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 260 },
  { day: "Wed", amount: 180 },
  { day: "Thu", amount: 340 },
  { day: "Fri", amount: 290 },
  { day: "Sat", amount: 410 },
  { day: "Sun", amount: 150 },
];

const categoryData = [
  { name: "Housing", value: 1800, color: "#06b6d4" },
  { name: "Food", value: 650, color: "#8b5cf6" },
  { name: "Transport", value: 420, color: "#f59e0b" },
  { name: "Shopping", value: 380, color: "#ec4899" },
  { name: "Utilities", value: 290, color: "#10b981" },
];

const recentTransactions = [
  { id: 1, name: "Spotify Premium", category: "Entertainment", amount: -9.99, date: "Feb 28", icon: "🎵" },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 6400.0, date: "Feb 27", icon: "💰" },
  { id: 3, name: "Whole Foods", category: "Groceries", amount: -87.34, date: "Feb 26", icon: "🛒" },
  { id: 4, name: "Uber Ride", category: "Transport", amount: -24.5, date: "Feb 25", icon: "🚗" },
  { id: 5, name: "Freelance Payment", category: "Income", amount: 1200.0, date: "Feb 24", icon: "💼" },
];

const metrics = [
  {
    label: "Total Balance",
    value: "$24,563.00",
    change: "+12.5%",
    positive: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    label: "Monthly Income",
    value: "$6,400.00",
    change: "+8.2%",
    positive: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    label: "Monthly Expenses",
    value: "$3,540.00",
    change: "-3.1%",
    positive: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
      </svg>
    ),
  },
  {
    label: "Savings Rate",
    value: "44.7%",
    change: "+5.4%",
    positive: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
      </svg>
    ),
  },
];

/* ───── animation variants ───── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

/* ───── custom tooltip ───── */

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 shadow-xl">
      <p className="mb-1 text-xs text-slate-400">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

/* ───── page ───── */

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Welcome back — here&apos;s your financial overview.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          Feb 2026
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{m.icon}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  m.positive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {m.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">{m.value}</p>
            <p className="mt-1 text-sm text-slate-400">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Chart — spans 2 cols */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-2"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Income vs Expenses</h2>
              <p className="text-sm text-slate-400">Last 8 months</p>
            </div>
            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" /> Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400" /> Expenses
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="income" stroke="#06b6d4" strokeWidth={2} fill="url(#incomeGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="#8b5cf6" strokeWidth={2} fill="url(#expenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Spending by Category — Pie */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <h2 className="mb-1 text-lg font-semibold text-white">Spending Breakdown</h2>
          <p className="mb-4 text-sm text-slate-400">By category</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#e2e8f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="text-slate-400">${c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Weekly Spending Bar Chart */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <h2 className="mb-1 text-lg font-semibold text-white">Weekly Spending</h2>
          <p className="mb-4 text-sm text-slate-400">This week&apos;s daily spend</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklySpend} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#e2e8f0",
                }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {weeklySpend.map((_, i) => (
                  <Cell key={i} fill={i === 5 ? "#06b6d4" : "rgba(6,182,212,0.3)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
              <p className="text-sm text-slate-400">Latest activity</p>
            </div>
            <a href="/dashboard/transactions" className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300">
              View all
            </a>
          </div>
          <div className="space-y-1">
            {recentTransactions.map((tx) => (
              <motion.div
                key={tx.id}
                whileHover={{ x: 2 }}
                className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">
                    {tx.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{tx.name}</p>
                    <p className="text-xs text-slate-400">{tx.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
