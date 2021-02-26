import { FieldValidator } from "../fieldValidator";

export class BeaconModelValidator extends FieldValidator {
  constructor() {
    super();
    this._rules = [
      {
        errorMessage: "Beacon model is a required field",
        errorIf: (value) => value.length === 0,
      },
    ];
  }
}

export class BeaconManufacturerValidator extends FieldValidator {
  constructor() {
    super();
    this._rules = [
      {
        errorMessage: "Beacon manufacturer is a required field",
        errorIf: (value) => value.length === 0,
      },
    ];
  }
}

export class BeaconHexIdValidator extends FieldValidator {
  private readonly errorMessagePrefix: string = "Beacon HEX ID or UIN must";
  constructor() {
    super();
    this._rules = [
      {
        errorMessage: `${this.errorMessagePrefix} be 15 characters long`,
        errorIf: (value) => value.length !== 15,
      },
      {
        errorMessage: `${this.errorMessagePrefix} use numbers 0 to 9 and letters A to F`,
        errorIf: (value) => value.match(/^[a-f0-9]+$/i) === null,
      },
    ];
  }
}

export const beaconFieldValidatorLookup = {
  manufacturer: new BeaconManufacturerValidator(),
  model: new BeaconModelValidator(),
  hexId: new BeaconHexIdValidator(),
};
