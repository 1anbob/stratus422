import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Store,
  GraduationCap,
  Sprout,
  Bike,
  Zap,
  Home,
  CheckCircle2,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { useMemo, useState } from "react";
import { loanProducts, formatKES } from "../lib/loans";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "Our Loan Products — Menger Sacco" },
      {
        name: "description",
        content:
          "Explore Menger Sacco microloans: Biashara business loans, Elimu school fees, Kilimo agriculture, Boda Boda asset financing, Dharura emergency and Nyumba home loans.",
      },
      { property: "og:title", content: "Our Loan Products — Menger Sacco" },
      {
        property: "og:description",
        content:
          "Six microloan products for Kenyan businesses, farmers, students and families. Rates from 1.1% per month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoansPage,
});

const iconMap: Record<string, typeof Store> = {
  store: Store,
  "graduation-cap": GraduationCap,
  sprout: Sprout,
  bike: Bike,
  zap: Zap,
  home: Home,
};

function LoanCalculator() {
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const monthlyRate = 0.015;

  const { monthly, total } = useMemo(() => {
    const r = monthlyRate;
    const m = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return { monthly: m, total: m * months };
  }, [amount, months]);

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
          <Calculator className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-bold">Loan Calculator</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Estimate repayments at 1.5% per month on reducing balance.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">
            Loan amount: <span className="font-bold text-primary">{formatKES(amount)}</span>
          </label>
          <input
            type="range"
            min={5000}
            max={1000000}
            step={5000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            Repayment period: <span className="font-bold text-primary">{months} months</span>
          </label>
          <input
            type="range"
            min={3}
            max={60}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-primary)]"
          />
        </div>
      </div>
      <div className="mt-6 grid gap-4 rounded-xl bg-secondary p-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Monthly repayment</p>
          <p className="text-2xl font-extrabold text-primary">{formatKES(Math.round(monthly))}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total repayable</p>
          <p className="text-2xl font-extrabold">{formatKES(Math.round(total))}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Indicative only. Final terms depend on the product, your savings and credit appraisal.
      </p>
    </div>
  );
}

function LoansPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">Our Loan Products</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Fair rates, fast approval and repayments that fit how you earn. All
          loans are available to members after three months of saving.
        </p>
      </div>

      <div className="mt-12">
        <LoanCalculator />
      </div>

      <div className="mt-16 space-y-8">
        {loanProducts.map((loan, i) => {
          const Icon = iconMap[loan.icon] ?? Store;
          return (
            <div
              key={loan.slug}
              id={loan.slug}
              className={`grid scroll-mt-24 gap-6 rounded-2xl border bg-card p-6 shadow-sm md:grid-cols-[auto_1fr_auto] md:items-center md:p-8 ${
                i % 2 === 1 ? "bg-secondary/50" : ""
              }`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-8 w-8" />
              </span>
              <div>
                <h2 className="text-2xl font-bold">{loan.name}</h2>
                <p className="mt-1 text-muted-foreground">{loan.tagline}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Amount</p>
                    <p className="mt-1 font-semibold text-primary">{loan.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Interest</p>
                    <p className="mt-1 font-semibold">{loan.rate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Term</p>
                    <p className="mt-1 font-semibold">{loan.term}</p>
                  </div>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {loan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:pl-6">
                <Link
                  to="/membership"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
