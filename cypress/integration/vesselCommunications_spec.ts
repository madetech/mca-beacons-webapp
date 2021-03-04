describe("As a beacon owner, I want to register my communication details so SAR can contact me in an emergency", () => {
  const pageUrl = "/register-a-beacon/vessel-communications";

  it("requires an MMSI number if the fixed VHF checkbox is selected", () => {
    givenIAmOnTheVesselCommunicationsPage();
    givenIHaveSelectedTheFixedVhfRadioOption();
    andIHaveLeftTheRelevantTextInputBlank();

    whenIClickContinue();

    thenISeeAnError();
  });

  it("requires an MMSI number if the portable VHF checkbox is selected", () => {
    givenIAmOnTheVesselCommunicationsPage();
    givenIHaveSelectedThePortableVhfRadioOption();
    andIHaveLeftTheRelevantTextInputBlank();

    whenIClickContinue();

    thenISeeAnError();
  });

  it("requires a phone number if the satellite telephone checkbox is selected", () => {
    givenIAmOnTheVesselCommunicationsPage();
    givenIHaveSelectedTheSatelliteTelephoneOption();
    andIHaveLeftTheRelevantTextInputBlank();

    whenIClickContinue();

    thenISeeAnError();
  });

  const givenIAmOnTheVesselCommunicationsPage = () => {
    cy.visit("/"); // Sets cookie
    cy.visit(pageUrl);
  };

  const givenIHaveSelectedTheFixedVhfRadioOption = () =>
    cy.get("#fixedVhfRadio").click();

  const givenIHaveSelectedThePortableVhfRadioOption = () =>
    cy.get("#portableVhfRadio").click();

  const givenIHaveSelectedTheSatelliteTelephoneOption = () =>
    cy.get("#satelliteTelephone").click();

  const whenIClickContinue = () =>
    cy.get("button").contains("Continue").click();

  const andIHaveLeftTheRelevantTextInputBlank = () => null;

  const thenISeeAnError = () => {
    expect(cy.get(".govuk-error-summary"));
    expect(cy.get(".govuk-form-group--error"));
  };
});
