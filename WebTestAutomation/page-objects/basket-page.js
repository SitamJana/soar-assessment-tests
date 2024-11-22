const { expect } = require("@playwright/test");
const { sleep } = require('../helpers/utility-helper');
const { CommonPage } = require("./common-page");
const { createLogEntry } = require("../helpers/log-helper");
const { faker } = require('@faker-js/faker');

// Define BasketPage class for interacting with the product list page
exports.BasketPage = class BasketPage {
  constructor(page, logger) {
    this.page = page;
    this.logger = logger;
    this.commonPage = new CommonPage(page, logger);

    // Define page locators for various UI elements
    this.totalPrice = page.locator('#price');
    this.addQuantityIcon = page.locator('//mat-row[1]//mat-cell[contains(@class, "mat-column-quantity")]//*[contains(@class, "plus-square")]');
    this.minusQuantityIcon = page.locator('//mat-row[1]//mat-cell[contains(@class, "mat-column-quantity")]//*[contains(@class, "minus-square")]');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

    this.addNewAdressButton = page.getByLabel('Add a new address');
    this.countryInputbox = page.getByPlaceholder('Please provide a country.');
    this.nameInputbox = page.getByPlaceholder('Please provide a name.');
    this.mobileNoInputbox = page.getByPlaceholder('Please provide a mobile');
    this.zipCodeInputbox = page.getByPlaceholder('Please provide a ZIP code.');
    this.addressInputbox = page.getByPlaceholder('Please provide an address.');
    this.cityInputbox = page.getByPlaceholder('Please provide a city.');
    this.stateInputbox = page.getByPlaceholder('Please provide a state.');
    this.submitButton = page.getByRole('button', { name: 'send Submit' });
    this.addressRow = page.locator('app-address-select mat-row').nth(0);

    this.proceedToPaymentButton = page.getByLabel('Proceed to payment selection');

    this.deliveryMethodRow = page.locator('app-delivery-method mat-row').nth(0);
    this.proceedToDeliveryButton = page.getByLabel('Proceed to delivery method');
    
    this.walletBalance = page.locator('div').filter({ hasText: /^Wallet Balance 0\.00$/ });
    this.addNewCreditOrDebitCardButton = page.getByRole('button', { name: 'Add new card Add a credit or' });
    this.cardNameInputbox = page.getByLabel('Name *');
    this.cardNoInputbox = page.getByLabel('Card Number *');
    this.cardExpiryMonthDropdown = page.getByLabel('Expiry Month *');
    this.cardExpiryYearDropdown = page.getByLabel('Expiry Year *');
    this.saveCardInfoButton = page.getByRole('button', { name: 'send Submit' });

    this.paymentMethodRow = page.locator('app-payment-method mat-row mat-radio-button').nth(0);

    this.proceedToReviewButton = page.getByLabel('Proceed to review');
    this.completeYourPurchaseButton = page.getByLabel('Complete your purchase');

    this.orderSuccessMessage = page.getByRole('heading', { name: 'Thank you for your purchase!' });

  }

  /**
   * Navigate to the basket page using the common page navigation bar.
   */
  async navigate(){
    createLogEntry(this.logger, 'Navigating to basket page');
    this.commonPage.navbar.yourBasketButton.click();
  }

  /**
   * Validate that adding or removing a quantity updates the cart's total price.
   */
  async validateAddOrRemoveQuantity(){
    createLogEntry(this.logger, 'Validating adding or removing quanity updating cart total');
    const cartTotalPrice = await this.totalPrice.textContent();
    await this.addQuantityIcon.click();
    await sleep(this.logger, 2000);
    const cartTotalPriceAfterAddQuantity = await this.totalPrice.textContent();
    expect(cartTotalPriceAfterAddQuantity).not.toEqual(cartTotalPrice);

    await this.minusQuantityIcon.click();
    await sleep(this.logger, 2000);
    const cartTotalPriceAfterMinusQuantity = await this.totalPrice.textContent();
    expect(cartTotalPriceAfterMinusQuantity).not.toEqual(cartTotalPriceAfterAddQuantity);
  }

  /**
   * Add a new address with randomly generated data.
   */
  async addNewAddress(){
    createLogEntry(this.logger, 'Adding a new address');
    await this.addNewAdressButton.click();

    await this.countryInputbox.fill(faker.location.country());
    await this.nameInputbox.fill(faker.person.fullName());
    await this.mobileNoInputbox.fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString());
    await this.zipCodeInputbox.fill(faker.location.zipCode('#####'));
    await this.addressInputbox.fill(faker.location.streetAddress());
    await this.cityInputbox.fill(faker.location.city());
    await this.stateInputbox.fill(faker.location.state());

    await this.submitButton.click();

    await this.addressRow.waitFor({state: 'visible'});
  }

  /**
   * Validate that the wallet balance is displayed as zero.
   */
  async validateWalletBalanceZero(){
    createLogEntry(this.logger, 'validating Wallet Balance to be Zero');
    await expect(this.walletBalance).toBeVisible();
  }

  /**
   * Add a new credit or debit card with randomly generated details.
   */
  async addNewCardInfo(){
    createLogEntry(this.logger, 'Adding a new debit or credit card info');
    await this.addNewCreditOrDebitCardButton.click();

    await this.cardNameInputbox.fill(faker.person.fullName());
    await this.cardNoInputbox.fill(1+ faker.string.numeric(15));
    await this.cardExpiryMonthDropdown.selectOption('5');
    await this.cardExpiryYearDropdown.selectOption('2080');

    await this.saveCardInfoButton.click();
  }

  /**
   * Place an order by completing all checkout steps.
   */
  async placeOrder(){
    createLogEntry(this.logger, 'Place an order');

    await this.checkoutButton.click();

    await this.addNewAddress();
    await this.addressRow.click();
    await this.proceedToPaymentButton.click();

    await this.deliveryMethodRow.click();
    await this.proceedToDeliveryButton.click();

    await this.validateWalletBalanceZero();
    await this.addNewCardInfo();
    await this.paymentMethodRow.click();

    await this.proceedToReviewButton.click();
    await this.completeYourPurchaseButton.click();
  }

  /**
   * Validate that the order placement was successful.
   */
  async validateOrderPlacementSuccessful(){
    createLogEntry(this.logger, 'validating Order placement was successful');
    await expect(this.orderSuccessMessage).toBeVisible();
  }


};
