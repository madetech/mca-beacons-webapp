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

export enum MaritimePleasureVessel {
  MOTOR = "MOTOR",
  SAILING = "SAILING",
  ROWING = "ROWING",
  SMALL_UNPOWERED = "SMALL_UNPOWERED",
  OTHER = "OTHER",
}

export interface Beacon {
  manufacturer: string;
  model: string;
  hexId: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDateMonth: string;
  batteryExpiryDateYear: string;
  lastServicedDateMonth: string;
  lastServicedDateYear: string;
}

export interface Vessel {
  moreVesselDetails: string;
}

export const formSubmissionCookieId = "submissionId";
