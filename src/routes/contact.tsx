import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Menger Sacco" },
      {
        name: "description",
        content:
          "Reach Menger Sacco: call +254 700 123 456, visit our Kimathi Street head office in Nairobi, or send us a message. Open Monday to Saturday.",
      },
      { property: "og:title", content: "Contact Us — Menger Sacco" },
      {
        property: "og:description",
        content:
          "Call, visit or message Menger Sacco. Head office on Kimathi Street, Nairobi. Open Mon–Sat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const branches = [
  { name: "Nairobi CBD (Head Office)", address: "Menger House, Kimathi Street", phone: "+254 700 123 456" },
  { name: "Gikomba", address: "Muhoroni Lane, Gikomba Market", phone: "+254 700 123 457" },
  { name: "Mombasa", address: "Nkrumah Road, Mombasa", phone: "+254 700 123 458" },
  { name: "Kisumu", address: "Oginga Odinga Street, Kisumu", phone: "+254 700 123 459" },
  { name: "Nakuru", address: "Kenyatta Avenue, Nakuru", phone: "+254 700 123 460" },
  { name: "Eldoret", address: "Uganda Road, Eldoret", phone: "+254 700 123 461" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">Talk to Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Questions about membership or loans? Call, visit a branch, or send a
          message — we reply within one working day.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-card p-5">
              <Phone className="h-6 w-6 text-primary" />
              <h2 className="mt-3 font-bold">Call us</h2>
              <p className="mt-1 text-sm text-muted-foreground">+254 700 123 456</p>
              <p className="text-sm text-muted-foreground">USSD: *483#</p>
            </div>
            <div className="rounded-2xl border bg-card p-5">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="mt-3 font-bold">Email</h2>
              <p className="mt-1 text-sm text-muted-foreground">info@mengersacco.co.ke</p>
            </div>
            <div className="rounded-2xl border bg-card p-5">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="mt-3 font-bold">WhatsApp</h2>
              <p className="mt-1 text-sm text-muted-foreground">+254 700 123 456</p>
            </div>
            <div className="rounded-2xl border bg-card p-5">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="mt-3 font-bold">Hours</h2>
              <p className="mt-1 text-sm text-muted-foreground">Mon–Fri: 8am – 5pm</p>
              <p className="text-sm text-muted-foreground">Sat: 9am – 1pm</p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="flex items-center gap-2 font-bold">
              <MapPin className="h-5 w-5 text-primary" /> Our branches
            </h2>
            <ul className="mt-4 divide-y">
              {branches.map((b) => (
                <li key={b.name} className="py-3">
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-muted-foreground">{b.address}</p>
                  <p className="text-sm text-muted-foreground">{b.phone}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-2xl font-bold">Send a message</h2>
          {sent ? (
            <div className="mt-6 rounded-xl bg-secondary p-6 text-center">
              <p className="text-lg font-bold text-primary">Asante sana!</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Your message has been received. A member of our team will get
                back to you within one working day.
              </p>
            </div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label htmlFor="name" className="text-sm font-medium">Full name</label>
                <input
                  id="name"
                  required
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Jane Wanjiku"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium">Phone number</label>
                <input
                  id="phone"
                  required
                  type="tel"
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="07XX XXX XXX"
                />
              </div>
              <div>
                <label htmlFor="topic" className="text-sm font-medium">Topic</label>
                <select
                  id="topic"
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>Membership</option>
                  <option>Loan application</option>
                  <option>Savings & dividends</option>
                  <option>Chama / group registration</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
