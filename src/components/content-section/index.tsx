import type { ComponentProps } from "react";
import { Container } from "@/components/container";
import { GridContainer } from "@/components/grid";
import { Section } from "@/components/section";

export function ContentSection({
  containerSize = "xl",
  containerClassName,
  layout = "stack",
  className,
  children,
  ...sectionProps
}: {
  containerSize?: ComponentProps<typeof Container>["size"];
  containerClassName?: string;
  layout?: "stack" | "site";
} & ComponentProps<typeof Section>) {
  return (
    <Section
      data-slot="content-section"
      className={className}
      {...sectionProps}
    >
      {layout === "site" ? (
        <GridContainer
          data-slot="content-section-content"
          size={containerSize}
          className={containerClassName}
        >
          {children}
        </GridContainer>
      ) : (
        <Container
          data-slot="content-section-content"
          size={containerSize}
          className={containerClassName}
        >
          {children}
        </Container>
      )}
    </Section>
  );
}
