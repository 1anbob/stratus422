CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.admin_users FROM anon, authenticated;
GRANT SELECT ON TABLE public.admin_users TO authenticated;

DROP POLICY IF EXISTS admin_users_read_self ON public.admin_users;
CREATE POLICY admin_users_read_self
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON TABLE public.contact_messages TO authenticated;
GRANT INSERT ON TABLE public.contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS contact_messages_admin_read ON public.contact_messages;
CREATE POLICY contact_messages_admin_read
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE admin_users.user_id = (SELECT auth.uid())
    )
  );

DROP POLICY IF EXISTS contact_messages_admin_only ON public.contact_messages;
CREATE POLICY contact_messages_admin_only
  ON public.contact_messages
  AS RESTRICTIVE
  FOR SELECT
  TO anon, authenticated
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE admin_users.user_id = (SELECT auth.uid())
    )
  );

DROP POLICY IF EXISTS contact_messages_website_insert ON public.contact_messages;
CREATE POLICY contact_messages_website_insert
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    source = 'website'
    AND length(btrim(full_name)) > 0
    AND length(btrim(phone)) > 0
    AND length(btrim(topic)) > 0
    AND length(btrim(message)) > 0
  );
