import { describe, expect, it } from "vitest";
import {
  blogPostJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  pageMetadata,
  practiceJsonLd,
} from "./seo";

describe("pageMetadata", () => {
  it("includes default social images on every page", () => {
    const metadata = pageMetadata({
      title: "About",
      description: "About page",
      path: "/about",
    });

    expect(metadata.openGraph?.images).toEqual([
      { url: "/opengraph-image", width: 1200, height: 630 },
    ]);
    expect(metadata.twitter?.images).toEqual(["/opengraph-image"]);
  });
});

describe("structured data", () => {
  it("describes a practice and practitioner with structured location data", () => {
    const graph = practiceJsonLd({
      name: "Ruzicka Psychology",
      legalName: "Ruzicka Psychology PLLC",
      practitioner: "Dr. Christina Ruzicka, Psy.D.",
      email: "hello@example.com",
      phone: "(585) 555-0100",
      address: {
        streetAddress: "1577 South Avenue",
        addressLocality: "Rochester",
        addressRegion: "NY",
        postalCode: "14620",
        addressCountry: "US",
      },
      hours: [],
      availabilityStatus: "accepting",
      areaServed: ["Rochester, NY"],
      externalProfiles: [
        { label: "Psychology Today", url: "https://example.com/profile" },
      ],
    });

    expect(graph["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "ProfessionalService",
          address: expect.objectContaining({
            streetAddress: "1577 South Avenue",
            postalCode: "14620",
          }),
        }),
        expect.objectContaining({
          "@type": "Person",
          jobTitle: "Licensed Clinical Psychologist",
        }),
      ]),
    );
  });

  it("uses absolute breadcrumb URLs and article dates", () => {
    const breadcrumbs = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]);
    const post = blogPostJsonLd({
      title: "A useful article",
      slug: "a-useful-article",
      excerpt: "Description",
      date: "2026-01-01",
      updatedAt: "2026-02-01",
    });

    expect(breadcrumbs.itemListElement).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          position: 2,
          item: expect.stringMatching(/\/blog$/),
        }),
      ]),
    );
    expect(post.dateModified).toBe("2026-02-01");
  });

  it("builds FAQ structured data from the shared question shape", () => {
    const faq = faqPageJsonLd([
      { question: "How do I begin?", answer: "Request a consultation." },
    ]);

    expect(faq.mainEntity).toEqual([
      expect.objectContaining({
        "@type": "Question",
        name: "How do I begin?",
        acceptedAnswer: expect.objectContaining({
          text: "Request a consultation.",
        }),
      }),
    ]);
  });
});
