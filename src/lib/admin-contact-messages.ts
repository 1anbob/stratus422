import type { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "../integrations/supabase/client";

export type ContactMessage = {
  created_at: string;
  full_name: string;
  message: string;
  phone: string;
  source: string;
  topic: string;
};

type AdminDatabase = {
  public: {
    Tables: {
      admin_users: {
        Row: { user_id: string; created_at: string };
        Insert: { user_id: string; created_at?: string };
        Update: { user_id?: string; created_at?: string };
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, "created_at"> & { created_at?: string };
        Update: Partial<ContactMessage>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

export const adminSupabase = supabase as unknown as SupabaseClient<AdminDatabase>;

export function groupContactMessagesByTopic(messages: ContactMessage[]) {
  const groups = new Map<string, ContactMessage[]>();

  for (const message of messages) {
    const topic = message.topic.trim() || "Other";
    const group = groups.get(topic);
    if (group) {
      group.push(message);
    } else {
      groups.set(topic, [message]);
    }
  }

  return [...groups.entries()]
    .map(([topic, topicMessages]) => ({ topic, messages: topicMessages }))
    .sort((a, b) => a.topic.localeCompare(b.topic));
}
