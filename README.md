# Stratus422

Create a Sacco / Microfinance website with different micro loans in Kenya

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/077de9bf-5431-4c40-ac9d-269b3312d556).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Paystack membership payments

The membership page opens Paystack Inline Checkout with the KES 1 test amount.
After success, it redirects to `/account`, where the transaction is verified
server-side before showing a success message. For local testing, copy
`.env.example` to `.env` and set `PAYSTACK_SECRET_KEY` to your Paystack test
secret key and `VITE_PAYSTACK_PUBLIC_KEY` to your test public key. The secret
key must remain server-side; only the public key uses the `VITE_` prefix.

The server currently charges KES 1, configured in `src/lib/paystack.ts`, as a
temporary test amount. Update that constant to the approved membership fee
before going live. Use a Paystack live secret key only when the production
callback URL and fee are configured.

## Contact message administration

The admin message view is available at `/admin/messages`. Apply
`supabase/migrations/20261017130000_admin_contact_messages.sql` to the Supabase
project before using it. The migration creates an admin allowlist and restricts
contact message reads to allowlisted, authenticated users while retaining the
public website submission flow.

To grant access, create the user's account in Supabase Authentication, then add
the user's Auth ID to `public.admin_users` from the Supabase SQL editor:

```sql
INSERT INTO public.admin_users (user_id)
SELECT id
FROM auth.users
WHERE email = 'admin@example.com'
ON CONFLICT (user_id) DO NOTHING;
```

Removing the row from `public.admin_users` revokes access.
