/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />

describe("Auth page", () => {
  const email = "test" + Math.floor(Math.random() * 100000) + "@yopmail.com";
  before(() => {
    cy.visit("http://localhost:3000/");
  });
  it("user can switch between signIn and signUp modes", () => {
    cy.get("h1").should("have.text", "Login");
    cy.get('*[class^="AuthForm_toggle__"]').click();
    cy.get("h1").should("have.text", "Sign Up");
    cy.get('*[class^="AuthForm_toggle__"]').click();
    cy.get("h1").should("have.text", "Login");
  });
  it("user can register", () => {
    cy.get('*[class^="AuthForm_toggle__"]').click();
    cy.get("h1").should("have.text", "Sign Up");
    cy.get("#email").type(email);
    cy.get("#password").type("passwordtest123");
    cy.get("form").submit();
    cy.url().should("not.include", "/auth");
    cy.get("h1").should("have.text", "Welcome on Board!");
  });
  it("user can lougout and login and view home page", () => {
    cy.get("button").click();
    // switch from signUp to signIn
    cy.get('*[class^="AuthForm_toggle__"]').click();
    cy.get("#email").type(email);
    cy.get("#password").type("passwordtest123");
    cy.get("form").submit();
    cy.url().should("not.include", "/auth");
    cy.get("h1").should("have.text", "Welcome on Board!");
  });
  it("user can access to his profile and change password", () => {
    cy.get("ul > :nth-child(1) > a").click();
    cy.url().should("include", "/profile");
    cy.get("h1").should("have.text", "Your User Profile");
    cy.get("#new-password").type("newpasswordtest123");
    cy.intercept("**/updatePassword").as("updatePassword");
    cy.get('*[class^="ProfileForm_form__"]').submit();
    cy.wait("@updatePassword");
  });
  it("user can lougout and login again with the new password", () => {
    cy.get("button").click();
    cy.get("#email").type(email);
    cy.get("#password").type("newpasswordtest123");
    cy.get("form").submit();
    cy.url().should("not.include", "/auth");
    cy.get("h1").should("have.text", "Welcome on Board!");
  });
  it("user entered a short password in his profile and receive a response error in a modal", () => {
    cy.get("ul > :nth-child(1) > a").click();
    cy.url().should("include", "/profile");
    cy.get("h1").should("have.text", "Your User Profile");
    cy.get("#new-password").type("123");
    cy.get('*[class^="ProfileForm_form__"]').submit();
    cy.get(".p-dialog")
      .should("exist")
      .find("strong")
      .should(
        "have.text",
        "WEAK_PASSWORD : Password should be at least 6 characters"
      );
    cy.get(".p-dialog-header-close-icon").click();
    cy.get('*[class^="MainNavigation_logo__"]').click();
  });
});
