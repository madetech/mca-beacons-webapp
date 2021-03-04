import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import {
  DateListInput,
  DateListItem,
  DateType,
} from "../../components/DateInput";
import { Details } from "../../components/Details";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { FormInputProps, Input } from "../../components/Input";
import { InsetText } from "../../components/InsetText";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { CacheEntry } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";

interface DateInputProps {
  monthValue: string;
  yearValue: string;
  errorMessages: string[];
}

function getISODate(year: string, month: string): string {
  try {
    return new Date(`${year}-${month}`).toISOString();
  } catch {
    return null;
  }
}

const definePageForm = ({
  manufacturerSerialNumber,
  chkCode,
  batteryExpiryDate,
  batteryExpiryDateMonth,
  batteryExpiryDateYear,
  lastServicedDate,
  lastServicedDateMonth,
  lastServicedDateYear,
}: CacheEntry): FormManager => {
  return new FormManager({
    manufacturerSerialNumber: new FieldManager(manufacturerSerialNumber, [
      Validators.required("Beacon manufacturer is a required field"),
    ]),
    chkCode: new FieldManager(chkCode),
    batteryExpiryDate: new FieldManager(
      batteryExpiryDate,
      [
        {
          errorMessage: "Enter a complete battery expiry date",
          applies: (value) => value !== null,
        },
      ],
      [
        {
          dependsOn: "batteryExpiryDateMonth",
          meetingCondition: (value) => !value,
        },
        {
          dependsOn: "batteryExpiryDateYear",
          meetingCondition: (value) => !value,
        },
      ]
    ),
    batteryExpiryDateMonth: new FieldManager(batteryExpiryDateMonth),
    batteryExpiryDateYear: new FieldManager(batteryExpiryDateYear),
    lastServicedDate: new FieldManager(
      lastServicedDate,
      [
        {
          errorMessage: "Enter a complete last serviced date",
          applies: (value) => value !== null,
        },
      ],
      [
        {
          dependsOn: "lastServicedDateMonth",
          meetingCondition: (value) => !!value,
        },
        {
          dependsOn: "lastServicedDateYear",
          meetingCondition: (value) => !!value,
        },
      ]
    ),
    lastServicedDateMonth: new FieldManager(lastServicedDateMonth),
    lastServicedDateYear: new FieldManager(lastServicedDateYear),
  });
};

const BeaconInformationPage: FunctionComponent<FormPageProps> = ({
  form,
}: FormPageProps): JSX.Element => {
  const pageHeading = "Beacon information";

  return (
    <Layout
      navigation={<BackButton href="/register-a-beacon/check-beacon-details" />}
      title={pageHeading}
      pageHasErrors={form.hasErrors}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary formErrors={form.errorSummary} />
            <Form action="/register-a-beacon/beacon-information">
              <FormFieldset>
                <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                <InsetText>
                  Further information about your beacon is useful for Search and
                  Rescue. Provide as much information you can find.
                </InsetText>

                <ManufacturerSerialNumberInput
                  value={form.fields.manufacturerSerialNumber.value}
                  errorMessages={
                    form.fields.manufacturerSerialNumber.errorMessages
                  }
                />

                <CHKCode value={form.fields.chkCode.value} />

                <BatteryExpiryDate
                  monthValue={form.fields.batteryExpiryDateMonth.value}
                  yearValue={form.fields.batteryExpiryDateYear.value}
                  errorMessages={form.fields.batteryExpiryDate.errorMessages}
                />

                <LastServicedDate
                  monthValue={form.fields.lastServicedDateMonth.value}
                  yearValue={form.fields.lastServicedDateYear.value}
                  errorMessages={form.fields.lastServicedDate.errorMessages}
                />
              </FormFieldset>
              <Button buttonText="Continue" />
              <IfYouNeedHelp />
            </Form>
          </>
        }
      />
    </Layout>
  );
};

const ManufacturerSerialNumberInput: FunctionComponent<FormInputProps> = ({
  value,
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <Input
      id="manufacturerSerialNumber"
      label="Enter beacon manufacturer serial number"
      htmlAttributes={{ spellCheck: false }}
      defaultValue={value}
    />
    <Details
      className="govuk-!-padding-top-2"
      summaryText="Where can I find the manufacturer serial number?"
    >
      TODO: Details text for where the user can find the manufacturer serial
      number.
    </Details>
  </FormGroup>
);

const CHKCode: FunctionComponent<FormInputProps> = ({
  value,
}: FormInputProps): JSX.Element => (
  <FormGroup>
    <Input
      id="chkCode"
      label="Enter the beacon CHK code (optional)"
      hintText="This might be on the registration card you received when you bought the
      beacon"
      defaultValue={value}
      htmlAttributes={{ spellCheck: false }}
    />
    <Details
      // TODO: Add govuk-!-!-padding-top-2 to component
      className="govuk-!-padding-top-2"
      summaryText="What is the beacon CHK code?"
    >
      If the beacon manufacturer uses a CHK code, it will be written on the
      manufacturers card underneath the Hex ID or UIN and serial number. An
      example is: CHK: 9480B
    </Details>
  </FormGroup>
);

const BatteryExpiryDate: FunctionComponent<DateInputProps> = ({
  monthValue,
  yearValue,
  errorMessages,
}: DateInputProps): JSX.Element => (
  <DateListInput
    id="battery-expiry-date"
    label="Enter your beacon battery expiry date (optional)"
    hintText="You only need to enter the month and year, for example 11 2009"
    errorMessages={errorMessages}
  >
    <DateListItem
      id="batteryExpiryDate"
      name="batteryExpiryDateMonth"
      label="Month"
      defaultValue={monthValue}
      dateType={DateType.MONTH}
    />

    <DateListItem
      id="batteryExpiryDateYear"
      label="Year"
      defaultValue={yearValue}
      dateType={DateType.YEAR}
    />
  </DateListInput>
);

const LastServicedDate: FunctionComponent<DateInputProps> = ({
  monthValue,
  yearValue,
  errorMessages,
}: DateInputProps): JSX.Element => (
  <DateListInput
    id="last-serviced-date"
    label="When was your beacon last serviced? (optional)"
    hintText="You only need to enter the month and year, for example 11 2009"
    errorMessages={errorMessages}
  >
    <DateListItem
      id="lastServicedDate"
      name="lastServicedDateMonth"
      label="Month"
      defaultValue={monthValue}
      dateType={DateType.MONTH}
    />

    <DateListItem
      id="lastServicedDateYear"
      label="Year"
      defaultValue={yearValue}
      dateType={DateType.YEAR}
    />
  </DateListInput>
);

const transformFormData = (formData: CacheEntry): CacheEntry => {
  formData["batteryExpiryDate"] = getISODate(
    formData.batteryExpiryDateYear,
    formData.batteryExpiryDateMonth
  );
  formData["lastServicedDate"] = getISODate(
    formData.lastServicedDateYear,
    formData.lastServicedDateMonth
  );

  return formData;
};

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/primary-beacon-use",
  definePageForm,
  transformFormData
);

export default BeaconInformationPage;
