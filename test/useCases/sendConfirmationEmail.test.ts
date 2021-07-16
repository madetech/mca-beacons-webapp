import { sendConfirmationEmail } from "../../src/useCases/sendConfirmationEmail";

describe("Send Gov Notify Email", () => {
  let container;
  let registration;
  let email;
  const mockSendEmail = jest.fn();

  beforeEach(() => {
    container = {
      govNotifyGateway: {
        sendEmail: mockSendEmail,
      },
      getSession: {},
    };
    registration = {
      model: "ASOS",
    };
    email = "beacons@beacons.com";
  });

  afterEach(() => {
    process.env.GOV_NOTIFY_CUSTOMER_EMAIL_TEMPLATE = undefined;
  });

  it("should not send an email if the gov notify template id is not set", async () => {
    const result = await sendConfirmationEmail(container)(registration, email);

    expect(mockSendEmail).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it("should send the email via gov notify if the template id is set", async () => {
    process.env.GOV_NOTIFY_CUSTOMER_EMAIL_TEMPLATE = "template-id";
    mockSendEmail.mockImplementation(() => true);
    const result = await sendConfirmationEmail(container)(registration, email);

    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });
});
