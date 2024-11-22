const { test } = require("@playwright/test");
const { ProductListPage } = require("../page-objects/product-list-page");
const { createLogFile } = require("../helpers/log-helper");

// Test suite for Product Reviews functionality
test.describe("Task 2 - Product Reviews Tests", () => {

  let loggerInstance;
  const logFileName = 'task2-product-reviews-tests-logging.log';

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
  test("Verify product reviews displayed on page", {
    tag: ['@products', '@reviews', '@validation'],
  }, async ({ page }) => {

    // Create instance of ProductListPage
    const productListPage = new ProductListPage(page, loggerInstance);

    // Open product details
    await productListPage.openProductDetails();

    // Expand product reviews and validate it displayed
    await productListPage.expandProductReview();
    await productListPage.validateProductReviewsDisplayed();

    // Close product details dialog
    await productListPage.closeProductDetailsDialog();

  });

});
