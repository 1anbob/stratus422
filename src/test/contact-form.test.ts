import { beforeEach, describe, expect, it, vi } from "vitest";

const { fromMock } = vi.hoisted(() => ({
  fromMock: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: fromMock,
  },
}));

import { saveContactMessage } from "@/routes/contact";

describe("saveContactMessage", () => {
  beforeEach(() => {
    fromMock.mockReset();
  });

  it("stores a contact submission in the contact_messages table", async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    fromMock.mockReturnValue({ insert: insertMock });

    await saveContactMessage({
      name: "Jane Wanjiku",
      phone: "+254712345678",
      topic: "Membership",
      message: "I would like to join.",
    });

    expect(fromMock).toHaveBeenCalledWith("contact_messages");
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        full_name: "Jane Wanjiku",
        phone: "+254712345678",
        topic: "Membership",
        message: "I would like to join.",
        source: "website",
      }),
    );
  });
});
