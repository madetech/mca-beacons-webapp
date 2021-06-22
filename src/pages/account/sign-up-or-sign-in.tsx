import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BeaconsForm } from "../../components/BeaconsForm";
import { FormGroup } from "../../components/Form";
import { RadioList, RadioListItem } from "../../components/RadioList";
import { GovUKBody } from "../../components/Typography";
import { BasicAuthGateway } from "../../gateways/basicAuthGateway";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { FormPageProps } from "../../lib/handlePageRequest";
import {
  BeaconsContext,
  decorateGetServerSidePropsContext,
} from "../../lib/middleware";
import { redirectUserTo } from "../../lib/redirectUserTo";
import { Registration } from "../../lib/registration/registration";
import { PageURLs } from "../../lib/urls";
import { verifyFormSubmissionCookieIsSet } from "../../lib/verifyFormSubmissionCookieIsSet";
import { AuthenticateUser } from "../../useCases/authenticateUser";

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
    >
      <FormGroup errorMessages={form.fields.signUpOrSignIn.errorMessages}>
        <RadioList>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authGateway = new BasicAuthGateway();
  const authUseCase = new AuthenticateUser(authGateway);
  await authUseCase.execute(context);

  if (!verifyFormSubmissionCookieIsSet(context))
    return redirectUserTo(PageURLs.start);

  const beaconsContext: BeaconsContext =
    await decorateGetServerSidePropsContext(context);

  const registration: Registration = beaconsContext.registration;
  const flattenedRegistration = registration.getFlattenedRegistration({
    useIndex: beaconsContext.useIndex,
  });

  const formManager = getPageForm(flattenedRegistration);

  if (beaconsContext.req.method === "POST") {
    const destination = (context) => {
      switch (context.formData.signUpOrSignIn) {
        case "signUp":
          return PageURLs.signUp;
        case "signIn":
          return PageURLs.signIn;
      }
    };

    console.log("DESTINATION", destination(beaconsContext));
    return {
      redirect: {
        statusCode: 303,
        destination: destination(beaconsContext),
      },
    };
  }
  return {
    props: {
      form: formManager.serialise(),
      showCookieBanner: beaconsContext.showCookieBanner,
      registration: registration.getRegistration(),
      flattenedRegistration,
      useIndex: beaconsContext.useIndex,
    },
  };
};

export default SignUpOrSignIn;
