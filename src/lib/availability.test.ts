import { describe, expect, it } from "vitest";
import {
  getAvailabilityStateCopy,
  initialAvailabilityMessaging,
  normalizeAvailabilityStatus,
} from "./availability";

describe("availability helpers", () => {
  it("normalizes accepting values without falling through to waitlist", () => {
    expect(normalizeAvailabilityStatus("accepting")).toBe("accepting");
    expect(normalizeAvailabilityStatus("Accepting new patients")).toBe(
      "accepting",
    );
    expect(normalizeAvailabilityStatus(undefined)).toBe("accepting");
  });

  it("does not return alternate copy for accepting status", () => {
    const copy = getAvailabilityStateCopy("accepting", {
      waitlist: { heroCta: "Custom waitlist" },
    });

    expect(copy).toBeNull();
  });

  it("selects the matching Sanity-owned message set", () => {
    const copy = getAvailabilityStateCopy("waitlist", {
      waitlist: {
        ...initialAvailabilityMessaging.waitlist,
        heroCta: "Custom waitlist",
        pricingCtaLabel: "Custom pricing waitlist",
      },
    });

    expect(copy).toMatchObject({
      heroCta: "Custom waitlist",
      pricingCtaLabel: "Custom pricing waitlist",
    });
  });

  it("returns null when alternate-state copy is missing from Sanity", () => {
    expect(getAvailabilityStateCopy("waitlist", null)).toBeNull();
  });
});
