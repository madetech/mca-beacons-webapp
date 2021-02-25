import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import {
  RadioListConditional,
  RadioListItemConditional,
  RadioListItemHint,
} from "../../components/RadioList";
import { withCookieRedirect } from "../../lib/middleware";
import { MaritimePleasureVessel } from "../../lib/types";

interface BeaconUseFormProps {
  heading: string;
}

const PrimaryBeaconUse: FunctionComponent = (): JSX.Element => {
  const pageHeading =
    "What type of maritime pleasure vessel will you mostly use this beacon on?";

  // TODO: Use form validation to set this
  const pageHasErrors = false;

  return (
    <Layout
      navigation={<BackButton href="/register-a-beacon/beacon-information" />}
      title={pageHeading}
      pageHasErrors={pageHasErrors}
    >
      <Grid
        mainContent={
          <>
            <BeaconUseForm heading={pageHeading} />

            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};

const BeaconUseForm: FunctionComponent<BeaconUseFormProps> = ({
  heading,
}: BeaconUseFormProps) => (
  <Form action="/register-a-beacon/primary-beacon-use">
    <FormFieldset>
      <FormLegendPageHeading>{heading}</FormLegendPageHeading>
    </FormFieldset>
    <RadioListConditional>
      <RadioListItemHint
        id="motor-vessel"
        name="maritimePleasureVesselUse"
        value={MaritimePleasureVessel.MOTOR}
        hintText="E.g. Speedboat, RIB"
      >
        Motor vessel
      </RadioListItemHint>
      <RadioListItemHint
        id="sailing-vessel"
        name="maritimePleasureVesselUse"
        value={MaritimePleasureVessel.SAILING}
        hintText="E.g. Skiff, Dinghy, Yacht, Catamaran"
      >
        Sailing vessel
      </RadioListItemHint>
      <RadioListItemHint
        id="rowing-vessel"
        name="maritimePleasureVesselUse"
        value={MaritimePleasureVessel.ROWING}
        hintText="E.g. Single person rowing boat, Cornish Gig, Multi-person rowing boat"
      >
        Rowing vessel
      </RadioListItemHint>
      <RadioListItemHint
        id="small-unpowered-vessel"
        name="maritimePleasureVesselUse"
        value={MaritimePleasureVessel.SMALL_UNPOWERED}
        hintText="E.g. Canoe, Kayak"
      >
        Small unpowered vessel
      </RadioListItemHint>
      <RadioListItemHint
        id="other-pleasure-vessel"
        name="maritimePleasureVesselUse"
        value={MaritimePleasureVessel.OTHER}
        hintText="E.g. Surfboard, Kitesurfing"
        inputHtmlAttributes={{
          "data-aria-controls": "conditional-other-pleasure-vessel",
        }}
      >
        Other pleasure vessel
      </RadioListItemHint>
      <RadioListItemConditional id="conditional-other-pleasure-vessel">
        <FormGroup>
          <Input
            id="other-pleasure-vessel-text"
            name="otherPleasureVesselText"
            label="What sort of vessel is it?"
          />
        </FormGroup>
      </RadioListItemConditional>
    </RadioListConditional>

    <Button buttonText="Continue" />
  </Form>
);

export const getServerSideProps: GetServerSideProps = withCookieRedirect(
  async () => {
    return {
      props: {},
    };
  }
);

export default PrimaryBeaconUse;
