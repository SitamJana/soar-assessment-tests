const { expect } = require("@playwright/test");
const { sleep, generateStrongPassword } = require('../helpers/utility-helper');
const { CommonPage } = require("./common-page");
const { createLogEntry } = require("../helpers/log-helper");
const { faker } = require('@faker-js/faker');

// Define SignInPage class for interacting with Sign In page elements
exports.RegistrationPage = class RegistrationPage {
  constructor(page, logger) {
    this.page = page;
    this.logger = logger;
    this.commonPage = new CommonPage(page, logger);

    // Define page locators for various UI elements
    this.emailInputBox = page.locator('#emailControl');
    this.passwordInputBox = page.locator('#passwordControl');
    this.repeatPasswordInputBox = page.locator('#repeatPasswordControl');
    this.showPasswordToggle = page.locator('//mat-slide-toggle[contains(., "Show password advice")]');
    this.passwordAdviceContent = page.locator('mat-password-strength-info .mat-card-content');
    this.SecurityQuestionDropdown = page.locator('mat-select[name=securityQuestion]');
    this.securityQuestionOption = page.getByText('Name of your favorite pet?');
    this.answerToSecurityQuestionInputBox = page.locator('#securityAnswerControl');
    this.registerButton = page.locator('#registerButton');
    this.registrationSuccessMessage = page.getByText('Registration completed successfully. You can now log in.');
    
    // Error messages
    this.errorMessages = {
      required: {
        emailAddress: 'Please provide an email address.',
        password: 'Please provide a password.',
        repeatPassword: 'Please repeat your password.',
        securityQuestion: 'Please select a security question.',
        answerToSecurityQuestion: 'Please provide an answer to your security question.'
      }
    };
  }

  // Generate locator for the error messages
  getErrorMessageLocator(errorMessage){
    const errorMessageLocator = `//mat-error[normalize-space(text())="${errorMessage}"]`;
    return this.page.locator(errorMessageLocator);
  }

  // Navigate to the registration page
  async navigate() {
    createLogEntry(this.logger, 'Navigating to the User Registration page');
    await this.page.goto("/#/register");

    await sleep(this.logger, 3000);
    await this.commonPage.closeWelcomeBanner();
    await sleep(this.logger, 1000);
    await this.commonPage.dismissCookieMessage();
  }

  // Validate input fields validation messages
  async validateInputFieldValidationErrorMessages(){
    // Generate error messages by clicking on each input fields
    createLogEntry(this.logger, 'Generating input validation error messages by clicking on each input fields');
    await this.emailInputBox.click();
    await this.passwordInputBox.click();
    await this.repeatPasswordInputBox.click();
    await this.SecurityQuestionDropdown.press('Tab');
    await this.answerToSecurityQuestionInputBox.click();
    await this.emailInputBox.click();

    // Validate error messages
    createLogEntry(this.logger, 'Validating input validation error messages');
    await expect(this.getErrorMessageLocator(this.errorMessages.required.emailAddress)).toBeVisible();
    await expect(this.getErrorMessageLocator(this.errorMessages.required.password)).toBeVisible();
    await expect(this.getErrorMessageLocator(this.errorMessages.required.repeatPassword)).toBeVisible();
    await expect(this.getErrorMessageLocator(this.errorMessages.required.securityQuestion)).toBeVisible();
    await expect(this.getErrorMessageLocator(this.errorMessages.required.answerToSecurityQuestion)).toBeVisible();
  }

  // Validate password advice card displays
  async validatePasswordAdviceCard(){
    createLogEntry(this.logger, 'Validating password advice card displays');
    await this.showPasswordToggle.click();
    await expect(this.passwordAdviceContent).toBeVisible();
  }

  // Register a new user
  async registerNewUser(){
    const registrationData = {
      email: faker.internet.email(),
      password: generateStrongPassword(10)
    };

    createLogEntry(this.logger, `Registering a new user with Email: ${registrationData.email} and Password: ${registrationData.password}`);
    await this.emailInputBox.fill(registrationData.email);
    await this.passwordInputBox.fill(registrationData.password);
    await this.repeatPasswordInputBox.fill(registrationData.password);
    await this.SecurityQuestionDropdown.click();
    await this.securityQuestionOption.click();
    await this.answerToSecurityQuestionInputBox.fill('Tommy');
    await this.registerButton.click();

    createLogEntry(this.logger, `Registered a new user with Email: ${registrationData.email} and Password: ${registrationData.password}`);

    return registrationData;
  }

  // Validate registration successful message
  async validateRegistrationSuccessfulMessage(){
    createLogEntry(this.logger, 'Validating registration successful message displayed on page');
    await expect(this.registrationSuccessMessage).toBeVisible();
  }

};
