const { expect } = require('chai');

class BasePage {
  /**
   * Waits for a specific web element to be displayed within a given timeout.
   * @param {string} selector - The selector of the element to wait for.
   * @param {number} timeout - Timeout in milliseconds (default is 5000).
   * @returns {Promise<WebdriverIO.Element>} The WebdriverIO element.
   */
  async waitForElement(selector, timeout = 5000) {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout });
      return element;
  }

  /**
   * Retrieves all elements matching a given selector.
   * @param {string} selector - The selector of the elements to retrieve.
   * @returns {Promise<WebdriverIO.ElementArray>} An array of WebdriverIO elements.
   */
  async getElements(selector) {
      const elements = await $$(selector);
      return elements;
  }

  /**
   * Waits for an element to be displayed and then clicks on it.
   * @param {string} selector - The selector of the element to click.
   * @returns {Promise<void>}
   */
  async click(selector) {
      const element = await this.waitForElement(selector);
      await element.click();
  }

  /**
   * Waits for an element to be displayed and sets its value.
   * @param {string} selector - The selector of the element.
   * @param {string} value - The value to set.
   * @returns {Promise<void>}
   */
  async setValue(selector, value) {
      const element = await this.waitForElement(selector);
      await element.setValue(value);
  }

  /**
   * Waits for an element to be displayed and retrieves its text content.
   * @param {string} selector - The selector of the element.
   * @returns {Promise<string>} The text content of the element.
   */
  async getText(selector) {
      const element = await this.waitForElement(selector);
      return element.getText();
  }

  /**
   * Asserts that at least one element matching the selector is displayed.
   * @param {string} selector - The selector of the element(s).
   * @returns {Promise<void>}
   */
  async assertElementDisplayed(selector) {
      const elements = await this.getElements(selector);
      expect(elements.length).to.be.above(0);
  }

  /**
   * Asserts that no elements matching the selector are displayed.
   * @param {string} selector - The selector of the element(s).
   * @returns {Promise<void>}
   */
  async assertElementNotDisplayed(selector) {
      const elements = await this.getElements(selector);
      expect(elements.length).to.equal(0);
  }
}
  
  module.exports = BasePage;
  