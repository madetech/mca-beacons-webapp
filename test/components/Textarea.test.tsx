import { render, screen } from "@testing-library/react";
import React from "react";
import { TextareaCharacterCount } from "../../src/components/TextArea";

describe("Textarea Components", () => {
  describe("TextareaCharacterCount", () => {
    let id: string;
    let label: string;
    let hintText: string;
    let maxCharacters: number;

    beforeEach(() => {
      id = "hexId";
      label = "Beacon Hex ID";
      hintText = "Please enter a value Hex ID";
      maxCharacters = 250;
    });

    it("should render the component with the correct character count", () => {
      render(
        <TextareaCharacterCount
          id={id}
          label={label}
          maxCharacters={maxCharacters}
        />
      );

      expect(
        screen.getByText(`You can enter up to ${maxCharacters} characters`)
      ).toBeDefined();
    });

    it("should render with the correct label and without the hint text", () => {
      render(
        <TextareaCharacterCount id={id} label={label} maxCharacters={150} />
      );

      expect(screen.getByLabelText(label)).toBeDefined();
      expect(screen.queryByText(hintText)).toBeNull();
    });

    it("should render the hint text if provided", () => {
      render(
        <TextareaCharacterCount
          id={id}
          label={label}
          maxCharacters={150}
          hintText={hintText}
        />
      );

      expect(screen.getByText(hintText)).toBeDefined();
    });
  });
});