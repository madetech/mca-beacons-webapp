import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { handlePageRequest } from "../../../src/lib/handlePageRequest";
import PrimaryBeaconUse, {
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/primary-beacon-use";

jest.mock("../../../src/lib/handlePageRequest", () => ({
  __esModule: true,
  handlePageRequest: jest.fn().mockImplementation(() => jest.fn()),
}));

describe("PrimaryBeaconUse", () => {
  it("should have a back button which directs the user to the beacon information page", () => {
    render(<PrimaryBeaconUse formData={{}} needsValidation={false} />);

    expect(screen.getByText("Back", { exact: true })).toHaveAttribute(
      "href",
      "/register-a-beacon/beacon-information"
    );
  });

  it("should POST its form submission to itself for redirection via getServerSideProps()", () => {
    const { container } = render(
      <PrimaryBeaconUse formData={{}} needsValidation={false} />
    );
    const ownPath = "/register-a-beacon/primary-beacon-use";

    const form = container.querySelector("form");

    expect(form).toHaveAttribute("action", ownPath);
  });

  it("should redirect to about-the-vessel page on valid form submission", async () => {
    const context = {};
    await getServerSideProps(context as GetServerSidePropsContext);

    expect(handlePageRequest).toHaveBeenCalledWith(
      "/register-a-beacon/about-the-vessel",
      expect.anything(),
      expect.anything()
    );
  });
});
