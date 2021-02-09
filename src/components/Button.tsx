import React, { FunctionComponent } from "react";
import Link from "next/link";

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
}: BackButtonProps): JSX.Element => (
  <a href={href} className="govuk-back-link">
    Back
  </a>
);
