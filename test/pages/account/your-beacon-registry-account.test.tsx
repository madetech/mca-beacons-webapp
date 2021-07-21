import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAppContainer, IAppContainer } from "../../../src/lib/appContainer";
import { BeaconsGetServerSidePropsContext } from "../../../src/lib/container";
import { getServerSideProps } from "../../../src/pages/account/your-beacon-registry-account";
import { accountHolderFixture } from "../../fixtures/accountHolder.fixture";
import {
  accountDetailsResponseJson,
  accountIdFromAuthIdResponseJson,
} from "../../fixtures/accountResponses.fixture";
import { beaconFixtures } from "../../fixtures/beacons.fixture";
import { manyBeaconsApiResponseFixture } from "../../fixtures/manyBeaconsApiResponse.fixture";

describe("YourBeaconRegistyAccount", () => {
  describe("GetServerSideProps", () => {
    const server = setupServer(
      rest.get("*/account-holder/auth-id/:authId", (req, res, ctx) => {
        return res(ctx.json({ ...accountIdFromAuthIdResponseJson }));
      }),
      rest.get("*/account-holder/:accountId", (req, res, ctx) => {
        return res(ctx.json({ ...accountDetailsResponseJson }));
      }),
      rest.get("*/account-holder/:accountId/beacons", (req, res, ctx) => {
        return res(ctx.json({ ...manyBeaconsApiResponseFixture }));
      })
    );

    beforeAll(() => {
      server.listen();
    });
    afterAll(() => {
      server.close();
    });

    it("should contain correct account details for a given user", async () => {
      const mocks: Partial<IAppContainer> = {
        beaconsApiAuthGateway: {
          getAccessToken: jest.fn(),
        },
        userSessionGateway: {
          getSession: jest
            .fn()
            .mockResolvedValue({ user: { id: "a-session-id" } }),
        },
      };
      const container = getAppContainer(mocks as IAppContainer);
      const context: Partial<BeaconsGetServerSidePropsContext> = {
        container: container as IAppContainer,
      };

      const result = await getServerSideProps(
        context as BeaconsGetServerSidePropsContext
      );

      expect(result["props"]["accountHolderDetails"]).toEqual(
        accountHolderFixture
      );
      expect(result["props"]["beacons"]).toEqual(beaconFixtures);
    });
  });
});
