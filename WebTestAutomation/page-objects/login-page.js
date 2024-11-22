const { expect } = require("@playwright/test");
const { sleep } = require('../helpers/utility-helper');
const { CommonPage } = require("./common-page");
const { createLogEntry } = require("../helpers/log-helper");

// Define LogInPage class for interacting with Log In page elements
exports.LogInPage = class LogInPage {
  constructor(page, logger) {
    this.page = page;
    this.logger = logger;
    this.commonPage = new CommonPage(page, logger);

    // Define page locators for various UI elements
    this.emailInputBox = page.locator('#email');
    this.passwordInputBox = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
    
  }

  // Navigate to the login page
  async navigate() {
    createLogEntry(this.logger, 'Navigating to the Login page');
    await this.page.goto("/#/login");

    await sleep(this.logger, 2000);
    await this.commonPage.closeWelcomeBanner();
    await sleep(this.logger, 1000);
    await this.commonPage.dismissCookieMessage();
  }

  // Login to the application
  async login(email, password){
    createLogEntry(this.logger, `Login with Email: ${email} and Password: ${password}`);
    await this.emailInputBox.fill(email);
    await this.passwordInputBox.fill(password);
    await this.loginButton.click();
  }

};
