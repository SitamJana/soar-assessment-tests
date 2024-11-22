const { expect } = require("@playwright/test");
const { createLogEntry } = require("../helpers/log-helper");

exports.CommonPage = class CommonPage {
  constructor(page, logger) {
    this.page = page;
    this.logger = logger;

    // Page locators which are shared by multiple pages
    this.closeWelcomeBannerButton = page.getByLabel('Close Welcome Banner');
    this.dismissCookieMessageButton = page.getByLabel('dismiss cookie message');
    this.navbar = {
      accountMenu: page.locator('#navbarAccount'),
      logoutButton: page.locator('#navbarLogoutButton'),
      yourBasketButton: page.getByLabel('Show the shopping cart')
    }
  }

  // Close welcome banner
  async closeWelcomeBanner(){
    createLogEntry(this.logger, 'Closing the welcome banner');
    if(await this.closeWelcomeBannerButton.isVisible()) {
      this.closeWelcomeBannerButton.click();
    }
  }

  // Dismiss cookie message
  async dismissCookieMessage(){
    createLogEntry(this.logger, 'Dismissing cookie message');
    if(await this.dismissCookieMessageButton.isVisible()) {
      this.dismissCookieMessageButton.click();
    }
  }

  // Validate successful login by checking user info visibility
  async validateSuccessfulLogin() {
    createLogEntry(this.logger, 'Validating login in successful');
    await this.navbar.accountMenu.click();
    await expect(this.navbar.logoutButton).toBeVisible();
  }

};
