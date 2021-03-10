/**
 * Type definition for a function that validates a form input and returns true if the value violates the rule.
 *
 * @param formNode {string}    The form value to validate
 * @returns        {boolean}   True if the value violates the rule
 */
import { HexIdParser } from "../hexIdParser";

export type ValidatorFn = (value: string) => boolean;

export interface ValidationRule {
  errorMessage: string;
  applies: ValidatorFn;
}

function isEmptyInputValue(value: string): boolean {
  return value == null || value.length === 0;
}

/**
 * Provides a set of validators that can be applied to a value.
 */
export class Validators {
  /**
   * Validator that requires the form input value to be non-empty.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns            {ValidationRule}   A validation rule
   */
  public static required(errorMessage: string): ValidationRule {
    const applies: ValidatorFn = (value: string) => !value;

    return {
      errorMessage,
      applies,
    };
  }

  /**
   * Validator that requires the form input value to be less than or equal to the provided length.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @param max          {number}           The max number of characters allowed
   * @returns            {ValidationRule}   A validation rule
   */
  public static maxLength(errorMessage: string, max: number): ValidationRule {
    const applies: ValidatorFn = (value: string) => value.length > max;

    return { errorMessage, applies };
  }

  /**
   * Validator that requires the form input value to be strictly the length provided.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @param length       {string}           The length the value should be
   * @returns            {ValidationRule}   A validation rule
   */
  public static isLength(errorMessage: string, length: number): ValidationRule {
    const applies: ValidatorFn = (value: string) =>
      !!value && value.length !== length;

    return { errorMessage, applies };
  }

  /**
   * Validator that requires the input value to be a valid date.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns            {ValidationRule}   A validation rule
   */
  public static isValidDate(errorMessage: string): ValidationRule {
    const applies: ValidatorFn = (value: string) => isNaN(Date.parse(value));

    return { errorMessage, applies };
  }

  /**
   * Validator that requires the input value date to be in the past.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns            {ValidationRule}   A validation rule
   */
  public static isInThePast(errorMessage: string): ValidationRule {
    const applies: ValidatorFn = (value: string) => {
      const dateNow = Date.now();
      const dateToCompare = Date.parse(value);

      return !isNaN(dateToCompare) && dateToCompare > dateNow;
    };

    return { errorMessage, applies };
  }

  /**
   * Validator that requires the input value date to be greater than or equal to the provided year.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @param year         {number}           The year the date must be greater than or equal to
   * @returns            {ValidationRule}   A validation rule
   */
  public static minDateYear(
    errorMessage: string,
    year: number
  ): ValidationRule {
    const applies: ValidatorFn = (value: string) => {
      const dateLowerBound = new Date(year, 0, 0).getTime();
      const dateToCompare = Date.parse(value);

      return !isNaN(dateToCompare) && dateToCompare < dateLowerBound;
    };

    return { errorMessage, applies };
  }

  /**
   * Validator that requires the form input value to be a hexadecimal
   * string; proxies through to the {@link Validators.pattern()}.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns           {ValidationRule}   A validation rule
   */
  public static hexadecimalString(errorMessage: string): ValidationRule {
    const hexIdRegex = /^[a-f0-9]+$/i;
    return Validators.pattern(errorMessage, hexIdRegex);
  }

  /**
   * Validator that requires the form input value to match the pattern of a
   * UK-encoded hexId.
   *
   * @remarks
   * Cospas-Sarsat uses Maritime Identification Digits encoded into the hexId to
   * identify the country responsible for registering a given beacon.  See:
   * http://www.cospas-sarsat.int/images/stories/SystemDocs/Current/cs_g005_oct_2013.pdf
   * (section 3.2.3.2) and
   * https://www.itu.int/en/ITU-R/terrestrial/fmd/Pages/mid.aspx
   *
   * If the country code of a hexId is not one of the UK MID country codes, it
   * is not a UK-encoded beacon.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns           {ValidationRule}   A validation rule
   */
  public static ukEncodedBeacon(errorMessage: string): ValidationRule {
    const applies: ValidatorFn = (value: string) => {
      if (isEmptyInputValue(value)) return false;
      if (value.length !== 15) return false;

      const ukCountryCodes = [232, 233, 234, 235];
      const beaconCountryCode = HexIdParser.countryCode(value);

      return !ukCountryCodes.includes(beaconCountryCode);
    };

    return {
      errorMessage,
      applies,
    };
  }

  /**
   * Validator that requires the form input value to be a number; proxies through to the {@link Validators.pattern()}.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns            {ValidationRule}   A validation rule
   */
  public static wholeNumber(errorMessage: string): ValidationRule {
    const wholeNumberRegex = /^[0-9]+$/;
    return Validators.pattern(errorMessage, wholeNumberRegex);
  }

  /**
   * Validator that requires the form input value to be a valid email; proxies through to the {@link Validators.pattern()}.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns            {ValidationRule}   A validation rule
   */
  public static email(errorMessage: string): ValidationRule {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return Validators.pattern(errorMessage, emailRegex);
  }

  /**
   * Validator that requires the form input value to be a valid postcode; proxies through to the {@link Validators.pattern()}.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @returns            {ValidationRule}   A validation rule
   */
  public static postcode(errorMessage: string): ValidationRule {
    const emailRegex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;
    return Validators.pattern(errorMessage, emailRegex);
  }

  /**
   * Convenience static method to return a validator that requires the value to match a regular expression pattern provided.
   *
   * @param errorMessage {string}           An error message if the rule is violated
   * @param pattern      {RegExp}           A regular expression to be used to test the value
   * @returns            {ValidationRule}   A validation rule
   */
  private static pattern(
    errorMessage: string,
    pattern: RegExp
  ): ValidationRule {
    const applies: ValidatorFn = (value: string) =>
      !isEmptyInputValue(value) && !pattern.test(value);

    return { errorMessage, applies };
  }

  private constructor() {
    // Prevent external instantiation.
  }
}
