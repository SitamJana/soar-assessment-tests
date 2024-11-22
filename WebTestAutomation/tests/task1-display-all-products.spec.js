const { test } = require("@playwright/test");
const { ProductListPage } = require("../page-objects/product-list-page");
const { createLogFile } = require("../helpers/log-helper");

// Test suite for Product List Page functionality
test.describe("Task 1 - Product List Tests", () => {

  let loggerInstance;
  const logFileName = 'task1-product-list-tests-logging.log';

  test.beforeAll(async () => {
    loggerInstance = createLogFile(logFileName);
  });

    // Set up a new browser context for each test case
    test.beforeEach(async ({ page }) => {

      // Create a new instance of ProductListPage and navigate to the ProductListPage page
      const productListPage = new ProductListPage(page, loggerInstance);
      await productListPage.navigate();
  
    });

  // Test case to verify the product list
  test("Verify All products displayed on page", {
    tag: ['@products', '@validation'],
  }, async ({ page }) => {

    // Create instance of ProductListPage
    const productListPage = new ProductListPage(page, loggerInstance);

    // Validate all products displayed on page
    await productListPage.displayAllProductsAndValidate();

  });

});
