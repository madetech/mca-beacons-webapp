export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
}

export enum BeaconIntent {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  CHANGE_OWNERSHIP = "CHANGE_OWNERSHIP",
  WITHDRAW = "WITHDRAW",
  OTHER = "OTHER",
}

export enum Activity {
  MOTOR = "MOTOR",
  SAILING = "SAILING",
  ROWING = "ROWING",
  SMALL_UNPOWERED = "SMALL_UNPOWERED",
  OTHER = "OTHER",

  FISHING_VESSEL = "FISHING_VESSEL",
  MERCHANT_VESSEL = "MERCHANT_VESSEL",
  COMMERCIAL_SAILING_VESSEL = "COMMERCIAL_SAILING_VESSEL",
  COMMERCIAL_MOTOR_PLEASURE_VESSEL = "COMMERCIAL_MOTOR_PLEASURE_VESSEL",
  FLOATING_PLATFORM = "FLOATING_PLATFORM",
  OFFSHORE_WINDFARM = "OFFSHORE_WINDFARM",
  OFFSHORE_RIG_PLATFORM = "OFFSHORE_RIG_PLATFORM",
}

export enum Environment {
  MARITIME = "MARITIME",
  AVIATION = "AVIATION",
  LAND = "LAND",
  OTHER = "OTHER",
}

export enum Purpose {
  PLEASURE = "PLEASURE",
  COMMERCIAL = "COMMERCIAL",
}

export interface Beacon {
  manufacturer: string;
  model: string;
  hexId: string;
  manufacturerSerialNumber: string;
}

export interface BeaconInformation {
  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: string;
  batteryExpiryDateMonth: string;
  batteryExpiryDateYear: string;
  lastServicedDate: string;
  lastServicedDateMonth: string;
  lastServicedDateYear: string;
}

export interface Vessel {
  maxCapacity: string;
  vesselName: string;
  beaconLocation: string;
  portLetterNumber: string;
  homeport: string;
  areaOfOperation: string;
  imoNumber: string;
  ssrNumber: string;
  officialNumber: string;
  rigPlatformLocation: string;
  moreDetails: string;
}

export interface VesselCommunications {
  callSign: string;
  vhfRadio: Communication;
  fixedVhfRadio: string;
  fixedVhfRadioInput: string;
  portableVhfRadio: Communication;
  portableVhfRadioInput: string;
  satelliteTelephone: Communication;
  satelliteTelephoneInput: string;
  mobileTelephone: Communication;
  mobileTelephoneInput1: string;
  mobileTelephoneInput2: string;
  otherCommunication: Communication;
  otherCommunicationInput: string;
}

export enum Communication {
  VHF_RADIO = "VHF_RADIO",
  FIXED_VHF_RADIO = "FIXED_VHF_RADIO",
  PORTABLE_VHF_RADIO = "PORTABLE_VHF_RADIO",
  SATELLITE_TELEPHONE = "SATELLITE_TELEPHONE",
  MOBILE_TELEPHONE = "MOBILE_TELEPHONE",
  OTHER = "OTHER",
}

export interface Aircraft {
  aircraftMaxCapacity: string;
  aircraftManufacturer: string;
  principalAirport: string;
  secondaryAirport: string;
  registrationMark: string;
  hexAddress: string;
  cnOrMsnNumber: string;
  dongle: string;
  beaconPosition: string;
}

export interface AircraftCommunications {
  vhfRadio: AircraftCommunication;
  vhfRadioInput: string;
  satelliteTelephone: AircraftCommunication;
  satelliteTelephoneInput: string;
  mobileTelephone: AircraftCommunication;
  mobileTelephoneInput1: string;
  mobileTelephoneInput2: string;
  otherCommunications: AircraftCommunication;
  otherCommunicationsInput: string;
}

export enum AircraftCommunication {
  VHF_RADIO = "VHF_RADIO",
  SATELLITE_TELEPHONE = "SATELLITE_TELEPHONE",
  MOBILE_TELEPHONE = "MOBILE_TELEPHONE",
  OTHER = "OTHER",
}

export interface Owner {
  beaconOwnerFullName: string;
  beaconOwnerEmail?: string;
  beaconOwnerTelephoneNumber?: string;
  beaconOwnerAlternativeTelephoneNumber?: string;
  beaconOwnerAddressLine1: string;
  beaconOwnerAddressLine2: string;
  beaconOwnerTownOrCity: string;
  beaconOwnerCounty?: string;
  beaconOwnerPostcode: string;
}

export interface EmergencyContacts {
  emergencyContact1FullName: string;
  emergencyContact1TelephoneNumber: string;
  emergencyContact1AlternativeTelephoneNumber: string;
  emergencyContact2FullName: string;
  emergencyContact2TelephoneNumber: string;
  emergencyContact2AlternativeTelephoneNumber: string;
  emergencyContact3FullName: string;
  emergencyContact3TelephoneNumber: string;
  emergencyContact3AlternativeTelephoneNumber: string;
}

export interface BeaconUse {
  environment: string;
  purpose: string;
  activity: string;
  otherActivityText: string;
}

export const formSubmissionCookieId = "submissionId";
export const acceptRejectCookieId = "acceptRejectId";
