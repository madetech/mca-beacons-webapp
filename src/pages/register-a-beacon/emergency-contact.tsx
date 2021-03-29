import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegend,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Input } from "../../components/Input";
import { InsetText } from "../../components/InsetText";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { WarningText } from "../../components/WarningText";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { FormSubmission } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";

export interface EmergencyContactGroupProps {
  index: string;
  fullName: string;
  telephoneNumber: string;
  alternativeTelephoneNumber: string;
  fullNameErrorMessages?: string[];
  fullNameErrors?: boolean;
  telephoneNumberErrorMessages?: string[];
  telephoneNumberErrors?: boolean;
}

const definePageForm = ({
  emergencyContact1FullName,
  emergencyContact1TelephoneNumber,
  emergencyContact1AlternativeTelephoneNumber,
  emergencyContact2FullName,
  emergencyContact2TelephoneNumber,
  emergencyContact2AlternativeTelephoneNumber,
  emergencyContact3FullName,
  emergencyContact3TelephoneNumber,
  emergencyContact3AlternativeTelephoneNumber,
}: FormSubmission): FormManager => {
  return new FormManager({
    emergencyContact1FullName: new FieldManager(emergencyContact1FullName, [
      Validators.required("Emergency contact full name is a required field"),
    ]),
    emergencyContact1TelephoneNumber: new FieldManager(
      emergencyContact1TelephoneNumber,
      [
        Validators.required(
          "Emergency contact telephone number is a required field"
        ),
        Validators.phoneNumber(
          "Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192"
        ),
      ]
    ),
    emergencyContact1AlternativeTelephoneNumber: new FieldManager(
      emergencyContact1AlternativeTelephoneNumber
    ),
    emergencyContact2FullName: new FieldManager(emergencyContact2FullName),
    emergencyContact2TelephoneNumber: new FieldManager(
      emergencyContact2TelephoneNumber
    ),
    emergencyContact2AlternativeTelephoneNumber: new FieldManager(
      emergencyContact2AlternativeTelephoneNumber
    ),
    emergencyContact3FullName: new FieldManager(emergencyContact3FullName),
    emergencyContact3TelephoneNumber: new FieldManager(
      emergencyContact3TelephoneNumber
    ),
    emergencyContact3AlternativeTelephoneNumber: new FieldManager(
      emergencyContact3AlternativeTelephoneNumber
    ),
  });
};

const EmergencyContact: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const pageHeading = "Add emergency contact information for up to 3 people";

  return (
    <>
      <Layout
        navigation={
          <BackButton href="/register-a-beacon/beacon-owner-address" />
        }
        title={pageHeading}
        pageHasErrors={form.hasErrors}
        showCookieBanner={showCookieBanner}
      >
        <Grid
          mainContent={
            <>
              <Form action="/register-a-beacon/emergency-contact">
                <FormFieldset>
                  <FormErrorSummary formErrors={form.errorSummary} />
                  <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                  <InsetText>
                    Your emergency contact information is vital for Search and
                    Rescue. Provide as much detail as possible. Provide at least
                    one contact.
                  </InsetText>
                  <WarningText>
                    It is important that all your emergency contacts know the
                    details of any trip you make, such as departure and expected
                    arrival times, your planned route, how many persons you will
                    be with and how to reach you in an emergency.
                    <br />
                    Only choose those people likely to know this information to
                    be your emergency contact(s).
                  </WarningText>

                  <EmergencyContactGroup
                    index="1"
                    fullName={form.fields.emergencyContact1FullName.value}
                    telephoneNumber={
                      form.fields.emergencyContact1TelephoneNumber.value
                    }
                    alternativeTelephoneNumber={
                      form.fields.emergencyContact1AlternativeTelephoneNumber
                        .value
                    }
                    fullNameErrorMessages={
                      form.fields.emergencyContact1FullName.errorMessages
                    }
                    telephoneNumberErrorMessages={
                      form.fields.emergencyContact1TelephoneNumber.errorMessages
                    }
                  />

                  <EmergencyContactGroup
                    index="2"
                    fullName={form.fields.emergencyContact2FullName.value}
                    telephoneNumber={
                      form.fields.emergencyContact2TelephoneNumber.value
                    }
                    alternativeTelephoneNumber={
                      form.fields.emergencyContact2AlternativeTelephoneNumber
                        .value
                    }
                  />

                  <EmergencyContactGroup
                    index="3"
                    fullName={form.fields.emergencyContact3FullName.value}
                    telephoneNumber={
                      form.fields.emergencyContact3TelephoneNumber.value
                    }
                    alternativeTelephoneNumber={
                      form.fields.emergencyContact3AlternativeTelephoneNumber
                        .value
                    }
                  />
                </FormFieldset>
                <Button buttonText="Continue" />
              </Form>
              <IfYouNeedHelp />
            </>
          }
        />
      </Layout>
    </>
  );
};

const EmergencyContactGroup: FunctionComponent<EmergencyContactGroupProps> = ({
  index = "",
  fullName = "",
  telephoneNumber = "",
  alternativeTelephoneNumber = "",
  fullNameErrorMessages,
  telephoneNumberErrorMessages,
}: EmergencyContactGroupProps): JSX.Element => (
  <>
    <FormLegend size="medium">
      Emergency contact {index}
      {index == "1" ? "" : " (optional)"}
    </FormLegend>
    <FormGroup errorMessages={fullNameErrorMessages}>
      <Input
        id={"emergencyContact" + index + "FullName"}
        label={
          "Emergency contact's full name" + (index == "1" ? "" : " (optional)")
        }
        defaultValue={fullName}
      />
    </FormGroup>
    <FormGroup errorMessages={telephoneNumberErrorMessages}>
      <Input
        id={"emergencyContact" + index + "TelephoneNumber"}
        label={
          "Emergency contact's primary telephone number" +
          (index == "1" ? "" : " (optional)")
        }
        defaultValue={telephoneNumber}
      />
    </FormGroup>
    <FormGroup>
      <Input
        id={"emergencyContact" + index + "AlternativeTelephoneNumber"}
        label="Emergency contact's secondary telephone number (optional)"
        defaultValue={alternativeTelephoneNumber}
      />
    </FormGroup>
  </>
);

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/check-your-answers",
  definePageForm
);

export default EmergencyContact;
