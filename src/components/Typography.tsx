import React, { FunctionComponent, ReactNode } from "react";

interface PageHeadingProps {
  children: ReactNode;
}

interface SectionHeadingProps {
  children: ReactNode;
}

interface AnchorLinkProps {
  href: string;
  children: ReactNode;
}

interface GovUKBodyProps {
  children: ReactNode;
  className?: string;
}

interface GovUKListProps {
  children: ReactNode;
}

export const PageHeading: FunctionComponent = ({
  children,
}: PageHeadingProps): JSX.Element => (
  <h1 className="govuk-heading-l">{children}</h1>
);

export const SectionHeading: FunctionComponent = ({
  children,
}: SectionHeadingProps): JSX.Element => (
  <h2 className="govuk-heading-m">{children}</h2>
);

export const AnchorLink: FunctionComponent<AnchorLinkProps> = ({
  href,
  children,
}: AnchorLinkProps): JSX.Element => (
  <a href={href} className="govuk-link">
    {children}
  </a>
);

export const GovUKBody: FunctionComponent<GovUKBodyProps> = ({
  className = "",
  children,
}: GovUKBodyProps): JSX.Element => (
  <p className={`govuk-body ${className}`}>{children}</p>
);

export const GovUKList: FunctionComponent<GovUKListProps> = ({
  children,
}: GovUKListProps): JSX.Element => <ul className="govuk-list">{children}</ul>;

export const GovUKBulletedList: FunctionComponent<GovUKListProps> = ({
  children,
}: GovUKListProps): JSX.Element => (
  <ul className="govuk-list govuk-list--bullet">{children}</ul>
);
