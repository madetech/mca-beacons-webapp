import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import { CheckboxList, CheckboxListItem } from "../../components/Checkbox";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormHint,
  FormLegend,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import {
  AnchorLink,
  GovUKBody,
  PageHeading,
} from "../../components/Typography";

interface PageHeadingInfoProps {
  heading: string;
}

const VesselCommunications: FunctionComponent = (): JSX.Element => {
  const pageHeading = "Check beacon details";

  // TODO: Use form validation to set this
  const pageHasErrors = false;

  return (
    <Layout
      navigation={<BackButton href="/register-a-beacon/about-the-vessel" />}
      title={pageHeading}
      pageHasErrors={pageHasErrors}
    >
      <Grid
        mainContent={
          <>
            <PageHeadingInfo heading={pageHeading} />
            <VesselCommunicationsForm />
            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};

const PageHeadingInfo: FunctionComponent<PageHeadingInfoProps> = ({
  heading,
}: PageHeadingInfoProps) => (
  <>
    <PageHeading>{heading}</PageHeading>

    <GovUKBody>
      Details about the onboard communications will be critical for Search and
      Rescue when trying to contact you in an emergency.
    </GovUKBody>
    <GovUKBody>
      If you have a radio license and have a Very High Frequency (VHF) and/or
      Very High Frequency (VHF) / Digital Selective Calling (DSC) radio, you can
      <AnchorLink href="https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/ships-radio">
        find up your Call Sign and Maritime Mobile Service Identity (MMSI)
        number on the OFCOM website.
      </AnchorLink>
    </GovUKBody>
  </>
);

const VesselCommunicationsForm: FunctionComponent = () => (
  <Form action="/register-a-beacon/vessel-communications">
    <CallSign />

    <TypesOfCommunication />

    <Button buttonText="Continue" />
  </Form>
);

const CallSign: FunctionComponent = () => (
  <>
    <FormGroup className="govuk-!-margin-top-4">
      <Input
        id="vesselCallSign"
        labelClassName="govuk-label--s"
        label="Vessel Call Sign (optional)"
        hintText="This is the unique Call Sign associated to this vessel"
        numOfChars={20}
      />
    </FormGroup>
  </>
);

const TypesOfCommunication: FunctionComponent = () => (
  <FormFieldset>
    <FormLegend className="govuk-fieldset__legend--s">
      Types of communication devices onboard
      <FormHint forId="typesOfCommunication">
        Tick all that apply and provide as much detail as you can
      </FormHint>
    </FormLegend>

    <FormGroup>
      <CheckboxList conditional={true}>
        <CheckboxListItem id="vhfRadio" value="" label="VHF Radio" />

        <CheckboxListItem
          id="fixedVhfRadio"
          label="Fixed VHF/DSC Radio"
          value=""
          conditional={true}
        >
          <Input
            id="fixedVhfRadioInput"
            label="Fixed MMSI number (optional)"
            hintText="This is the unique MMSI number associated to the vessel, it is 9
          digits long"
          />
        </CheckboxListItem>
        <CheckboxListItem
          id="portableVhfRadio"
          value=""
          label="Portable VHF/DSC Radio"
          conditional={true}
        >
          <Input
            id="portableVhfRadioInput"
            label="Portable MMSI number (optional)"
            hintText="This is the unique MMSI number associated to the portable radio and is 9 numbers long. E.g. starts with 2359xxxxx"
          />
        </CheckboxListItem>
        <CheckboxListItem
          id="satelliteTelephone"
          value=""
          label="Satellite Telephone"
          conditional={true}
        >
          <Input
            id="satelliteTelephoneInput"
            label="Enter phone number (optional)"
            hintText="Iridium usually start: +8707, Thuraya usually start: +8821, Globalstar usually start: +3364)"
          />
        </CheckboxListItem>
        <CheckboxListItem
          id="mobileTelephone"
          value=""
          label="Mobile Telephone(s)"
          conditional={true}
        >
          <Input
            id="mobileTelephoneInput1"
            label="Mobile number 1 (optional)"
            inputClassName="govuk-!-margin-bottom-4"
          />
          <Input
            id="mobileTelephoneInput2"
            label="Mobile number 2 (optional)"
          />
        </CheckboxListItem>
      </CheckboxList>
    </FormGroup>
  </FormFieldset>
);

export default VesselCommunications;
