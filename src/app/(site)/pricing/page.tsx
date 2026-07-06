import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import {
  DisclosureItem,
  DisclosureList,
} from "@/components/ui/disclosure-list";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PortableContent } from "@/components/ui/portable-content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  DEFAULT_AVAILABILITY_STATUS,
  getAvailabilityStateCopy,
} from "@/lib/availability";
import { pageMetadata } from "@/lib/seo";
import { getPricingPage, getSiteSettings } from "@/lib/cms";
import styles from "./styles.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Session fees and out-of-network insurance details for therapy with Dr. Christina Ruzicka in Rochester, NY.",
  path: "/pricing",
});

export default async function Pricing() {
  const [pricing, site] = await Promise.all([
    getPricingPage(),
    getSiteSettings(),
  ]);
  if (!pricing) notFound();

  const availabilityStatus =
    site?.availabilityStatus ?? DEFAULT_AVAILABILITY_STATUS;
  const availabilityStateCopy = getAvailabilityStateCopy(
    availabilityStatus,
    site?.availabilityMessaging,
  );
  const waitlistAvailabilityCopy =
    availabilityStatus === "waitlist"
      ? site?.availabilityMessaging?.waitlist
      : null;
  const isDefaultAvailability =
    availabilityStatus === DEFAULT_AVAILABILITY_STATUS;
  const ctaHeading = isDefaultAvailability
    ? pricing.cta?.heading
    : availabilityStateCopy?.pricingCtaHeading;
  const ctaBody = isDefaultAvailability
    ? pricing.cta?.body
    : availabilityStateCopy?.pricingCtaBody;
  const ctaLabel =
    availabilityStatus === "waitlist"
      ? waitlistAvailabilityCopy?.pricingCtaLabel
      : isDefaultAvailability
        ? pricing.cta?.cta
        : undefined;

  const reimbursementGuideItems =
    pricing.reimbursementGuide?.items?.filter((item) => item.title) ?? [];
  const hasReimbursementGuide =
    pricing.reimbursementGuide &&
    (pricing.reimbursementGuide.eyebrow ||
      pricing.reimbursementGuide.heading ||
      pricing.reimbursementGuide.intro ||
      reimbursementGuideItems.length > 0);

  return (
    <div className={styles.root}>
      <PageHeader
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        intro={pricing.intro}
        sectionSize="spacious"
        layout="grid"
        headingWidth="sm"
      >
        <div className={styles.pricingCard}>
          {/* fees */}
          {pricing.fees ? (
            <div className={styles.feesPanel}>
              <h2 className={styles.feesHeading}>{pricing.fees.heading}</h2>
              <div className={styles.feesList}>
                {pricing.fees.items?.map((item) => (
                  <div key={item.label} className={styles.feeRow}>
                    <div>
                      <div className={styles.feeLabel}>{item.label}</div>
                      <div className={styles.feeDetail}>{item.detail}</div>
                    </div>
                    <div className={styles.feePrice}>{item.price}</div>
                  </div>
                ))}
              </div>
              <p className={styles.feeNote}>{pricing.fees.note}</p>
            </div>
          ) : null}

          {/* insurance */}
          {pricing.insurance ? (
            <div className={styles.insurancePanel}>
              <h2 className={styles.insuranceHeading}>
                {pricing.insurance.heading}
              </h2>
              <PortableContent
                value={pricing.insurance.body}
                className={styles.insuranceBody}
              />
            </div>
          ) : null}
        </div>
      </PageHeader>

      {hasReimbursementGuide ? (
        <Section tone="feature" size="spacious">
          <Container size="md">
            {pricing.reimbursementGuide?.heading ? (
              <SectionHeading
                eyebrow={pricing.reimbursementGuide.eyebrow}
                heading={pricing.reimbursementGuide.heading}
                intro={pricing.reimbursementGuide.intro}
                headingAs="h2"
              />
            ) : null}

            {reimbursementGuideItems.length > 0 ? (
              <DisclosureList>
                {reimbursementGuideItems.map((item) => (
                  <DisclosureItem
                    key={item._key ?? item.title}
                    eyebrow={item.eyebrow}
                    title={item.title}
                  >
                    <PortableContent value={item.body} />
                  </DisclosureItem>
                ))}
              </DisclosureList>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {/* CTA */}
      {ctaHeading ? (
        <CtaBand
          heading={ctaHeading}
          body={ctaBody}
          cta={ctaLabel}
          href="/contact"
          event="consultation_cta_click"
          backgroundImage={pricing.cta?.backgroundImage}
        />
      ) : null}
    </div>
  );
}
