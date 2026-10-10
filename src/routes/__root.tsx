import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Landmark, Menu, X, Phone, Mail, MapPin } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/loans", label: "Loans" },
  { to: "/membership", label: "Membership" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Landmark className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold text-foreground">
            Pamoja Sacco
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/membership"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join Now
          </Link>
        </nav>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground"
                activeProps={{ className: "text-primary font-semibold" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Landmark className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">Pamoja Sacco</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Empowering Kenyan families and businesses with affordable
            microloans since 2009. Licensed and regulated by SASRA.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Loan Products</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Biashara Business Loan</li>
            <li>Elimu School Fees Loan</li>
            <li>Kilimo Agri Loan</li>
            <li>Boda Boda Asset Loan</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> +254 700 123 456
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> info@pamojasacco.co.ke
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Kimathi Street, Nairobi
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pamoja Sacco Society Ltd. All rights
        reserved. Regulated by the Sacco Societies Regulatory Authority (SASRA).
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pamoja Sacco — Microloans for Kenyan Families & Businesses" },
      {
        name: "description",
        content:
          "Pamoja Sacco offers affordable microloans in Kenya: business, school fees, agriculture, boda boda and emergency loans. Join 25,000+ members today.",
      },
      { property: "og:title", content: "Pamoja Sacco — Microloans for Kenya" },
      {
        property: "og:description",
        content:
          "Affordable microloans for Kenyan families and businesses. Biashara, Elimu, Kilimo, Boda Boda and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
