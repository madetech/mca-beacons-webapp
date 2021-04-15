import { render } from "@testing-library/react";
import React from "react";
import ApplicationCompletePage, {
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/application-complete";

jest.mock("../../../src/lib/middleware", () => ({
  _esModule: true,
  withCookieRedirect: jest.fn().mockImplementation((callback) => {
    return async (context) => {
      return callback(context);
    };
  }),
  decorateGetServerSidePropsContext: jest.fn().mockImplementation(() => ({
    registration: {
      registration: {
        referenceNumber: "",
      },
    },
  })),
}));
jest.mock("../../../src/gateways/beaconsApiGateway");
jest.mock("../../../src/gateways/govNotifyApiGateway");

const mockSendGovNotifyExecute = jest.fn();
jest.mock("../../../src/useCases/sendGovNotifyEmail", () => ({
  SendGovNotifyEmail: jest.fn().mockImplementation(() => ({
    execute: mockSendGovNotifyExecute,
  })),
}));
const mockCreateRegistrationExecute = jest.fn();
jest.mock("../../../src/useCases/createRegistration", () => ({
  CreateRegistration: jest.fn().mockImplementation(() => ({
    execute: mockCreateRegistrationExecute,
  })),
}));

describe("ApplicationCompletePage", () => {
  it("should render correctly", () => {
    render(<ApplicationCompletePage showCookieBanner={false} />);
  });

  describe("getServerSideProps function", () => {
    let context;

    beforeEach(() => {
      context = {};
    });

    it("should not have a refernece number if creating the registration is unsuccessful", async () => {
      mockCreateRegistrationExecute.mockImplementation(() =>
        Promise.resolve(false)
      );
      const result = await getServerSideProps(context);

      expect(result.props.reference).toBeUndefined();
      expect(mockSendGovNotifyExecute).not.toHaveBeenCalled();
    });

    it("should create the registration, send the email via gov notify and return the reference number", async () => {
      mockCreateRegistrationExecute.mockImplementation(() =>
        Promise.resolve(true)
      );
      mockSendGovNotifyExecute.mockImplementation(() => Promise.resolve(true));
      const result = await getServerSideProps(context);

      expect(result.props.reference.length).toBe(7);
      expect(mockCreateRegistrationExecute).toHaveBeenCalled();
      expect(mockSendGovNotifyExecute).toHaveBeenCalled();
    });

    it("should create the registration, and return the reference number if the email cannot be sent", async () => {
      mockCreateRegistrationExecute.mockImplementation(() =>
        Promise.resolve(true)
      );
      mockSendGovNotifyExecute.mockImplementation(() => Promise.resolve(false));
      const result = await getServerSideProps(context);

      expect(result.props.reference.length).toBe(7);
      expect(mockCreateRegistrationExecute).toHaveBeenCalled();
      expect(mockSendGovNotifyExecute).toHaveBeenCalled();
    });
  });
});
