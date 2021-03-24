import { CacheEntry } from "../formCache";
import { initBeacon, initBeaconUse } from "./registrationUtils";
import { IRegistration } from "./types";

export class Registration {
  public registration: IRegistration;
  private _keyMask: string[] = ["uses"];

  constructor() {
    this.registration = initBeacon();
  }

  public update(formData: CacheEntry): void {
    formData = formData || {};
    this._updateBeacon(formData);
    this._updateUse(formData);
  }

  private _updateBeacon(formData: CacheEntry): void {
    Object.keys(formData)
      .filter((key: string) => !this._keyMask.includes(key))
      .forEach((key: string) => {
        if (key in this.registration) {
          const value = formData[key];
          this.registration[key] = value;
        }
      });
  }

  private _updateUse(formData: CacheEntry): void {
    let useIndex = formData.useIndex;

    if (useIndex >= 0) {
      useIndex = Math.max(0, this.registration.uses.length);
      let use = this.registration.uses[useIndex];

      if (!use) {
        use = initBeaconUse(formData.environment);
        console.log("use", use);
        this.registration.uses.splice(useIndex, 1, use);
      }

      this._updateKeysFor(formData, use);
    }
  }

  private _updateKeysFor(
    formData: CacheEntry,
    toUpdate: Record<string, string>
  ): void {
    Object.keys(formData).forEach((key: string) => {
      if (key in toUpdate) {
        const value = formData[key];
        toUpdate[key] = value;
      }
    });
  }
}
