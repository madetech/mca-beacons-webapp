import { Environment, Purpose } from "../../../src/lib/registration/types";
import { PageURLs } from "../../../src/lib/urls";
import {
  testMaritimeCommercialUse,
  testMaritimePleasureUse,
  testMaritimeUse,
} from "../happy-path-test-data.spec";
import {
  iCanEditMyAdditionalBeaconInformation,
  iCanEditMyAddressDetails,
  iCanEditMyBeaconDetails,
  iCanEditMyEmergencyContactDetails,
  iCanEditMyEnvironment,
  iCanEditMyPersonalDetails,
} from "../i-can-edit-previously-entered-information.spec";
import {
  andIHaveNoFurtherUses,
  givenIHaveEnteredMyAddressDetails,
  givenIHaveEnteredMyBeaconDetails,
  givenIHaveEnteredMyEmergencyContactDetails,
  givenIHaveEnteredMyPersonalDetails,
} from "../i-can-enter-information";
import {
  iCanSeeMyAdditionalBeaconInformation,
  iCanSeeMyAddressDetails,
  iCanSeeMyBeaconDetails,
  iCanSeeMyEmergencyContactDetails,
  iCanSeeMyPersonalDetails,
} from "../i-can-see-previously-entered-information.spec";
import {
  andIClickContinue,
  givenIAmAt,
  givenIHaveSelected,
  givenIHaveTyped,
  iAmAt,
  iCanSeeAHeadingThatContains,
  thenTheUrlShouldContain,
  whenIClickBack,
} from "../selectors-and-assertions.spec";

describe("As a maritime beacon owner,", () => {
  it("I can register my beacon for pleasure purposes", () => {
    givenIHaveEnteredMyBeaconDetails();
    givenIHaveEnteredMyMaritimeUse(Purpose.PLEASURE);
    andIHaveNoFurtherUses();

    givenIHaveEnteredMyPersonalDetails();
    givenIHaveEnteredMyAddressDetails();
    givenIHaveEnteredMyEmergencyContactDetails();

    thenTheUrlShouldContain(PageURLs.checkYourAnswers);
    iCanSeeMyBeaconDetails();
    iCanSeeMyAdditionalBeaconInformation();
    iCanSeeMyMaritimeUse(Purpose.PLEASURE);
    iCanSeeMyPersonalDetails();
    iCanSeeMyAddressDetails();
    iCanSeeMyEmergencyContactDetails();
    iCanGoBackAndEditMyMaritimeUse(Purpose.PLEASURE);
  });

  it("I can register my beacon for commercial purposes", () => {
    givenIHaveEnteredMyBeaconDetails();
    givenIHaveEnteredMyMaritimeUse(Purpose.COMMERCIAL);
    andIHaveNoFurtherUses();

    givenIHaveEnteredMyPersonalDetails();
    givenIHaveEnteredMyAddressDetails();
    givenIHaveEnteredMyEmergencyContactDetails();

    thenTheUrlShouldContain(PageURLs.checkYourAnswers);
    iCanSeeMyBeaconDetails();
    iCanSeeMyAdditionalBeaconInformation();
    iCanSeeMyMaritimeUse(Purpose.COMMERCIAL);
    iCanSeeMyPersonalDetails();
    iCanSeeMyAddressDetails();
    iCanSeeMyEmergencyContactDetails();
    iCanGoBackAndEditMyMaritimeUse(Purpose.COMMERCIAL);
  });
});

const givenIHaveEnteredMyMaritimeUse = (purpose: Purpose): void => {
  thenTheUrlShouldContain(PageURLs.environment);
  givenIHaveSelected("#maritime");
  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.purpose);
  iCanSeeAHeadingThatContains("maritime");
  givenIHaveSelected(`#${purpose.toLowerCase()}`);
  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.activity);
  iCanSeeAHeadingThatContains("maritime");
  iCanSeeAHeadingThatContains(purpose.toLowerCase());
  switch (purpose) {
    case Purpose.COMMERCIAL:
      givenIHaveSelected("#motor-vessel");
      break;
    case Purpose.PLEASURE:
      givenIHaveSelected("#motor-vessel");
      break;
  }
  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.aboutTheVessel);
  iCanSeeAHeadingThatContains("vessel");
  givenIHaveEnteredInformationAboutMyVessel();
  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.vesselCommunications);
  givenIHaveEnteredMyVesselCommunicationDetails();
  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.moreDetails);
  givenIHaveEnteredMoreDetailsAboutMyVessel();
  andIClickContinue();
};

export const iCanSeeMyMaritimeUse = (purpose: Purpose): void => {
  switch (purpose) {
    case Purpose.COMMERCIAL:
      Object.values(testMaritimeCommercialUse.type).forEach((value) => {
        cy.get("main").contains(value);
      });
      break;
    case Purpose.PLEASURE:
      Object.values(testMaritimePleasureUse.type).forEach((value) => {
        cy.get("main").contains(value);
      });
      break;
  }
  Object.values(testMaritimeUse.vessel).forEach((value) => {
    cy.get("main").contains(value);
  });
  cy.get("main").contains(testMaritimeUse.communications.fixedMMSI);
  cy.get("main").contains(testMaritimeUse.communications.portableMMSI);
  cy.get("main").contains(testMaritimeUse.communications.satelliteTelephone);
  cy.get("main").contains(testMaritimeUse.communications.mobileTelephone1);
  cy.get("main").contains(testMaritimeUse.communications.mobileTelephone2);
  cy.get("main").contains(testMaritimeUse.communications.otherCommunication);
  cy.get("main").contains(testMaritimeUse.moreDetails);
};

export const iCanGoBackAndEditMyMaritimeUse = (purpose: Purpose): void => {
  givenIAmAt(PageURLs.checkYourAnswers);
  whenIClickBack();
  iCanEditMyEmergencyContactDetails();
  whenIClickBack();
  iCanEditMyAddressDetails();
  whenIClickBack();
  iCanEditMyPersonalDetails();
  whenIClickBack();
  iCanEditMyAdditionalMaritimeUseInformation();
  whenIClickBack();
  iCanEditMyVesselCommunications();
  whenIClickBack();
  iCanEditMyVesselDetails();
  whenIClickBack();
  iCanEditMyActivity();
  whenIClickBack();
  iCanEditMyPurpose(purpose);
  whenIClickBack();
  iCanEditMyEnvironment(Environment.MARITIME);
  whenIClickBack();
  iCanEditMyAdditionalBeaconInformation();
  whenIClickBack();
  iCanEditMyBeaconDetails();
  whenIClickBack();
  iAmAt(PageURLs.start);
};

export const iCanEditMyVesselCommunications = (): void => {
  const comms = testMaritimeUse.communications;
  comms.checkedFields.forEach((field) =>
    cy.get(`#${field}`).should("be.checked")
  );
  cy.get("#fixedVhfRadioInput").should("have.value", comms.fixedMMSI);
  cy.get("#portableVhfRadioInput").should("have.value", comms.portableMMSI);
  cy.get("#satelliteTelephoneInput").should(
    "have.value",
    comms.satelliteTelephone
  );
  cy.get("#mobileTelephoneInput1").should("have.value", comms.mobileTelephone1);
  cy.get("#mobileTelephoneInput2").should("have.value", comms.mobileTelephone2);
  cy.get("#otherCommunicationInput").contains(comms.otherCommunication);
};

export const iCanEditMyVesselDetails = (): void => {
  const vessel = testMaritimeUse.vessel;
  cy.get("#maxCapacity").should("have.value", vessel.maxCapacity);
  cy.get("#vesselName").should("have.value", vessel.name);
  cy.get("#beaconLocation").should("have.value", vessel.beaconPosition);
  cy.get("#portLetterNumber").should("have.value", vessel.pln);
  cy.get("#homeport").should("have.value", vessel.homePort);
  cy.get("#areaOfOperation").should("have.value", vessel.typicalAO);
  cy.get("#imoNumber").should("have.value", vessel.imoNumber);
  cy.get("#ssrNumber").should("have.value", vessel.ssrNumber);
  cy.get("#officialNumber").should("have.value", vessel.officialNumber);
  cy.get("#rigPlatformLocation").should(
    "have.value",
    vessel.rigPlatformLocation
  );
};

export const iCanEditMyActivity = (): void => {
  cy.get(`input[value="${testMaritimeCommercialUse.type.activity}"]`).should(
    "be.checked"
  );
};

const iCanEditMyPurpose = (purpose: Purpose): void => {
  switch (purpose) {
    case Purpose.COMMERCIAL:
      cy.get(`input[value="${testMaritimeCommercialUse.type.purpose}"]`).should(
        "be.checked"
      );
      break;
    case Purpose.PLEASURE:
      cy.get(`input[value="${testMaritimePleasureUse.type.purpose}"]`).should(
        "be.checked"
      );
      break;
  }
};

const givenIHaveEnteredInformationAboutMyVessel = (): void => {
  const vessel = testMaritimeUse.vessel;
  givenIAmAt(PageURLs.aboutTheVessel);
  givenIHaveTyped(vessel.maxCapacity, "#maxCapacity");
  givenIHaveTyped(vessel.name, "#vesselName");
  givenIHaveTyped(vessel.beaconPosition, "#beaconLocation");
  givenIHaveTyped(vessel.pln, "#portLetterNumber");
  givenIHaveTyped(vessel.homePort, "#homeport");
  givenIHaveTyped(vessel.typicalAO, "#areaOfOperation");
  givenIHaveTyped(vessel.imoNumber, "#imoNumber");
  givenIHaveTyped(vessel.ssrNumber, "#ssrNumber");
  givenIHaveTyped(vessel.officialNumber, "#officialNumber");
  givenIHaveTyped(vessel.rigPlatformLocation, "#rigPlatformLocation");
};

const givenIHaveEnteredMyVesselCommunicationDetails = (): void => {
  const comms = testMaritimeUse.communications;
  givenIAmAt(PageURLs.vesselCommunications);
  givenIHaveSelected("#vhfRadio");
  givenIHaveSelected("#fixedVhfRadio");
  givenIHaveTyped(comms.fixedMMSI, "#fixedVhfRadioInput");
  givenIHaveSelected("#portableVhfRadio");
  givenIHaveTyped(comms.portableMMSI, "#portableVhfRadioInput");
  givenIHaveSelected("#satelliteTelephone");
  givenIHaveTyped(comms.satelliteTelephone, "#satelliteTelephoneInput");
  givenIHaveSelected("#mobileTelephone");
  givenIHaveTyped(comms.mobileTelephone1, "#mobileTelephoneInput1");
  givenIHaveTyped(comms.mobileTelephone2, "#mobileTelephoneInput2");
  givenIHaveSelected("#otherCommunication");
  givenIHaveTyped(comms.otherCommunication, "#otherCommunicationInput");
};

const givenIHaveEnteredMoreDetailsAboutMyVessel = (): void => {
  givenIAmAt(PageURLs.moreDetails);
  givenIHaveTyped(testMaritimeUse.moreDetails, "#moreDetails");
};

const iCanEditMyAdditionalMaritimeUseInformation = (): void => {
  cy.get("textarea").contains(testMaritimeUse.moreDetails);
};
