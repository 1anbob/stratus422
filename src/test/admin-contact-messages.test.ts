import { describe, expect, it } from "vitest";

import { groupContactMessagesByTopic, type ContactMessage } from "../lib/admin-contact-messages";

const messages: ContactMessage[] = [
  {
    created_at: "2026-10-17T10:00:00.000Z",
    full_name: "Amina",
    message: "I want to join.",
    phone: "+254700000001",
    source: "website",
    topic: "Membership",
  },
  {
    created_at: "2026-10-17T11:00:00.000Z",
    full_name: "Brian",
    message: "Loan details?",
    phone: "+254700000002",
    source: "website",
    topic: "Loan application",
  },
  {
    created_at: "2026-10-17T12:00:00.000Z",
    full_name: "Chao",
    message: "Please call me.",
    phone: "+254700000003",
    source: "website",
    topic: "Membership",
  },
  {
    created_at: "2026-10-17T13:00:00.000Z",
    full_name: "Dara",
    message: "Other question.",
    phone: "+254700000004",
    source: "website",
    topic: "   ",
  },
];

describe("groupContactMessagesByTopic", () => {
  it("groups messages by topic, labels empty topics, and sorts groups", () => {
    expect(groupContactMessagesByTopic(messages)).toEqual([
      { topic: "Loan application", messages: [messages[1]] },
      { topic: "Membership", messages: [messages[0], messages[2]] },
      { topic: "Other", messages: [messages[3]] },
    ]);
  });
});
