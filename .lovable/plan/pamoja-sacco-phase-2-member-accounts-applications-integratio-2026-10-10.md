# Pamoja Sacco — Phase 2: Member Accounts, Applications & Integrations

## Goal

Turn the marketing site into a working Sacco platform: members can sign up, save, apply for loans, and track everything in a dashboard — with email confirmations and a foundation for M-Pesa payments.

## 1. Backend (Lovable Cloud)

Enable Lovable Cloud, then create:

- **profiles** — full name, phone, national ID number, member number, auto-created on signup
- **savings_accounts** — balance per member, seeded with a joining deposit
- **savings_transactions** — deposits/withdrawals ledger
- **loan_applications** — product, amount, term, status (pending → approved/rejected), created from the apply form
- **loans** — approved loans with balance and next repayment date
- **contact_messages** — stores the existing contact form submissions
- Row-level security on every table: members only see their own data

## 2. Authentication & Member Area

- **/auth** page — sign up (name, email, phone, password) and sign in, with "check your email" confirmation flow and password reset (/reset-password)
- Header shows "Sign in" when logged out, and "My Account" + sign-out when logged in
- **/dashboard** (protected) — savings balance, active loans, recent transactions, application statuses
- **/dashboard/apply** — real loan application form (product, amount, term, purpose) saved to the database
- **/dashboard/savings** — record a deposit (simulated M-Pesa prompt), transaction history

## 3. More Pages & Content

- **/faq** — common questions (rates, eligibility, guarantors, M-Pesa paybill)
- **/testimonials** — member success stories with photos
- **/news** — announcements/articles listing page

## 4. Integrations

- **Email confirmations** — application received / account created emails via Lovable Cloud email
- **M-Pesa foundation** — savings deposits and loan repayments recorded through a server function shaped like an M-Pesa STK push, so a real Daraja API key can be dropped in later without rework (real M-Pesa needs a Safaricom Daraja app + credentials from you)

## Technical notes

- Lovable Cloud (built-in database, auth, email) — no external accounts needed
- Sign-up uses email + password with email confirmation; profile row auto-created by trigger
- Protected pages live under an authenticated layout; server functions verify the caller
- Existing public pages (home, loans, membership, about, contact) stay as they are, with "Apply Now" now leading to the real application flow

## What I need from you (can come later)

- Real Sacco name, rates, phone numbers, branch addresses (currently placeholders)
- Safaricom Daraja API credentials when you want live M-Pesa payments
