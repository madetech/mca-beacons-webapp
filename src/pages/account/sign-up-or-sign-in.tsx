import { GetServerSideProps } from "next";
import React, { FunctionComponent, useEffect } from "react";
import { BeaconsForm } from "../../components/BeaconsForm";
import { FormGroup } from "../../components/Form";
import { RadioList, RadioListItem } from "../../components/RadioList";
import { GovUKBody } from "../../components/Typography";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import {
  DestinationIfValidCallback,
  FormPageProps,
  handlePageRequest,
} from "../../lib/handlePageRequest";
import { PageURLs } from "../../lib/urls";

const getPageForm = ({ signUpOrSignIn }) => {
  return new FormManager({
    signUpOrSignIn: new FieldManager(signUpOrSignIn, [
      Validators.required("Please select an option"),
    ]),
  });
};

export const SignUpOrSignIn: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const pageHeading = "Do you have a Beacon Registry Account?";
  const pageText = (
    <GovUKBody>
      {"You will need an account to register your beacon online."}
    </GovUKBody>
  );

  const fieldName = "signUpOrSignIn";

  return (
    <BeaconsForm
      formErrors={form.errorSummary}
      previousPageUrl={PageURLs.start}
      pageHeading={pageHeading}
      showCookieBanner={showCookieBanner}
      pageText={pageText}
      includeUseIndex={false}
      onSubmit= {handleFormSubmit}
    >
      <FormGroup errorMessages={form.fields.signUpOrSignIn.errorMessages}>
        <RadioList conditional={true}>
          <RadioListItem
            id="signIn"
            name={fieldName}
            label="Sign in using my Beacon Registry Account"
            hintText="You’ll have an account if you’ve registered a beacon before. Your log in details will be an email address and password"
            value="signIn"
            defaultChecked={form.fields.signUpOrSignIn.value === "signIn"}
          />
          <RadioListItem
            id="signUp"
            name={fieldName}
            label="Create a Beacon Registry Account"
            hintText="You must create and account before you can register your first beacon"
            value="signUp"
            defaultChecked={form.fields.signUpOrSignIn.value === "signUp"}
          />
        </RadioList>
      </FormGroup>
    </BeaconsForm>
  );
};

const tenantName = process.env.AZURE_B2C_TENANT_NAME;
const userFlow = process.env.AZURE_B2C_LOGIN_FLOW;
const clientId = process.env.AZURE_B2C_CLIENT_ID;
const redirectUri = process.env.BASE_URL;

const signupUri = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize?p=${userFlow}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid&response_type=id_token&prompt=login`;

const handleFormSubmit = (context) : void => {
    switch (context.formData.signUpOrSignIn) {
    case "signUp":
        window.location.assign('https://duckduckgo.com/')
    case "signIn":
      //return PageURLs.signIn;
  }
}


export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "",
  getPageForm,
  (f) => f,
  //onSuccessfulFormCallback
);

export default SignUpOrSignIn;
