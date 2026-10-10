import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Store,
  GraduationCap,
  Sprout,
  Bike,
  Zap,
  Home,
  ShieldCheck,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { loanProducts } from "../lib/loans";
import heroImg from "../assets/hero.jpg";
import bodaImg from "../assets/boda.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Menger Sacco — Affordable Microloans in Kenya" },
      {
        name: "description",
        content:
          "Grow your business, pay school fees, finance your farm or own a boda boda. Menger Sacco offers microloans from KES 5,000 to 2,000,000 with fast M-Pesa disbursement.",
      },
      { property: "og:title", content: "Menger Sacco — Affordable Microloans in Kenya" },
      {
        property: "og:description",
        content:
          "Microloans from KES 5,000 to 2,000,000 for Kenyan families and businesses. Fast approval, M-Pesa disbursement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const iconMap: Record<string, typeof Store> = {
  store: Store,
  "graduation-cap": GraduationCap,
  sprout: Sprout,
  bike: Bike,
  zap: Zap,
  home: Home,
};

const stats = [
  { value: "1,000+", label: "Active members" },
  { value: "KES 1.8M", label: "Loans disbursed" },
  { value: "3", label: "Branches countrywide" },
  { value: "5 yrs", label: "Serving Kenya" },
];

const steps = [
  {
    title: "Join the Sacco",
    text: "Register with your National ID and pay a one-time KES 500 membership fee.",
  },
  {
    title: "Save for 3 months",
    text: "Build your savings from as little as KES 200 per week via M-Pesa Paybill 522100.",
  },
  {
    title: "Apply for a loan",
    text: "Borrow up to 3x your savings. Apply at a branch or dial *483# on your phone.",
  },
  {
    title: "Receive funds fast",
    text: "Approved loans are sent straight to your M-Pesa wallet within 48 hours.",
  },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> SASRA Licensed & Regulated
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Loans that grow with you,{" "}
              <span className="text-primary">harambee</span> style
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              From mama mboga stalls to boda boda fleets, Menger Sacco has
              financed over 1,000 Kenyan dreams with fair rates and fast
              M-Pesa disbursement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/loans"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Loans <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-secondary"
              >
                Become a Member
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="A Kenyan market trader at her produce stall"
              width={1600}
              height={1008}
              className="rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 -left-5 rounded-xl bg-card p-4 shadow-lg">
              <p className="text-2xl font-bold text-primary">48 hrs</p>
              <p className="text-xs text-muted-foreground">Average disbursement time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-primary">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-primary-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Loan products */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Microloans for every hustle</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Six loan products designed around how Kenyans actually earn, save
            and repay.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loanProducts.map((loan) => {
            const Icon = iconMap[loan.icon] ?? Store;
            return (
              <div
                key={loan.slug}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold">{loan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{loan.tagline}</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-primary">{loan.amount}</span>
                  </p>
                  <p className="text-muted-foreground">{loan.rate}</p>
                  <p className="text-muted-foreground">{loan.term}</p>
                </div>
                <Link
                  to="/loans"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                From member to funded in four steps
              </h2>
              <div className="mt-8 space-y-6">
                {steps.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={bodaImg}
              alt="A boda boda rider in Nairobi"
              width={1024}
              height={768}
              loading="lazy"
              className="rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Why Kenyans choose Pamoja</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Smartphone,
              title: "M-Pesa everything",
              text: "Save, repay and receive loans via M-Pesa. Dial *483# — no smartphone or internet needed.",
            },
            {
              icon: Users,
              title: "Community owned",
              text: "We are owned by our members. Profits come back to you as dividends every year.",
            },
            {
              icon: ShieldCheck,
              title: "Safe & regulated",
              text: "Licensed by SASRA with insured deposits. Your savings are protected, always.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border bg-card p-6">
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to grow? Karibu Pamoja.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Join today with just your National ID and KES 500. Your first
            savings deposit can be as little as KES 200.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/membership"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground transition-opacity hover:opacity-90"
            >
              Join Menger Sacco <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/40 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Talk to Us
            </Link>
          </div>
          <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
            {["No hidden fees", "Dividends annually", "14 branches"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
