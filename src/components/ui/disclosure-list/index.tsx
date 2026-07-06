import type { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.css";

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function DisclosureList({ className, ...props }: ComponentProps<"div">) {
  return <div className={classNames(styles.list, className)} {...props} />;
}

export function DisclosureItem({
  eyebrow,
  title,
  children,
  className,
  eyebrowClassName = styles.eyebrow,
  summaryClassName,
  titleClassName = styles.title,
  bodyClassName = styles.bodyText,
  bodySpacing = true,
  ...props
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  eyebrowClassName?: string;
  children: ReactNode;
  summaryClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  bodySpacing?: boolean;
} & Omit<ComponentProps<"details">, "title">) {
  return (
    <details className={classNames(styles.item, className)} {...props}>
      <summary className={classNames(styles.summary, summaryClassName)}>
        <span className={styles.titleStack}>
          {eyebrow ? <span className={eyebrowClassName}>{eyebrow}</span> : null}
          <span className={titleClassName}>{title}</span>
        </span>
        <span className={styles.icon} aria-hidden>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>
      <div
        className={classNames(
          styles.body,
          bodySpacing && styles.bodySpaced,
          bodyClassName,
        )}
      >
        {children}
      </div>
    </details>
  );
}
