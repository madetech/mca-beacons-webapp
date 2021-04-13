import { PageURLs } from "../../../src/lib/urls";
import { testBeaconAndOwnerData } from "./happy-path-test-data.spec";
import {
  givenIAmAt,
  givenIHaveClickedContinue,
  givenIHaveTyped,
} from "./selectors-and-assertions.spec";

export const givenIHaveEnteredMyPersonalDetails = (): void => {
  givenIAmAt(PageURLs.aboutBeaconOwner);
  givenIHaveTyped(
    testBeaconAndOwnerData.ownerDetails.fullName,
    "#ownerFullName"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.ownerDetails.telephoneNumber,
    "#ownerTelephoneNumber"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.ownerDetails.alternativeTelephoneNumber,
    "#ownerAlternativeTelephoneNumber"
  );
  givenIHaveTyped(testBeaconAndOwnerData.ownerDetails.email, "#ownerEmail");
  givenIHaveClickedContinue();
};
export const givenIHaveEnteredMyAddressDetails = (): void => {
  givenIAmAt(PageURLs.beaconOwnerAddress);
  givenIHaveTyped(
    testBeaconAndOwnerData.ownerAddress.addressLine1,
    "#ownerAddressLine1"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.ownerAddress.addressLine2,
    "#ownerAddressLine2"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.ownerAddress.townOrCity,
    "#ownerTownOrCity"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.ownerAddress.postcode,
    "#ownerPostcode"
  );
  givenIHaveClickedContinue();
};
export const givenIHaveEnteredMyEmergencyContactDetails = (): void => {
  givenIAmAt(PageURLs.emergencyContact);
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts.emergencyContact1FullName,
    "#emergencyContact1FullName"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts.emergencyContact1TelephoneNumber,
    "#emergencyContact1TelephoneNumber"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts
      .emergencyContact1AlternativeTelephoneNumber,
    "#emergencyContact1AlternativeTelephoneNumber"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts.emergencyContact2FullName,
    "#emergencyContact2FullName"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts.emergencyContact2TelephoneNumber,
    "#emergencyContact2TelephoneNumber"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts
      .emergencyContact2AlternativeTelephoneNumber,
    "#emergencyContact2AlternativeTelephoneNumber"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts.emergencyContact3FullName,
    "#emergencyContact3FullName"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts.emergencyContact3TelephoneNumber,
    "#emergencyContact3TelephoneNumber"
  );
  givenIHaveTyped(
    testBeaconAndOwnerData.emergencyContacts
      .emergencyContact3AlternativeTelephoneNumber,
    "#emergencyContact3AlternativeTelephoneNumber"
  );
  givenIHaveClickedContinue();
};
export const iCanEditMyPersonalDetails = (): void =>
  Object.values(testBeaconAndOwnerData.ownerDetails).forEach((value) =>
    cy.get(`input[value="${value}"]`)
  );
export const iCanEditMyAddressDetails = (): void =>
  Object.values(testBeaconAndOwnerData.ownerAddress).forEach((value) =>
    cy.get(`input[value="${value}"]`)
  );
export const iCanEditMyEmergencyContactDetails = (): void =>
  Object.values(testBeaconAndOwnerData.emergencyContacts).forEach((value) =>
    cy.get(`input[value="${value}"]`)
  );
export const iCanSeeMyPersonalDetails = (): void =>
  Object.values(testBeaconAndOwnerData.ownerDetails).forEach((value) =>
    cy.get("main").contains(value)
  );
export const iCanSeeMyAddressDetails = (): void =>
  Object.values(testBeaconAndOwnerData.ownerAddress).forEach((value) =>
    cy.get("main").contains(value)
  );
export const iCanSeeMyEmergencyContactDetails = (): void =>
  Object.values(testBeaconAndOwnerData.emergencyContacts).forEach((value) =>
    cy.get("main").contains(value)
  );