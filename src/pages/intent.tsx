import React, { FunctionComponent } from "react";
import { Button } from "../components/Button";
import { Grid } from "../components/Grid";
import { Layout } from "../components/Layout";
import { RadioList, RadioListItem } from "../components/RadioList";
import { Form, FormFieldset, FormGroup, FormLegend } from "../components/Form";
import { BeaconIntent } from "../lib/types";

const IntentPage: FunctionComponent = () => (
  <>
    <Layout>
      <Grid
        mainContent={
          <>
            <IntentPageContent />
          </>
        }
      />
    </Layout>
  </>
);

const IntentPageContent: FunctionComponent = () => (
  <Form url="/">
    <FormGroup>
      <FormFieldset>
        <FormLegend>What would you like to do?</FormLegend>
        <RadioList className="govuk-!-margin-bottom-3">
          <RadioListItem
            id="create-beacon"
            name="beacon-intent"
            value={BeaconIntent.CREATE}
            text="Register a new beacon"
            hintText="Choose this option to register one or multiple new beacons"
          />
          <RadioListItem
            id="change-beacon"
            name="beacon-intent"
            value={BeaconIntent.UPDATE}
            text="Update details for existing beacon(s) you've already registered"
            hintText="Choose this option to change existing beacon details, vessel and aircraft details, owner details and emergency contact information"
          />
          <RadioListItem
            id="ownership"
            name="beacon-intent"
            value={BeaconIntent.CHANGE_OWNERSHIP}
            text="Change beacon ownership"
            hintText="Choose this option if you have acquired a beacon from another owner, or are no longer a beacon owner"
          />
          <RadioListItem
            id="withdraw"
            name="beacon-intent"
            value={BeaconIntent.WITHDRAW}
            text="Withdraw a beacon"
            hintText="Choose this option to inform us your beacon has been destroyed or withdrawn from use"
          />
          <RadioListItem
            id="other"
            name="beacon-intent"
            value={BeaconIntent.OTHER}
            text="Ask the Beacon Registry team a question"
            hintText="Choose this option if you have a specific question for the Beacon Registry"
          />
        </RadioList>

        <Button buttonText="Continue" />
      </FormFieldset>
    </FormGroup>
  </Form>
);

export default IntentPage;
