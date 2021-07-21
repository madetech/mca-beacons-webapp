import { IAppContainer } from "../../src/lib/appContainer";
import { submitRegistration } from "../../src/useCases/submitRegistration";

describe("submitRegistration()", () => {
  const mockRegistration = {
    serialiseToAPI: jest.fn().mockReturnValue({ model: "ASOS" }),
    setReferenceNumber: jest.fn(),
    setAccountHolderId: jest.fn(),
    getRegistration: jest.fn().mockReturnValue({ model: "ASOS" }),
  };

  it("requests an access token from the beaconsApiAuthGateway", async () => {
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: jest.fn(),
      },
    };

    await submitRegistration(container)("submissionId", "accountHolderId");

    expect(
      container.beaconsApiAuthGateway.getAccessToken
    ).toHaveBeenCalledTimes(1);
  });

  it("attempts to send the registration to the beacons API", async () => {
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: jest.fn(),
      },
    };

    await submitRegistration(container)("submissionId", "accountHolderId");

    expect(container.beaconsApiGateway.sendRegistration).toHaveBeenCalledTimes(
      1
    );
  });

  it("sets the registration number before sending to the beacons API", async () => {
    // TODO: Move setting the registration number to the API and delete this test
    const mockSendRegistrationToApi = jest.fn();
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: mockSendRegistrationToApi,
      },
    };

    await submitRegistration(container)("submissionId", "accountHolderId");

    expect(mockRegistration.setReferenceNumber).toHaveBeenCalled();
  });

  it("sets the account holder id before sending to the beacons API", async () => {
    const mockSendRegistrationToApi = jest.fn();
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: mockSendRegistrationToApi,
      },
    };

    await submitRegistration(container)("submissionId", "accountHolderId");

    expect(mockRegistration.setReferenceNumber).toHaveBeenCalled();
  });

  it("account holder id accepts null value without throwing", async () => {
    const mockSendRegistrationToApi = jest.fn();
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: mockSendRegistrationToApi,
      },
    };

    await submitRegistration(container)("submissionId", null);

    expect(mockRegistration.setReferenceNumber).toHaveBeenCalled();
  });

  it("attempts to send a confirmation email if registration was successful", async () => {
    const mockSendConfirmationEmail = jest.fn();
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: mockSendConfirmationEmail,
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(true),
      },
    };

    await submitRegistration(container)("submissionId", "accountHolderId");

    expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
  });

  it("returns the result when the registration was a success and the email was sent", async () => {
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn().mockResolvedValue(true),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(true),
      },
    };

    const result = await submitRegistration(container)(
      "submissionId",
      "accountHolderId"
    );

    expect(result).toStrictEqual({
      beaconRegistered: true,
      confirmationEmailSent: true,
      referenceNumber: expect.any(String),
    });
  });

  it("returns the result when the registration was a success but the email was not sent", async () => {
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn().mockResolvedValue(false),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(true),
      },
    };

    const result = await submitRegistration(container)(
      "submissionId",
      "accountHolderId"
    );

    expect(result).toStrictEqual({
      beaconRegistered: true,
      confirmationEmailSent: false,
      referenceNumber: expect.any(String),
    });
  });

  it("returns a registration number when the registration was a success", async () => {
    mockRegistration.getRegistration = jest
      .fn()
      .mockReturnValue({ registrationNumber: "success" });
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn().mockResolvedValue(false),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(true),
      },
    };

    const result = await submitRegistration(container)(
      "submissionId",
      "accountHolderId"
    );

    expect(result.referenceNumber.length).toBeDefined();
  });

  it("returns an empty registration number when the registration failed", async () => {
    const container: Partial<IAppContainer> = {
      getCachedRegistration: jest.fn().mockResolvedValue(mockRegistration),
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn().mockResolvedValue(false),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(false),
      },
    };

    const result = await submitRegistration(container)(
      "submissionId",
      "accountHolderId"
    );

    expect(result.referenceNumber).toEqual("");
  });
});
