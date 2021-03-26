import { GetServerSideProps } from "next";
import React, { FunctionComponent, ReactNode } from "react";
import { BackButton, Button } from "../../components/Button";
import { FormErrorSummary } from "../../components/ErrorSummary";
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
import { RadioList, RadioListItem } from "../../components/RadioList";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { CacheEntry } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { MaritimePleasureVessel } from "../../lib/types";

const definePageForm = ({
  maritimePleasureVesselUse,
  otherPleasureVesselText,
}: CacheEntry): FormManager => {
  return new FormManager({
    maritimePleasureVesselUse: new FieldManager(maritimePleasureVesselUse, [
      Validators.required("Maritime pleasure use is a required field"),
    ]),
    otherPleasureVesselText: new FieldManager(
      otherPleasureVesselText,
      [Validators.required("Other pleasure vessel text is a required field")],
      [
        {
          dependsOn: "maritimePleasureVesselUse",
          meetingCondition: (value) => value === MaritimePleasureVessel.OTHER,
        },
      ]
    ),
  });
};

const PrimaryBeaconUse: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const maritimePleasureVesselName = "maritimePleasureVesselUse";

  const backButton: ReactNode = (
    <BackButton href={"register-a-beacon/beacon-information"} />
  );

  return (
    <Layout
      title={
        "What type of maritime pleasure vessel will you mostly use this beacon on?"
      }
      navigation={backButton}
      pageHasErrors={form.hasErrors}
      showCookieBanner={showCookieBanner}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary formErrors={form.errorSummary} />
            <Form action="/register-a-beacon/primary-beacon-use">
              <FormGroup
                errorMessages={
                  form.fields.maritimePleasureVesselUse.errorMessages
                }
              >
                <FormFieldset>
                  <FormLegendPageHeading>
                    What type of maritime pleasure vessel will you mostly use
                    this beacon on?
                  </FormLegendPageHeading>
                </FormFieldset>
                <RadioList conditional={true}>
                  <RadioListItem
                    id="motor-vessel"
                    name={maritimePleasureVesselName}
                    value={MaritimePleasureVessel.MOTOR}
                    label="Motor vessel"
                    hintText="E.g. Speedboat, RIB"
                    defaultChecked={
                      form.fields.maritimePleasureVesselUse.value ===
                      MaritimePleasureVessel.MOTOR
                    }
                  />
                  <RadioListItem
                    id="sailing-vessel"
                    name={maritimePleasureVesselName}
                    value={MaritimePleasureVessel.SAILING}
                    label="Sailing vessel"
                    hintText="E.g. Skiff, Dinghy, Yacht, Catamaran"
                    defaultChecked={
                      form.fields.maritimePleasureVesselUse.value ===
                      MaritimePleasureVessel.SAILING
                    }
                  />
                  <RadioListItem
                    id="rowing-vessel"
                    name={maritimePleasureVesselName}
                    value={MaritimePleasureVessel.ROWING}
                    label="Rowing vessel"
                    hintText="E.g. Single person rowing boat, Cornish Gig, Multi-person rowing boat"
                    defaultChecked={
                      form.fields.maritimePleasureVesselUse.value ===
                      MaritimePleasureVessel.ROWING
                    }
                  />
                  <RadioListItem
                    id="maritimePleasureVesselUse"
                    value={MaritimePleasureVessel.SMALL_UNPOWERED}
                    label="Small unpowered vessel"
                    hintText="E.g. Canoe, Kayak"
                    defaultChecked={
                      form.fields.maritimePleasureVesselUse.value ===
                      MaritimePleasureVessel.SMALL_UNPOWERED
                    }
                  />
                  <RadioListItem
                    id="other-pleasure-vessel"
                    name={maritimePleasureVesselName}
                    value={MaritimePleasureVessel.OTHER}
                    label="Other pleasure vessel"
                    hintText="E.g. Surfboard, Kitesurfing"
                    defaultChecked={
                      form.fields.maritimePleasureVesselUse.value ===
                      MaritimePleasureVessel.OTHER
                    }
                    conditional={true}
                  >
                    <FormGroup
                      errorMessages={
                        form.fields.otherPleasureVesselText.errorMessages
                      }
                    >
                      <Input
                        id="otherPleasureVesselText"
                        label="What sort of vessel is it?"
                        defaultValue={form.fields.otherPleasureVesselText.value}
                      />
                    </FormGroup>
                  </RadioListItem>
                </RadioList>
              </FormGroup>

              <Button buttonText="Continue" />
            </Form>

            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/about-the-vessel",
  definePageForm
);

export default PrimaryBeaconUse;
