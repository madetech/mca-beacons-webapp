import { asAMaritimePleasureBeaconOwner } from "../common/i-can-enter-beacon-information.spec";
import {
  andIHaveEnteredNoInformation,
  andIHaveSelected,
  requiredFieldErrorMessage,
  thenIShouldSeeAnErrorMessageThatContains,
  thenIShouldSeeAnErrorSummaryLinkThatContains,
  thenMyFocusMovesTo,
  whenIClickContinue,
  whenIClickOnTheErrorSummaryLinkContaining,
} from "../common/selectors-and-assertions.spec";

describe("As a beacon owner, I want to submit the primary activity for my beacon", () => {
  const otherActivitySelector = "#other-activity";

  it("displays an error if no activity is selected", () => {
    asAMaritimePleasureBeaconOwner();
    andIHaveEnteredNoInformation();
    whenIClickContinue();
    thenIShouldSeeAnErrorMessageThatContains(requiredFieldErrorMessage);
    thenIShouldSeeAnErrorSummaryLinkThatContains(
      "Activity",
      requiredFieldErrorMessage
    );
  });

  xit("focuses me on the first radio button if there is an error", () => {
    // TODO issue #148 (https://github.com/mcagov/beacons-webapp/issues/148)
    whenIClickContinue();
    thenIShouldSeeAnErrorMessageThatContains(requiredFieldErrorMessage);
    thenIShouldSeeAnErrorSummaryLinkThatContains(
      "Maritime pleasure use",
      requiredFieldErrorMessage
    );

    whenIClickOnTheErrorSummaryLinkContaining(requiredFieldErrorMessage);
    thenMyFocusMovesTo("#motor-vessel");
  });

  it("displays an error if 'Other activity' is selected, but no text is provided", () => {
    asAMaritimePleasureBeaconOwner();
    andIHaveSelected(otherActivitySelector);
    whenIClickContinue();
    thenIShouldSeeAnErrorMessageThatContains(
      "Other activity",
      requiredFieldErrorMessage
    );
    whenIClickOnTheErrorSummaryLinkContaining(
      "Other activity",
      requiredFieldErrorMessage
    );
    thenMyFocusMovesTo("#otherActivityText");
  });
});
