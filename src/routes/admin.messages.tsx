import { createFileRoute } from "@tanstack/react-router";
import { Inbox, LogOut, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import {
  adminSupabase,
  groupContactMessagesByTopic,
  type ContactMessage,
} from "../lib/admin-contact-messages";

export const Route = createFileRoute("/admin/messages")({
  head: () => ({
    meta: [{ title: "Contact Messages — Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminMessagesPage,
});

type AccessState = "loading" | "granted" | "denied" | "error";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-KE", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

function AdminMessagesPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [access, setAccess] = useState<AccessState>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    const {
      data: { subscription },
    } = adminSupabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setSessionChecked(true);
      setSignInError(null);
    });

    void adminSupabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setSignInError(error.message);
        } else {
          setSession(data.session);
        }
        setSessionChecked(true);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setSignInError(error instanceof Error ? error.message : "Unable to check your session.");
        setSessionChecked(true);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setAccess("loading");
      setMessages([]);
      setLoadError(null);
      return;
    }

    const userId = session.user.id;
    let active = true;
    setAccess("loading");
    setLoadError(null);

    async function loadMessages() {
      const { data: adminUser, error: adminError } = await adminSupabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (adminError) throw adminError;
      if (!active) return;

      if (!adminUser) {
        setMessages([]);
        setAccess("denied");
        return;
      }

      const { data, error } = await adminSupabase
        .from("contact_messages")
        .select("created_at, full_name, message, phone, source, topic")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!active) return;
      setMessages(data);
      setAccess("granted");
    }

    void loadMessages().catch((error: unknown) => {
      if (!active) return;
      setLoadError(error instanceof Error ? error.message : "Unable to load contact messages.");
      setAccess("error");
    });

    return () => {
      active = false;
    };
  }, [session, refreshKey]);

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return messages;
    return messages.filter((message) =>
      [message.full_name, message.phone, message.topic, message.message].some((value) =>
        value.toLocaleLowerCase().includes(query),
      ),
    );
  }, [messages, search]);
  const groups = useMemo(() => groupContactMessagesByTopic(filteredMessages), [filteredMessages]);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSigningIn(true);
    setSignInError(null);

    try {
      const { error } = await adminSupabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      setPassword("");
    } catch (error) {
      setSignInError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setSigningIn(false);
    }
  }

  async function handleSignOut() {
    const { error } = await adminSupabase.auth.signOut();
    if (error) setSignInError(error.message);
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-12">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" /> Administration
          </p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Contact messages</h1>
          <p className="mt-2 text-muted-foreground">Review incoming enquiries grouped by topic.</p>
        </div>
        {session ? (
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        ) : null}
      </header>

      {session && signInError ? (
        <p role="alert" className="mb-6 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {signInError}
        </p>
      ) : null}

      {!sessionChecked ? (
        <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
          Checking your session…
        </p>
      ) : !session ? (
        <section className="mx-auto max-w-md rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold">Admin sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use the account provisioned for you by the system administrator.
          </p>
          {signInError ? (
            <p
              role="alert"
              className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              {signInError}
            </p>
          ) : null}
          <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="admin-email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={signingIn}
              className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
            >
              {signingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </section>
      ) : access === "loading" ? (
        <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
          Loading contact messages…
        </p>
      ) : access === "denied" ? (
        <section className="rounded-xl border bg-card p-6">
          <h2 className="font-bold">Admin access required</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This account is not authorized to view contact messages. Ask the system administrator to
            grant access.
          </p>
        </section>
      ) : access === "error" ? (
        <section className="rounded-xl border border-destructive/40 bg-card p-6">
          <h2 className="font-bold">Unable to load contact messages</h2>
          <p role="alert" className="mt-2 text-sm text-destructive">
            {loadError}
          </p>
          <button
            type="button"
            onClick={() => setRefreshKey((current) => current + 1)}
            className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Try again
          </button>
        </section>
      ) : (
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{messages.length}</span>{" "}
              {messages.length === 1 ? "message" : "messages"} in{" "}
              <span className="font-semibold text-foreground">
                {groupContactMessagesByTopic(messages).length}
              </span>{" "}
              topics
            </p>
            <div className="flex w-full gap-2 sm:w-auto">
              <label className="relative min-w-0 flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search messages"
                  aria-label="Search contact messages"
                  className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <button
                type="button"
                onClick={() => setRefreshKey((current) => current + 1)}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Refresh</span>
              </button>
            </div>
          </div>

          {groups.length === 0 ? (
            <div className="rounded-2xl border bg-card px-6 py-12 text-center">
              <Inbox className="mx-auto h-9 w-9 text-muted-foreground" />
              <h2 className="mt-4 font-bold">
                {messages.length === 0 ? "No messages yet" : "No matching messages"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {messages.length === 0
                  ? "New contact form submissions will appear here."
                  : "Try a different search term."}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {groups.map((group) => (
                <section key={group.topic} aria-labelledby={`topic-${group.topic}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 id={`topic-${group.topic}`} className="text-xl font-bold">
                      {group.topic}
                    </h2>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                      {group.messages.length}
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border bg-card">
                    <table className="w-full min-w-[760px] text-left text-sm">
                      <thead className="border-b bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-semibold">
                            Sender
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold">
                            Phone
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold">
                            Received
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold">
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {group.messages.map((message, index) => (
                          <tr
                            key={`${message.created_at}-${message.phone}-${index}`}
                            className="align-top"
                          >
                            <td className="whitespace-nowrap px-4 py-4 font-medium">
                              {message.full_name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                              {message.phone}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                              {formatDate(message.created_at)}
                            </td>
                            <td className="max-w-xl whitespace-pre-wrap px-4 py-4">
                              {message.message}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
