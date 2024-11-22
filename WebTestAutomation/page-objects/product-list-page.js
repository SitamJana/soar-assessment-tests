const { expect } = require("@playwright/test");
const { sleep } = require('../helpers/utility-helper');
const { CommonPage } = require("./common-page");
const { createLogEntry } = require("../helpers/log-helper");

// Define ProductListPage class for interacting with the product list page
exports.ProductListPage = class ProductListPage {
  constructor(page, logger) {
    this.page = page;
    this.logger = logger;
    this.commonPage = new CommonPage(page, logger);

    // Define page locators for various UI elements
    this.productList = page.locator('mat-grid-list');
    this.productTiles = page.locator('mat-grid-list mat-grid-tile');
    this.productDetailsDialog = page.locator('app-product-details');
    this.expandProductReviewPanel = page.locator('mat-expansion-panel[aria-label="Expand for Reviews"]');
    this.productReviews = page.locator('.mat-expansion-panel-body .comment');
    this.closeProductDetailsDialogButton = page.getByLabel('Close Dialog');
    this.itemsPerPageDropdown = page.locator('mat-select[aria-label*="Items per page"]');
    this.lastOptionInItemsPerPageDropdown = page.locator('[aria-label*="Items per page"] mat-option:last-child');
    this.paginationText = page.locator('.mat-paginator-range-label');
    this.addedToBasketSuccessMessage = page.locator('snack-bar-container').nth(0);
  }

  // Navigate to the product list page
  async navigate() {
    createLogEntry(this.logger, 'Navigating to the Product List page');
    await this.page.goto("/#");

    await sleep(this.logger, 2000);
    await this.commonPage.closeWelcomeBanner();
    await sleep(this.logger, 1000);
    await this.commonPage.dismissCookieMessage();
  }

  // Get no of products to be shown from pagination text
  getNoOfProductsShownFromPaginationText(paginationText){
    // Regular expression to match numbers
    const numberRegex = /\d+/g;

    // Extract all numbers from the text
    const numbers = paginationText.match(numberRegex);

    // If there are multiple numbers, extract the last one
    return numbers[numbers.length - 1];
  }

  // Display all products and validate all products shown on the page
  async displayAllProductsAndValidate(){
    createLogEntry(this.logger, 'Displaying all products and validate');

    const paginationTextBefore = await this.paginationText.textContent();
    await this.itemsPerPageDropdown.click();
    await this.lastOptionInItemsPerPageDropdown.click();
    await sleep(this.logger, 2000);
    const paginationTextAfter = await this.paginationText.textContent();
    expect(paginationTextAfter).not.toEqual(paginationTextBefore);

    const expectedNoOfProductsToDisplay = this.getNoOfProductsShownFromPaginationText(paginationTextAfter);
    await expect(this.productTiles).toHaveCount(Number(expectedNoOfProductsToDisplay));
  }

  // Open product details page
  async openProductDetails(index = 0){
    createLogEntry(this.logger, `Clicking on ${index + 1} product`);
    await this.productTiles.nth(index).click();
  }

  // Expand product reviews
  async expandProductReview(){
    createLogEntry(this.logger, 'Expanding product reviews');
    await this.expandProductReviewPanel.click();
    await sleep(this.logger, 1000);
  }

  // Validate product reviews displayed
  async validateProductReviewsDisplayed(){
    createLogEntry(this.logger, 'Validating product reviews displayed');
    await expect(this.productReviews.nth(0)).toBeVisible();
  }

  // Close product details dialog
  async closeProductDetailsDialog(){
    createLogEntry(this.logger, 'Closing product details dialog');
    await this.closeProductDetailsDialogButton.click();
    await sleep(this.logger, 1000);
    await expect(this.productDetailsDialog).not.toBeVisible();
  }

  // Add products to basket
  async addProductsToBasket(noOfProducts = 5){
    createLogEntry(this.logger, `Adding ${noOfProducts} products to basket`);

    await this.productList.waitFor({state: 'visible'});
    const addToBasketButtons = await this.page.locator('mat-grid-tile button[aria-label="Add to Basket"]');
    const countOfAddToBasketButtons = await addToBasketButtons.count();
    if(countOfAddToBasketButtons >= noOfProducts){
      for (let i = 0; i < noOfProducts; i++) {
        await addToBasketButtons.nth(i).click();
        await expect(this.addedToBasketSuccessMessage).toBeVisible();
        await sleep(this.logger, 1000);
      }
    } else {
      for (const addToBasketButton of addToBasketButtons) {
        await addToBasketButton.click();
        await expect(this.addedToBasketSuccessMessage).toBeVisible();
        await sleep(this.logger, 1000);
      }
    }
  }


};
