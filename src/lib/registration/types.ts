export interface IRegistration {
  manufacturer: string;
  model: string;
  hexId: string;
  reference: string;

  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: string;
  batteryExpiryDateMonth: string;
  batteryExpiryDateYear: string;
  lastServicedDate: string;
  lastServicedDateMonth: string;
  lastServicedDateYear: string;

  ownerFullName: string;
  ownerEmail: string;
  ownerTelephoneNumber: string;
  ownerAlternativeTelephoneNumber: string;
  ownerAddressLine1: string;
  ownerAddressLine2: string;
  ownerTownOrCity: string;
  ownerCounty: string;
  ownerPostcode: string;

  emergencyContact1FullName: string;
  emergencyContact1TelephoneNumber: string;
  emergencyContact1AlternativeTelephoneNumber: string;
  emergencyContact2FullName: string;
  emergencyContact2TelephoneNumber: string;
  emergencyContact2AlternativeTelephoneNumber: string;
  emergencyContact3FullName: string;
  emergencyContact3TelephoneNumber: string;
  emergencyContact3AlternativeTelephoneNumber: string;

  additionalBeaconUse: string;

  uses: BeaconUse[];
}

export interface BeaconUse {
  environment: string;
  environmentOtherInput: string;
  purpose: string;
  activity: string;
  otherActivityText: string;

  // Vessel comms
  callSign: string;
  vhfRadio: string;
  fixedVhfRadio: string;
  fixedVhfRadioInput: string;
  portableVhfRadio: string;
  portableVhfRadioInput: string;
  satelliteTelephone: string;
  satelliteTelephoneInput: string;
  mobileTelephone: string;
  mobileTelephoneInput1: string;
  mobileTelephoneInput2: string;

  maxCapacity: string;
  vesselName: string;
  vesselUse: string;
  otherVesselUseText: string;
  portLetterNumber: string;
  homeport: string;
  areaOfOperation: string;
  beaconLocation: string;
  imoNumber: string;
  ssrNumber: string;
  officialNumber: string;
  rigPlatformLocation: string;

  // Aircraft info
  aircraftManufacturer: string;
  principalAirport: string;
  secondaryAirport: string;
  registrationMark: string;
  hexAddress: string;
  cnOrMsnNumber: string;
  dongle: string;
  beaconPosition: string;

  // Generic more details on use of beacon
  moreDetails: string;
}

export class SerializedRegistration {
  beacons: Beacon[];
}

export class Beacon {
  manufacturer: string;
  model: string;
  hexId: string;
  reference: string;

  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: string;
  batteryExpiryDateMonth: string;
  batteryExpiryDateYear: string;
  lastServicedDate: string;
  lastServicedDateMonth: string;
  lastServicedDateYear: string;

  uses: BeaconUseNew[];

  owner: Contact;
  emergencyContacts: Contact[];
}

export class BeaconUseNew {
  environment: string;
  environmentOtherInput: string;
  purpose: string;
  activity: string;
  otherActivityText: string;

  vessel: Vessel;
  aircraft: Aircraft;
  landOther: LandOther;
}

export class Contact {
  fullName: string;
  telephoneNumber: string;
  alternativeTelephoneNumber: string;
  address: Address;
}

export class Address {
  addressLine1: string;
  addressLine2: string;
  townOrCity: string;
  county: string;
  postcode: string;
}

export class Vessel {
  maxCapacity: string;
  vesselName: string;
  vesselUse: string;
  otherVesselUseText: string;
  portLetterNumber: string;
  homeport: string;
  areaOfOperation: string;
  beaconLocation: string;
  imoNumber: string;
  ssrNumber: string;
  officialNumber: string;
  rigPlatformLocation: string;

  callSign: string;
  vhfRadio: string;
  fixedVhfRadio: string;
  fixedVhfRadioInput: string;
  portableVhfRadio: string;
  portableVhfRadioInput: string;
  satelliteTelephone: string;
  satelliteTelephoneInput: string;
  mobileTelephone: string;
  mobileTelephoneInput1: string;
  mobileTelephoneInput2: string;

  moreDetails: string;
}

export class Aircraft {
  maxCapacity: string;
  aircraftManufacturer: string;
  principalAirport: string;
  secondaryAirport: string;
  registrationMark: string;
  hexAddress: string;
  cnOrMsnNumber: string;
  dongle: string;
  beaconPosition: string;

  callSign: string;
  vhfRadio: string;
  satelliteTelephone: string;
  satelliteTelephoneInput: string;
  mobileTelephone: string;
  mobileTelephoneInput1: string;
  mobileTelephoneInput2: string;

  moreDetails: string;
}

export class LandOther {
  portableVhfRadio: string;
  portableVhfRadioInput: string;
  satelliteTelephone: string;
  satelliteTelephoneInput: string;
  mobileTelephone: string;
  mobileTelephoneInput1: string;
  mobileTelephoneInput2: string;

  moreDetails: string;
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

export enum Activity {
  // Maritime
  SAILING = "SAILING",
  MOTOR = "MOTOR",
  ROWING = "ROWING",
  SMALL_UNPOWERED = "SMALL_UNPOWERED",
  FISHING_VESSEL = "FISHING_VESSEL",
  MERCHANT_VESSEL = "MERCHANT_VESSEL",
  COMMERCIAL_SAILING_VESSEL = "COMMERCIAL_SAILING_VESSEL",
  COMMERCIAL_MOTOR_PLEASURE_VESSEL = "COMMERCIAL_MOTOR_PLEASURE_VESSEL",
  FLOATING_PLATFORM = "FLOATING_PLATFORM",
  OFFSHORE_WINDFARM = "OFFSHORE_WINDFARM",
  OFFSHORE_RIG_PLATFORM = "OFFSHORE_RIG_PLATFORM",

  // Aviation
  JET_AIRCRAFT = "JET_AIRCRAFT",
  LIGHT_AIRCRAFT = "LIGHT_AIRCRAFT",
  GLIDER = "GLIDER",
  HOT_AIR_BALLON = "HOT_AIR_BALLON",
  ROTOR_CRAFT = "ROTOR_CRAFT",
  PASSENGER_PLANE = "PASSENGER_PLANE",
  CARGO_AIRPLANE = "CARGO_AIRPLANE",

  // Land/other activities
  DRIVING = "DRIVING",
  CYCLING = "CYCLING",
  CLIMBING_MOUNTAINEERING = "CLIMBING_MOUNTAINEERING",
  SKIING = "SKIING",
  WALKING_HIKING = "WALKING_HIKING",
  WORKING_REMOTELY = "WORKING_REMOTELY",
  WINDFARM = "WINDFARM",

  OTHER = "OTHER",
}

export enum Communication {
  VHF_RADIO = "VHF_RADIO",
  FIXED_VHF_RADIO = "FIXED_VHF_RADIO",
  PORTABLE_VHF_RADIO = "PORTABLE_VHF_RADIO",
  SATELLITE_TELEPHONE = "SATELLITE_TELEPHONE",
  MOBILE_TELEPHONE = "MOBILE_TELEPHONE",
  OTHER = "OTHER",
}
