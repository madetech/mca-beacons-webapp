import { render } from "@testing-library/react";
import React from "react";
import { McaLogo } from "../../src/components/McaLogo";

describe("McaLogo component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<McaLogo />);

    expect(asFragment()).toMatchSnapshot();
  });
});