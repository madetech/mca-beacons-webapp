import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { FormInputProps, Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { GovUKBody } from "../../components/Typography";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { CacheEntry } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";

interface BuildingNumberAndStreetInputProps {
  valueLine1: string;
  valueLine2: string;
  errorMessages: string[];
}

const definePageForm = ({
  beaconOwnerAddressLine1,
  beaconOwnerAddressLine2,
  beaconOwnerTownOrCity,
  beaconOwnerCounty,
  beaconOwnerPostcode,
}: CacheEntry): FormManager => {
  return new FormManager({
    beaconOwnerAddressLine1: new FieldManager(beaconOwnerAddressLine1, [
      Validators.required("Building number and street is a required field"),
    ]),
    beaconOwnerAddressLine2: new FieldManager(beaconOwnerAddressLine2),
    beaconOwnerTownOrCity: new FieldManager(beaconOwnerTownOrCity, [
      Validators.required("Town or city is a required field"),
    ]),
    beaconOwnerCounty: new FieldManager(beaconOwnerCounty),
    beaconOwnerPostcode: new FieldManager(beaconOwnerPostcode, [
      Validators.required("Postcode is a required field"),
      Validators.postcode("Postcode must be a valid UK postcode"),
    ]),
  });
};

const BeaconOwnerAddressPage: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const pageHeading = "What is the beacon owner's address?";

  return (
    <Layout
      navigation={<BackButton href="/register-a-beacon/about-beacon-owner" />}
      title={pageHeading}
      pageHasErrors={form.hasErrors}
      showCookieBanner={showCookieBanner}
    >
      <Grid
        mainContent={
          <>
            <Form action="/register-a-beacon/beacon-owner-address">
              <FormFieldset>
                <FormErrorSummary formErrors={form.errorSummary} />
                <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                <GovUKBody>
                  The beacon registration certificate and proof of registration
                  labels to stick to the beacon will be sent to this address
                </GovUKBody>
                <BuildingNumberAndStreetInput
                  valueLine1={form.fields.beaconOwnerAddressLine1.value}
                  valueLine2={form.fields.beaconOwnerAddressLine2.value}
                  errorMessages={
                    form.fields.beaconOwnerAddressLine1.errorMessages
                  }
                />
                <TownOrCityInput
                  value={form.fields.beaconOwnerTownOrCity.value}
                  errorMessages={
                    form.fields.beaconOwnerTownOrCity.errorMessages
                  }
                />
                <CountyInput value={form.fields.beaconOwnerCounty.value} />
                <PostcodeInput
                  value={form.fields.beaconOwnerPostcode.value}
                  errorMessages={form.fields.beaconOwnerPostcode.errorMessages}
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

const BuildingNumberAndStreetInput: FunctionComponent<BuildingNumberAndStreetInputProps> = ({
  valueLine1 = "",
  valueLine2 = "",
  errorMessages,
}: BuildingNumberAndStreetInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <Input
      id="beaconOwnerAddressLine1"
      label="Building number and street"
      defaultValue={valueLine1}
      inputClassName="govuk-!-margin-bottom-2"
    />
    <Input id="beaconOwnerAddressLine2" defaultValue={valueLine2} />
  </FormGroup>
);

const TownOrCityInput: FunctionComponent<FormInputProps> = ({
  value = "",
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <Input
      id="beaconOwnerTownOrCity"
      label="Town or city"
      defaultValue={value}
    />
  </FormGroup>
);

const CountyInput: FunctionComponent<FormInputProps> = ({
  value = "",
}: FormInputProps): JSX.Element => (
  <FormGroup>
    <Input
      id="beaconOwnerCounty"
      label="County (optional)"
      defaultValue={value}
    />
  </FormGroup>
);

const PostcodeInput: FunctionComponent<FormInputProps> = ({
  value = "",
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <Input id="beaconOwnerPostcode" label="Postcode" defaultValue={value} />
  </FormGroup>
);

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/emergency-contact",
  definePageForm
);

export default BeaconOwnerAddressPage;
