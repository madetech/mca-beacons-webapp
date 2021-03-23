import React, { FunctionComponent, ReactNode } from "react";
import { FormJSON } from "../lib/form/formManager";
import { BackButton, Button } from "./Button";
import { FormErrorSummary } from "./ErrorSummary";
import { Form, FormFieldset, FormLegendPageHeading } from "./Form";
import { Grid } from "./Grid";
import { InsetText } from "./InsetText";
import { Layout } from "./Layout";

interface FormPageProps {
  form: FormJSON;
  children: ReactNode;
  previousPageUrl: string;
  pageHeading: string;
  showCookieBanner: boolean;
  insetText?: ReactNode;
}

export const BeaconsForm: FunctionComponent<FormPageProps> = ({
  form,
  children,
  previousPageUrl,
  pageHeading,
  showCookieBanner,
  insetText = null,
}: FormPageProps): JSX.Element => {
  let insetComponent;
  if (insetText) {
    insetComponent = <InsetText>{insetText}</InsetText>;
  }

  return (
    <Layout
      navigation={<BackButton href={previousPageUrl} />}
      title={pageHeading}
      showCookieBanner={showCookieBanner}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary formErrors={form.errorSummary} />
            <Form>
              <FormFieldset>
                <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
              </FormFieldset>
              {insetComponent}
              {children}

              <Button buttonText="Continue" />
            </Form>
          </>
        }
      />
    </Layout>
  );
};
