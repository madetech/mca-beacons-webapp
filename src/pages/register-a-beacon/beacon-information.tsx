import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { BeaconsForm } from "../../components/BeaconsForm";
import {
  DateListInput,
  DateListItem,
  DateType,
} from "../../components/DateInput";
import { Details } from "../../components/Details";
import { FormGroup } from "../../components/Form";
import { FormInputProps, Input } from "../../components/Input";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { FormSubmission } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { padNumberWithLeadingZeros } from "../../lib/utils";

interface DateInputProps {
  monthValue: string;
  yearValue: string;
  errorMessages: string[];
}

function getISODate(year: string, month: string): string {
  const monthAsNumber = Number(month);
  const yearAsNumber = Number(year);
  const isValidMonth = monthAsNumber > 0 && monthAsNumber < 13;

  if (yearAsNumber && isValidMonth) {
    try {
      return new Date(yearAsNumber, monthAsNumber - 1).toISOString();
    } catch {
      return null;
    }
  }

  return null;
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
}: FormSubmission): FormManager => {
  return new FormManager({
    manufacturerSerialNumber: new FieldManager(manufacturerSerialNumber, [
      Validators.required(
        "Beacon manufacturer serial number is a required field"
      ),
    ]),
    chkCode: new FieldManager(chkCode),
    batteryExpiryDate: new FieldManager(
      batteryExpiryDate,
      [
        Validators.isValidDate("Enter a correct battery expiry date"),
        Validators.minDateYear("Battery expiry date must be after 1980", 1980),
      ],
      [
        {
          dependsOn: "batteryExpiryDate",
          meetingCondition: () =>
            batteryExpiryDateYear !== "" || batteryExpiryDateMonth !== "",
        },
      ]
    ),
    batteryExpiryDateMonth: new FieldManager(batteryExpiryDateMonth),
    batteryExpiryDateYear: new FieldManager(batteryExpiryDateYear),
    lastServicedDate: new FieldManager(
      lastServicedDate,
      [
        Validators.isValidDate("Enter a correct last serviced date"),
        Validators.isInThePast("Enter a last serviced date in the past"),
        Validators.minDateYear("Last serviced date must be after 1980", 1980),
      ],
      [
        {
          dependsOn: "lastServicedDate",
          meetingCondition: () =>
            lastServicedDateYear !== "" || lastServicedDateMonth !== "",
        },
      ]
    ),
    lastServicedDateMonth: new FieldManager(lastServicedDateMonth),
    lastServicedDateYear: new FieldManager(lastServicedDateYear),
  });
};

const BeaconInformationPage: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const pageHeading = "Beacon information";

  return (
    <BeaconsForm
      previousPageUrl="/register-a-beacon/check-beacon-details"
      pageHeading={pageHeading}
      showCookieBanner={showCookieBanner}
      formErrors={form.errorSummary}
      insetText="Further information about your beacon is useful for Search and
      Rescue. Provide as much information you can find."
    >
      <ManufacturerSerialNumberInput
        value={form.fields.manufacturerSerialNumber.value}
        errorMessages={form.fields.manufacturerSerialNumber.errorMessages}
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
    </BeaconsForm>
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
      <Image
        src="/assets/mca_images/beacon_serial_number.png"
        alt="Where to find your beacon's manufacturer serial number"
        height={640}
        width={960}
      />
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
    id="batteryExpiryDate"
    label="Enter your beacon battery expiry date (optional)"
    hintText="You only need to enter the month and year, for example 11 2009"
    errorMessages={errorMessages}
  >
    <DateListItem
      id="batteryExpiryDateMonth"
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
    id="lastServicedDate"
    label="When was your beacon last serviced? (optional)"
    hintText="You only need to enter the month and year, for example 11 2009"
    errorMessages={errorMessages}
  >
    <DateListItem
      id="lastServicedDateMonth"
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

const transformFormData = (formData: FormSubmission): FormSubmission => {
  formData = {
    ...formData,
    batteryExpiryDate: getISODate(
      formData.batteryExpiryDateYear,
      formData.batteryExpiryDateMonth
    ),
    lastServicedDate: getISODate(
      formData.lastServicedDateYear,
      formData.lastServicedDateMonth
    ),
    batteryExpiryDateMonth: padNumberWithLeadingZeros(
      formData.batteryExpiryDateMonth
    ),
    lastServicedDateMonth: padNumberWithLeadingZeros(
      formData.lastServicedDateMonth
    ),
  };

  return formData;
};

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/beacon-use",
  definePageForm,
  transformFormData
);

export default BeaconInformationPage;
