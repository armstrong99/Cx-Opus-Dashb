import Image from "next/image";
import Link from "next/link";
import { Manrope, Playfair_Display } from "next/font/google";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
};

const featuredPost: BlogPost = {
  title: "How I Built a Budget That Survived Real Life",
  excerpt:
    "A practical breakdown of using weekly money checkpoints, calendar-linked expenses, and one simple emergency rule to stay on track.",
  category: "Money Habits",
  readTime: "8 min read",
  author: "Amara Benton",
  date: "March 2, 2026",
  image:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
};

const blogPosts: BlogPost[] = [
  {
    title: "5 Cash Flow Mistakes New Freelancers Make",
    excerpt:
      "From late invoicing to irregular tax buffers, here is how to avoid the biggest cash flow traps in your first year.",
    category: "Freelance Finance",
    readTime: "6 min read",
    author: "Jordan Lee",
    date: "February 24, 2026",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Envelope Method, Rebuilt for Digital Wallets",
    excerpt:
      "You can mimic envelopes with modern tools. This guide compares app buckets, spending caps, and instant transfer habits.",
    category: "Budgeting",
    readTime: "7 min read",
    author: "Naomi Carter",
    date: "February 16, 2026",
    image:
      "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Planning for Big Purchases Without Debt Fatigue",
    excerpt:
      "A clear framework for sinking funds that helps you buy what you need while keeping monthly obligations steady.",
    category: "Savings",
    readTime: "5 min read",
    author: "Ethan Blake",
    date: "February 9, 2026",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "A One-Page System for Monthly Money Reviews",
    excerpt:
      "Stop guessing where your money went. This one-page review ritual surfaces spending drifts before they become patterns.",
    category: "Financial Planning",
    readTime: "9 min read",
    author: "Mia Rodriguez",
    date: "January 30, 2026",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
];

export default function BlogPage() {
  return (
    <main
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 text-zinc-900`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-100">
              CFin Journal
            </p>
            <h1
              className="text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Smart Money Stories for Everyday Life
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-zinc-900 px-5 py-2 text-sm font-semibold hover:bg-zinc-900 hover:text-white"
          >
            Back Home
          </Link>
        </header>

        <section className="mb-12 overflow-hidden rounded-3xl bg-zinc-900 text-zinc-100 shadow-xl shadow-zinc-900/20">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[280px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-8 md:p-10">
              <p className="mb-4 inline-flex rounded-full bg-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-900">
                Featured • {featuredPost.category}
              </p>
              <h2
                className="mb-4 text-3xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featuredPost.title}
              </h2>
              <p className="mb-6 text-zinc-300">{featuredPost.excerpt}</p>
              <p className="text-sm text-zinc-400">
                {featuredPost.author} • {featuredPost.date} • {featuredPost.readTime}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/85 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="mb-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-800">
                  {post.category}
                </p>
                <h3
                  className="mb-2 text-2xl font-bold leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h3>
                <p className="mb-4 text-zinc-700">{post.excerpt}</p>
                <p className="text-sm text-zinc-500">
                  {post.author} • {post.date} • {post.readTime}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
