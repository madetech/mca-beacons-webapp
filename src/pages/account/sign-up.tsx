import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { FunctionComponent, useEffect } from "react";

interface SignUpPageProps {
  signUpUrl: string;
}

const SignUpPage: FunctionComponent<SignUpPageProps> = ({
  signUpUrl,
}: SignUpPageProps): JSX.Element => {
  useEffect(() => {
    window.location.assign(signUpUrl);
  });
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const tenantName = process.env.AZURE_B2C_TENANT_NAME;
  const userFlow = process.env.AZURE_B2C_SIGNUP_FLOW;
  const clientId = process.env.AZURE_B2C_CLIENT_ID;
  const redirectUri = process.env.NEXTAUTH_URL + "/account/sign-in";

  const signUpUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize?p=${userFlow}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid&response_type=id_token&prompt=login`;

  return { props: { signUpUrl: signUpUrl } };
};

export default SignUpPage;