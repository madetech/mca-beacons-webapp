import { PageURLs } from "../../../src/lib/urls";
import {
  givenIHaveBeenTo,
  givenIHaveClickedContinue,
  givenIHaveSelected,
  thenTheUrlShouldContain,
} from "../common/selectors-and-assertions.spec";

describe("As a new user who wants to register a beacon", () => {
  it("I can create a Beacon Registry Account", () => {
    givenIHaveBeenTo(PageURLs.start);
    //TODO: Replace line below with: givenIHaveClicked(".govuk-button--start");
    givenIHaveBeenTo(PageURLs.signUpOrSignIn);
    givenIHaveSelected("#signUp");
    givenIHaveClickedContinue();
    //TODO: Create sign up page and add tests
    thenTheUrlShouldContain(PageURLs.signUp);
  });
});

describe("As user with an account", () => {
  it("I can sign in to my Beacon Registry Account", () => {
    givenIHaveBeenTo(PageURLs.start);
    //TODO: Replace line below with: givenIHaveClicked(".govuk-button--start");
    givenIHaveBeenTo(PageURLs.signUpOrSignIn);
    givenIHaveSelected("#signIn");
    givenIHaveClickedContinue();
    //TODO: Create sign in page and add tests
    thenTheUrlShouldContain(PageURLs.signIn);
  });
});
