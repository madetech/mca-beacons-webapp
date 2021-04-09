import {
  andIHaveEnteredNoInformation,
  requiredFieldErrorMessage,
  thenIShouldSeeAnErrorMessageThatContains,
  whenIClickContinue,
} from "../selectors-and-assertions.spec";
import { givenIAmAnAviationBeaconOwner } from "../user-journey-steps.spec";

describe("As a beacon owner, I want to submit the purpose for my beacon", () => {
  it("displays an error if no beacon use purpose is selected", () => {
    givenIAmAnAviationBeaconOwner();
    andIHaveEnteredNoInformation();
    whenIClickContinue();
    thenIShouldSeeAnErrorMessageThatContains(requiredFieldErrorMessage);
    // TODO: Uncomment below assertions when issue #148 fixed.  Error link
    // should move focus to first radio button.
    //
    // whenIClickOnTheErrorSummaryLinkContaining(
    //   "purpose",
    //   requiredFieldErrorMessage
    // );
    // thenMyFocusMovesTo("#pleasure");
  });
});
