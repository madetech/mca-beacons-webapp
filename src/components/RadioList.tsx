import React, { FunctionComponent, ReactNode } from "react";
import { FormHint, FormLabel } from "./Form";

interface RadioListProps {
  className?: string;
  children: ReactNode;
}

interface RadioListConditionalProps {
  className?: string;
  children: ReactNode;
}

interface RadioListItemProps {
  id: string;
  name: string;
  value: string;
  children: ReactNode;
  inputHtmlAttributes?: Record<string, string>;
}

interface RadioListItemHintProps {
  id: string;
  name: string;
  value: string;
  children: ReactNode;
  hintText: string;
  inputHtmlAttributes?: Record<string, string | boolean>;
}

interface RadioListItemConditionalProps {
  id: string;
  children: ReactNode;
}

export const RadioList: FunctionComponent<RadioListProps> = ({
  className = "",
  children,
}: RadioListProps): JSX.Element => (
  <div className={`govuk-radios ${className}`}>{children}</div>
);

export const RadioListConditional: FunctionComponent<RadioListConditionalProps> = ({
  className = "",
  children,
}: RadioListProps): JSX.Element => (
  <div
    className={`govuk-radios govuk-radios--conditional ${className}`}
    data-module="govuk-radios"
  >
    {children}
  </div>
);

export const RadioListItem: FunctionComponent<RadioListItemProps> = ({
  id,
  name,
  value,
  children,
  inputHtmlAttributes = {},
}: RadioListItemProps): JSX.Element => (
  <div className="govuk-radios__item">
    <input
      className="govuk-radios__input"
      id={id}
      name={name}
      type="radio"
      value={value}
      {...inputHtmlAttributes}
    />
    <FormLabel className="govuk-radios__label" htmlFor={id}>
      {children}
    </FormLabel>
  </div>
);

export const RadioListItemHint: FunctionComponent<RadioListItemHintProps> = ({
  id,
  name,
  value,
  children,
  hintText,
  inputHtmlAttributes = {},
}: RadioListItemHintProps): JSX.Element => (
  <div className="govuk-radios__item">
    <input
      className="govuk-radios__input"
      id={id}
      name={name}
      type="radio"
      value={value}
      aria-describedby={`${id}-hint`}
      {...inputHtmlAttributes}
    />
    <FormLabel className="govuk-radios__label" htmlFor={id}>
      {children}
    </FormLabel>

    <FormHint forId={id} className="govuk-radios__hint">
      {hintText}
    </FormHint>
  </div>
);

export const RadioListItemConditional: FunctionComponent<RadioListItemConditionalProps> = ({
  id,
  children,
}: RadioListItemConditionalProps): JSX.Element => (
  <div
    className="govuk-radios__conditional govuk-radios__conditional--hidden"
    id={id}
  >
    {children}
  </div>
);
