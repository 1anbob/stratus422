import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, PiggyBank, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Become a Member — Pamoja Sacco" },
      {
        name: "description",
        content:
          "Join Pamoja Sacco with your National ID and KES 500. Save from KES 200 a week, earn annual dividends and borrow up to 3x your savings.",
      },
      { property: "og:title", content: "Become a Member — Pamoja Sacco" },
      {
        property: "og:description",
        content:
          "Membership open to all Kenyans. Save from KES 200/week, earn dividends, borrow up to 3x your savings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembershipPage,
});

const requirements = [
  "Kenyan National ID or valid passport",
  "One passport-size photo",
  "KES 500 one-time membership fee",
  "KES 1,000 minimum share capital (payable in instalments)",
  "KRA PIN certificate",
];

const benefits = [
  {
    icon: PiggyBank,
    title: "Save your way",
    text: "From KES 200 a week via M-Pesa Paybill 522100, standing order or at any branch.",
  },
  {
    icon: TrendingUp,
    title: "Earn dividends",
    text: "Members earned an average 11% dividend on share capital over the last five years.",
  },
  {
    icon: Users,
    title: "Borrow up to 3x savings",
    text: "After three months of consistent saving, qualify for loans up to three times your deposits.",
  },
];

function MembershipPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">Join Pamoja Sacco</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Membership is open to every Kenyan — employed, self-employed, chamas
          and groups. Karibu.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border bg-card p-6">
            <b.icon className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-lg font-bold">{b.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="text-2xl font-bold">What you need to join</h2>
          <ul className="mt-6 space-y-3">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
          <h2 className="text-2xl font-bold">Three ways to register</h2>
          <ol className="mt-6 space-y-5">
            <li>
              <p className="font-semibold">1. Visit any branch</p>
              <p className="mt-1 text-sm text-primary-foreground/80">
                We have 14 branches across Nairobi, Mombasa, Kisumu, Nakuru and
                Eldoret. Registration takes 15 minutes.
              </p>
            </li>
            <li>
              <p className="font-semibold">2. Dial *483#</p>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Register from any phone — no internet needed. Pay your
                membership fee via M-Pesa.
              </p>
            </li>
            <li>
              <p className="font-semibold">3. Through your chama</p>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Groups of 10+ get a dedicated relationship officer and group
                registration at your meeting place.
              </p>
            </li>
          </ol>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground transition-opacity hover:opacity-90"
          >
            Start Registration <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
