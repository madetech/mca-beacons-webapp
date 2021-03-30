import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, ReactNode } from "react";
import { formatUrlQueryParams } from "../lib/utils";

interface ButtonGroupProps {
  children: ReactNode;
}

interface ButtonProps {
  buttonText: string;
}

interface StartButtonProps {
  buttonText?: string;
  href: string;
}

interface BackButtonProps {
  href: string;
}

interface LinkButtonProps {
  buttonText: string;
  href: string;
}

export const ButtonGroup: FunctionComponent<ButtonGroupProps> = ({
  children,
}: ButtonGroupProps): JSX.Element => (
  <div className="govuk-button-group">{children}</div>
);

export const Button: FunctionComponent<ButtonProps> = ({
  buttonText,
}: ButtonProps): JSX.Element => (
  <button className="govuk-button" data-module="govuk-button">
    {buttonText}
  </button>
);

export const StartButton: FunctionComponent<StartButtonProps> = ({
  buttonText = "Start now",
  href,
}: StartButtonProps): JSX.Element => (
  <Link href={href}>
    <a
      role="button"
      draggable="false"
      className="govuk-button govuk-button--start"
      data-module="govuk-button"
    >
      {buttonText}
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    </a>
  </Link>
);

export const BackButton: FunctionComponent<BackButtonProps> = ({
  href,
}: BackButtonProps): JSX.Element => {
  return (
    <Link href={href}>
      <a className="govuk-back-link">Back</a>
    </Link>
  );
};

export const BackButtonRouterIndexes: FunctionComponent<BackButtonProps> = ({
  href,
}: BackButtonProps): JSX.Element => {
  const router = useRouter();
  const useIndex = router?.query.useIndex || 0;
  href = formatUrlQueryParams(href, { useIndex });

  return (
    <Link href={href}>
      <a className="govuk-back-link">Back</a>
    </Link>
  );
};

export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  buttonText,
  href,
}: LinkButtonProps): JSX.Element => (
  <Link href={href}>
    <a
      role="button"
      draggable="false"
      className="govuk-button"
      data-module="govuk-button"
    >
      {buttonText}
    </a>
  </Link>
);
