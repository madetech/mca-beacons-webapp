import { FieldValidator } from "../../src/lib/fieldValidator";

describe("FieldValidator", () => {
  describe("constructor", () => {
    it("defaults the value to an empty string, not undefined", () => {
      const fieldValidator = new FieldValidator("emptyFormField");

      expect(fieldValidator.value).toBe("");
    });
  });
  describe("hasError()", () => {
    it("should return false if no value is set", () => {
      const fieldWithNoValue = new FieldValidator("formFieldId");

      const hasError = fieldWithNoValue.hasError();

      expect(hasError).toBe(false);
    });

    it("should return false if no validators are added", () => {
      const fieldWithNoValidators = new FieldValidator("formFieldId");
      fieldWithNoValidators.value = "field value";

      const hasError = fieldWithNoValidators.hasError();

      expect(hasError).toBe(false);
    });

    it("should return false if no validators are added", () => {
      const fieldWithNoValidators = new FieldValidator("formFieldId");
      fieldWithNoValidators.value = "field value";

      const hasError = fieldWithNoValidators.hasError();

      expect(hasError).toBe(false);
    });

    it("should return true if field is empty", () => {
      const fieldWithValidator = new FieldValidator("formFieldId");
      fieldWithValidator.should().containANonEmptyString();

      const hasError = fieldWithValidator.hasError();

      expect(hasError).toBe(true);
    });

    it("should return the error message if field is empty", () => {
      const fieldWithValidator = new FieldValidator("formFieldId");
      const errorMessage = "Enter something";
      fieldWithValidator
        .should()
        .containANonEmptyString()
        .withErrorMessage(errorMessage);

      const errorMessages = fieldWithValidator.errorMessages();

      expect(errorMessages).toStrictEqual([errorMessage]);
    });

    it("should return false when its only validator function says the field is valid", () => {
      const value = "This is a valid form field input value";
      const fieldShouldContainText = new FieldValidator("formFieldId");
      fieldShouldContainText.should().containANonEmptyString();
      fieldShouldContainText.value = value;

      const hasError = fieldShouldContainText.hasError();

      expect(hasError).toBe(false);
    });
  });
});
