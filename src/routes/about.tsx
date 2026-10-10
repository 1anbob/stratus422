import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Eye, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Pamoja Sacco" },
      {
        name: "description",
        content:
          "Founded in 2009 in Nairobi, Pamoja Sacco has grown to 25,000+ members and KES 1.8 billion in loans disbursed to Kenyan families and small businesses.",
      },
      { property: "og:title", content: "About Us — Pamoja Sacco" },
      {
        property: "og:description",
        content:
          "25,000+ members, 14 branches, KES 1.8B disbursed. Learn the story behind Pamoja Sacco.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: HeartHandshake,
    title: "Ujana na pamoja",
    text: "We rise together. Every product is built with members, not just for them.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    text: "No hidden fees, ever. Every rate and charge is published and explained in plain language.",
  },
  {
    icon: ShieldCheck,
    title: "Stewardship",
    text: "Member deposits are sacred. We are SASRA regulated, externally audited and fully insured.",
  },
];

const milestones = [
  { year: "2009", text: "Founded by 40 market traders in Gikomba, Nairobi." },
  { year: "2013", text: "Licensed by SASRA; membership passes 5,000." },
  { year: "2017", text: "Launched M-Pesa savings and *483# mobile banking." },
  { year: "2021", text: "Opened branches in Mombasa, Kisumu and Eldoret." },
  { year: "2026", text: "Crossed KES 1.8 billion in cumulative loans disbursed." },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold md:text-5xl">Our Story</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Pamoja Sacco began in 2009 when forty market traders in Gikomba
          pooled their savings to escape predatory lenders. Today we serve
          over 25,000 members across Kenya — but the idea hasn't changed:
          ordinary people, pooling together, can finance extraordinary things.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border bg-card p-6">
            <v.icon className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-lg font-bold">{v.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold">Milestones</h2>
        <div className="mt-8 space-y-0">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-6 border-l-2 border-primary/30 pb-8 pl-6 last:pb-0">
              <div className="-ml-[31px] mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-primary" />
              <div>
                <p className="font-bold text-primary">{m.year}</p>
                <p className="mt-1 text-muted-foreground">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-secondary p-8 md:p-12">
        <h2 className="text-2xl font-bold">Governance & regulation</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Pamoja Sacco Society Ltd is licensed and supervised by the Sacco
          Societies Regulatory Authority (SASRA). We are audited annually by an
          independent firm, and member deposits are protected under our
          fidelity and deposit insurance arrangements. An elected board of
          nine members — chosen at the Annual General Meeting — oversees the
          society on behalf of all members.
        </p>
      </div>
    </div>
  );
}
