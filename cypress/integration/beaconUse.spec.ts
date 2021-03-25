import {
  givenIAmAt,
  givenIHaveSelected,
  iCanClickTheBackLinkToGoToPreviousPage,
  thenTheUrlShouldContain,
  whenIClickContinue,
} from "./common.spec";

describe("As a beacon owner, I want to submit uses for my beacon", () => {
  const previousPageUrl = "register-a-beacon/beacon-information";
  const pageUrl = "/register-a-beacon/beacon-use";
  const purposeUrl = "/registrer-a-beacon/purpose";
  const activityUrl = "/registrer-a-beacon/activity";
  const environmentSelector = "#environment";

  beforeEach(() => {
    givenIAmAt(pageUrl);
  });

  it("should route to the previous page", () => {
    iCanClickTheBackLinkToGoToPreviousPage(previousPageUrl);
  });

  it("should route to the purpose page if maritime selected", () => {
    givenIHaveSelected("#maritime");
    whenIClickContinue();

    thenTheUrlShouldContain(purposeUrl);
  });

  it("should route to the purpose page if aircraft selected", () => {
    givenIHaveSelected("#aircraft");
    whenIClickContinue();

    thenTheUrlShouldContain(purposeUrl);
  });

  it("should route to the activity page if land is selected", () => {
    givenIHaveSelected("#land");
    whenIClickContinue();

    thenTheUrlShouldContain(activityUrl);
  });

  it("should route to the activity page if other is selected", () => {
    givenIHaveSelected("#other");
    whenIClickContinue();

    thenTheUrlShouldContain(activityUrl);
  });
});
