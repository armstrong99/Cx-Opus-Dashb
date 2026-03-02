"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ───── data ───── */

const features = [
  {
    title: "Smart Tracking",
    description: "Every transaction categorized automatically. No spreadsheets, no guesswork.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: "Goal Setting",
    description: "Set savings targets and watch your progress grow week over week.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    title: "Secure by Default",
    description: "Bank-level encryption. Your data stays yours — always.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "40k+", label: "Plans created monthly" },
  { value: "92%", label: "Report lower stress" },
  { value: "4.9", label: "Average rating" },
];

const steps = [
  { step: "01", title: "Create an account", description: "Sign up in under 30 seconds. No credit card needed." },
  { step: "02", title: "Connect your flow", description: "Add transactions manually or import them in bulk." },
  { step: "03", title: "See the full picture", description: "Charts, breakdowns, and insights — all in real time." },
];

/* ───── animation ───── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

/* ───── page ───── */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400/30">
      {/* ── Nav ── */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 border-b border-white/10 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-sm font-bold text-white">C</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">CFin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80"
            alt="Smiling professional reviewing personal finance data"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-slate-950/65" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-cyan-500/15 via-slate-950/45 to-slate-950/85" />

        {/* Subtle glow — one centered, not scattered */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/8 blur-[120px]" />

        <div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Now in public beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-6 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
          >
            Financial clarity,
            <br />
            <span className="text-slate-400">without the noise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-6 max-w-lg text-base text-slate-400 sm:text-lg"
          >
            Track spending, set goals, and understand where your money goes — in a dashboard that actually makes sense.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link
              href="/signup"
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start for free
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Sign in
            </Link>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="relative z-20 mx-auto mt-16 max-w-5xl px-6"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="rounded-xl bg-slate-900/80 p-6">
              {/* Mock dashboard bar */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-rose-400/60" />
                <div className="h-3 w-3 rounded-full bg-amber-400/60" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/60" />
                <div className="ml-4 h-4 w-48 rounded bg-white/5" />
              </div>
              {/* Mock metric row */}
              <div className="grid grid-cols-4 gap-3">
                {["$24,563", "$6,400", "$3,540", "44.7%"].map((val, i) => (
                  <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="mb-2 h-2.5 w-16 rounded bg-white/5" />
                    <p className="text-lg font-semibold text-white/90">{val}</p>
                  </div>
                ))}
              </div>
              {/* Mock chart area */}
              <div className="mt-4 flex items-end gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-6">
                {[40, 55, 35, 65, 50, 75, 60, 80].map((h, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="mx-auto w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-cyan-500/30 to-cyan-400/60"
                      style={{ height: `${h}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-y border-white/5">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-white/5 py-12"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={child} className="text-center">
              <p className="text-3xl font-semibold text-white sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14 max-w-lg"
        >
          <p className="text-sm font-medium text-cyan-400">Features</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Everything you need, nothing you don&apos;t.
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Built for people who want clarity — not complexity.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-white/10"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400">
                {f.icon}
              </div>
              <h3 className="text-base font-medium text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-14 max-w-lg"
          >
            <p className="text-sm font-medium text-cyan-400">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Three steps to full visibility.
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-sm font-semibold text-slate-600">{s.step}</span>
                <h3 className="mt-2 text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl px-6 py-24 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to take control?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-slate-400">
            Join thousands of people building healthier financial habits with CFin.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Get started free
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                  <span className="text-sm font-bold text-white">C</span>
                </div>
                <span className="text-base font-semibold tracking-tight text-white">CFin</span>
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
                Financial clarity for people and teams that want better decisions, not more noise.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Product</h3>
              <div className="mt-4 space-y-2 text-sm">
                <Link href="/signup" className="block text-slate-400 transition hover:text-white">Get Started</Link>
                <Link href="/login" className="block text-slate-400 transition hover:text-white">Sign In</Link>
                <Link href="/blog" className="block text-slate-400 transition hover:text-white">Blog</Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Company</h3>
              <div className="mt-4 space-y-2 text-sm">
                <a href="#" className="block text-slate-400 transition hover:text-white">About</a>
                <a href="#" className="block text-slate-400 transition hover:text-white">Contact</a>
                <a href="#" className="block text-slate-400 transition hover:text-white">Careers</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Legal</h3>
              <div className="mt-4 space-y-2 text-sm">
                <a href="#" className="block text-slate-400 transition hover:text-white">Privacy</a>
                <a href="#" className="block text-slate-400 transition hover:text-white">Terms</a>
                <a href="#" className="block text-slate-400 transition hover:text-white">Security</a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 CFin. All rights reserved.</p>
            <p>Built for modern personal finance workflows.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
