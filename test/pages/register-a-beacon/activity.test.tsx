import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { FormJSON } from "../../../src/lib/form/formManager";
import { handlePageRequest } from "../../../src/lib/handlePageRequest";
import Activity, {
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/activity";

jest.mock("../../../src/lib/handlePageRequest", () => ({
  __esModule: true,
  handlePageRequest: jest.fn().mockImplementation(() => jest.fn()),
}));

describe("Activity", () => {
  const activityForm: FormJSON = {
    hasErrors: false,
    errorSummary: [],
    fields: {
      maritimePleasureVesselUse: {
        value: "",
        errorMessages: [],
      },
      otherPleasureVesselText: {
        value: "",
        errorMessages: [],
      },
    },
  };

  it("should have a back button which directs the user to the beacon information page", () => {
    render(<Activity form={activityForm} />);

    expect(screen.getByText("Back", { exact: true })).toHaveAttribute(
      "href",
      "/register-a-beacon/beacon-information"
    );
  });

  it("should redirect to about-the-vessel page on valid form submission", async () => {
    const context = {};
    await getServerSideProps(context as GetServerSidePropsContext);

    expect(handlePageRequest).toHaveBeenCalledWith(
      "/register-a-beacon/about-the-vessel",
      expect.anything()
    );
  });
});