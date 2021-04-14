import { BeaconType, BeaconUse, IRegistration } from "./types";

/**
 * Convenience function for returning an `empty` instance of a beacon registration.
 *
 * @returns {IRegistration}   JSON representation of a beacon registration
 */
export const initBeacon = (): IRegistration => {
  return {
    manufacturer: "",
    model: "",
    hexId: "",
    beaconType: BeaconType.PLB,

    referenceNumber: "",

    manufacturerSerialNumber: "",
    chkCode: "",
    batteryExpiryDate: "",
    batteryExpiryDateMonth: "",
    batteryExpiryDateYear: "",
    lastServicedDate: "",
    lastServicedDateMonth: "",
    lastServicedDateYear: "",

    ownerFullName: "",
    ownerEmail: "",
    ownerTelephoneNumber: "",
    ownerAlternativeTelephoneNumber: "",
    ownerAddressLine1: "",
    ownerAddressLine2: "",
    ownerTownOrCity: "",
    ownerCounty: "",
    ownerPostcode: "",

    emergencyContact1FullName: "",
    emergencyContact1TelephoneNumber: "",
    emergencyContact1AlternativeTelephoneNumber: "",
    emergencyContact2FullName: "",
    emergencyContact2TelephoneNumber: "",
    emergencyContact2AlternativeTelephoneNumber: "",
    emergencyContact3FullName: "",
    emergencyContact3TelephoneNumber: "",
    emergencyContact3AlternativeTelephoneNumber: "",

    additionalBeaconUse: "false",
    uses: [initBeaconUse(true)],
  };
};

/**
 * Convenience function for returning an `empty` instance of a beacon use.
 *
 * @param mainUse {boolean}     Whether the use is the main use for a beacon; defaults to false
 * @returns       {BeaconUse}   JSON representation of a beacon use
 */
export const initBeaconUse = (mainUse = false): BeaconUse => {
  return {
    environment: null,
    otherEnvironment: "",
    purpose: null,
    activity: null,
    otherActivity: "",
    otherCommunication: "",
    otherCommunicationValue: "",

    // Communications
    callSign: "",
    vhfRadio: "",
    fixedVhfRadio: "",
    fixedVhfRadioValue: "",
    portableVhfRadio: "",
    portableVhfRadioValue: "",
    satelliteTelephone: "",
    satelliteTelephoneValue: "",
    mobileTelephone: "",
    mobileTelephone1: "",
    mobileTelephone2: "",

    // Vessel info
    maxCapacity: "",
    vesselName: "",
    portLetterNumber: "",
    homeport: "",
    areaOfOperation: "",
    beaconLocation: "",
    imoNumber: "",
    ssrNumber: "",
    officialNumber: "",
    rigPlatformLocation: "",

    // Aircraft info
    aircraftManufacturer: "",
    principalAirport: "",
    secondaryAirport: "",
    registrationMark: "",
    hexAddress: "",
    cnOrMsnNumber: "",
    dongle: "",
    beaconPosition: "",

    // Land environment
    driving: "",
    cycling: "",
    climbingMountaineering: "",
    skiing: "",
    walkingHiking: "",
    workingRemotely: "",
    workingRemotelyLocation: "",
    workingRemotelyPeopleCount: "",
    windfarm: "",
    windfarmLocation: "",
    windfarmPeopleCount: "",
    otherActivityDescription: "",
    otherActivityLocation: "",
    otherActivityPeopleCount: "",

    moreDetails: "",
    mainUse,
  };
};
