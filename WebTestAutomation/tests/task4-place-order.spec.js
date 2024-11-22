const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../page-objects/registration-page");
const { LogInPage } = require("../page-objects/login-page");
const { ProductListPage } = require("../page-objects/product-list-page");
const { BasketPage } = require("../page-objects/basket-page");
const { createLogFile } = require("../helpers/log-helper");
const { sleep } = require('../helpers/utility-helper');

// Test suite for PLace Order functionality
test.describe("Task 4 - Place Order Tests", () => {

  let loggerInstance;
  const logFileName = 'task4-place-order-tests-logging.log';

  test.beforeAll(async () => {
    loggerInstance = createLogFile(logFileName);
  });

  // Set up a new browser context for each test case
  test.beforeEach(async ({ page }) => {

    // Create instance of RegistrationPage, LogInPage
    const registrationPage = new RegistrationPage(page, loggerInstance);
    const logInPage = new LogInPage(page, loggerInstance);

    // Create new user registration
    await registrationPage.navigate();
    const registrationData = await registrationPage.registerNewUser();

    // Navigate to the Login page
    await logInPage.navigate();

    // Login to the application
    await logInPage.login(registrationData.email, registrationData.password);

  });

    // Test case to place order
    test("Verify basket page and place an order", {
      tag: ['@order', '@positive'],
    }, async ({ page }) => {
  
      // Create instance of ProductListPage, BasketPage
      const productListPage = new ProductListPage(page, loggerInstance);
      const basketPage = new BasketPage(page, loggerInstance);

      await productListPage.addProductsToBasket(5);

      await basketPage.navigate();
      await basketPage.validateAddOrRemoveQuantity();

      await basketPage.placeOrder();
      await basketPage.validateOrderPlacementSuccessful();
      
    });

});
