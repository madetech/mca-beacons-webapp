import { GetServerSidePropsContext } from "next";
import { IAccountHolderDetails } from "../../src/entities/accountHolderDetails";
import { IAppContainer } from "../../src/lib/appContainer";
import { BeaconsGetServerSidePropsContext } from "../../src/lib/container";
import { getOrCreateAccountHolder } from "../../src/useCases/getOrCreateAccountHolder";

describe("The getOrCreateAccountHolder use case", () => {
  it("returns the existing account holder for a given auth id", async () => {
    const testId = "test-account-id";
    const testAccountHolder: Partial<IAccountHolderDetails> = { id: testId };
    const container: Partial<IAppContainer> = {
      getSession: jest.fn().mockResolvedValue({ user: { id: "a-session-id" } }),
      accountHolderApiGateway: {
        getAccountHolderId: jest.fn().mockResolvedValue(testId),
        createAccountHolder: jest.fn(),
        getAccountBeacons: jest.fn(),
        getAccountHolderDetails: jest.fn().mockResolvedValue(testAccountHolder),
      },
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
    };
    const context: Partial<GetServerSidePropsContext> = {};
    const functionToTest = await getOrCreateAccountHolder(
      container as IAppContainer
    );

    const result = await functionToTest(
      context as BeaconsGetServerSidePropsContext
    );

    expect(result).toEqual(testAccountHolder);
  });

  it("creates a new account holder if one is not found for a given auth id", async () => {
    const container: Partial<IAppContainer> = {
      getSession: jest.fn().mockResolvedValue({ user: { id: "a-session-id" } }),
      accountHolderApiGateway: {
        getAccountHolderId: jest.fn().mockResolvedValue(null),
        createAccountHolder: jest.fn(),
        getAccountBeacons: jest.fn(),
        getAccountHolderDetails: jest.fn(),
      },
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
    };
    const context: Partial<GetServerSidePropsContext> = {};
    const functionToTest = await getOrCreateAccountHolder(
      container as IAppContainer
    );

    await functionToTest(context as BeaconsGetServerSidePropsContext);

    expect(
      container.accountHolderApiGateway.createAccountHolder
    ).toHaveBeenCalledTimes(1);
  });
});
