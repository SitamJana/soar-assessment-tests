const { test } = require("@playwright/test");
const { RegistrationPage } = require("../page-objects/registration-page");
const { LogInPage } = require("../page-objects/login-page");
const { CommonPage } = require("../page-objects/common-page");
const { createLogFile } = require("../helpers/log-helper");

// Test suite for Registration Page functionality
test.describe("Task 3 - Registration and Login Tests", () => {

  let loggerInstance;
  const logFileName = 'task3-registration-and-login-tests-logging.log';

  test.beforeAll(async () => {
    loggerInstance = createLogFile(logFileName);
  });

  // Set up a new browser context for each test case
  test.beforeEach(async ({ page }) => {

    // Create a new instance of RegistrationPage and navigate to the Registration page
    const registrationPage = new RegistrationPage(page, loggerInstance);
    await registrationPage.navigate();

  });

  // Test case to verify the input validation error messages
  test("Verify Input field validation error messages", {
    tag: ['@register', '@validation'],
  }, async ({ page }) => {

    // Create instance of RegistrationPage
    const registrationPage = new RegistrationPage(page, loggerInstance);

    // Validate input field validation error messages
    await registrationPage.validateInputFieldValidationErrorMessages();

  });

    // Test case to perform a successful user registration
    test("Create a new user registration and login to the application", {
      tag: ['@register', '@login', '@positive'],
    }, async ({ page }) => {
  
      // Create instance of RegistrationPage, LogInPage and CommonPage
      const registrationPage = new RegistrationPage(page, loggerInstance);
      const logInPage = new LogInPage(page, loggerInstance);
      const commonPage = new CommonPage(page, loggerInstance);

      // Validate password advice card
      await registrationPage.validatePasswordAdviceCard();
  
      // Create new user registration
      const registrationData = await registrationPage.registerNewUser();

      // Validate registration successful message displayed on page
      await registrationPage.validateRegistrationSuccessfulMessage();

      // Navigate to the Login page
      await logInPage.navigate();

      // Login to the application
      await logInPage.login(registrationData.email, registrationData.password);

      // Validate Login successful
      await commonPage.validateSuccessfulLogin();
      
    });

});
