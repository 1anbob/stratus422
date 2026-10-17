import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Download,
  FileSpreadsheet,
  FileText,
  Mail,
  Printer,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Member Documents — Menger Sacco" },
      {
        name: "description",
        content:
          "Download Menger Sacco's prefilled membership application and supporting documents checklist as PDF, Word or Excel files.",
      },
      { property: "og:title", content: "Member Documents — Menger Sacco" },
      {
        property: "og:description",
        content:
          "Get the membership forms, complete and sign them, then email your application to Menger Sacco.",
      },
    ],
  }),
  component: DocumentsPage,
});

const documents = [
  {
    title: "Membership application",
    description:
      "The application form with Menger Sacco details and membership requirements already filled in.",
    icon: FileText,
    formats: [
      {
        label: "PDF",
        href: "/documents/menger-membership-application.pdf",
        detail: "Print and complete",
      },
      {
        label: "Word",
        href: "/documents/menger-membership-application.docx",
        detail: "Editable .docx",
      },
      {
        label: "Excel",
        href: "/documents/menger-membership-application.xlsx",
        detail: "Editable .xlsx",
      },
    ],
  },
  {
    title: "Supporting documents checklist",
    description:
      "A printable checklist to help you include the required identification and membership documents.",
    icon: ClipboardCheck,
    formats: [
      {
        label: "PDF",
        href: "/documents/menger-supporting-documents-checklist.pdf",
        detail: "Print or save",
      },
    ],
  },
];

const steps = [
  {
    icon: Download,
    title: "Download a form",
    text: "Choose the PDF to print, or an editable Word or Excel version to fill in on your device.",
  },
  {
    icon: Printer,
    title: "Complete and sign",
    text: "Fill in your details, print the completed form and sign all marked sections by hand.",
  },
  {
    icon: Mail,
    title: "Email your application",
    text: "Scan or take clear photos of every signed page and the supporting documents, then email them to us.",
  },
];

function DocumentsPage() {
  return (
    <div>
      <section className="border-b bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" /> Member application pack
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
              Member documents
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Download the registration forms, complete and sign them, then send your application
              and supporting documents to our team by email.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {documents.map((document) => (
            <article
              key={document.title}
              className="rounded-2xl border bg-card p-6 shadow-sm md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <document.icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-xl font-bold">{document.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {document.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {document.formats.map((format) => (
                  <a
                    key={format.label}
                    href={format.href}
                    download
                    className="group flex items-center justify-between gap-3 rounded-xl border p-4 transition-colors hover:border-primary hover:bg-secondary/50"
                  >
                    <span className="flex items-center gap-3">
                      {format.label === "Excel" ? (
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      ) : (
                        <FileText className="h-5 w-5 text-primary" />
                      )}
                      <span>
                        <span className="block font-semibold">{format.label}</span>
                        <span className="block text-xs text-muted-foreground">{format.detail}</span>
                      </span>
                    </span>
                    <Download className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/75">
              How to apply
            </p>
            <h2 className="mt-2 text-3xl font-bold">Three simple steps</h2>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground">
                  <step.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/80">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-card p-6 text-card-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold">Ready to send your application?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Attach the signed form and checklist documents. Use the subject “Membership
                application”.
              </p>
            </div>
            <a
              href="mailto:info@mengersacco.co.ke?subject=Membership%20application"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Email your application <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-primary-foreground/75">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            Keep the original documents and send clear scans or photos. We’ll contact you if
            anything else is needed to complete your application.
          </p>
          <p className="mt-6 text-sm text-primary-foreground/75">
            Need help completing the forms?{" "}
            <Link
              to="/contact"
              className="font-semibold text-primary-foreground underline underline-offset-4"
            >
              Contact our team
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
