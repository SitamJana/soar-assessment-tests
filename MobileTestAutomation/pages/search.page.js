const BasePage = require('./base.page');

class SearchPage extends BasePage {
    /**
     * Selector for the search box input field.
     * @returns {string} XPath selector for the search box.
     */
    get searchBox() {
        return '//*[@resource-id="org.wikipedia.alpha:id/search_src_text"]';
    }

    /**
     * Selector for the search results list.
     * @returns {string} XPath selector for search results.
     */
    get searchResults() {
        return '//*[@resource-id="org.wikipedia.alpha:id/page_list_item_title"]';
    }

    /**
     * Selector for the clear search icon.
     * @returns {string} Selector for the clear query button.
     */
    get clearSearchIcon() {
        return '~Clear query';
    }

    /**
     * Selector for the back-to-home icon.
     * @returns {string} XPath selector for the back-to-home button.
     */
    get backToHomeIcon() {
        return '//*[@resource-id="org.wikipedia.alpha:id/search_toolbar"]//android.widget.ImageButton';
    }

    /**
     * Inputs the specified text into the search box.
     * @param {string} text - The text to input into the search box.
     * @returns {Promise<void>}
     */
    async inputTextIntoSearchBox(text) {
        await this.setValue(this.searchBox, text);
    }

    /**
     * Validates that search results are displayed.
     * @returns {Promise<void>}
     */
    async validateSearchResultsDisplayed() {
        await this.assertElementDisplayed(this.searchResults);
    }

    /**
     * Clears the text from the search box.
     * @returns {Promise<void>}
     */
    async clearSearchText() {
        await this.click(this.clearSearchIcon);
    }

    /**
     * Validates that search results are not displayed.
     * @returns {Promise<void>}
     */
    async validateSearchResultsNotDisplayed() {
        await this.assertElementNotDisplayed(this.searchResults);
    }

    /**
     * Navigates back to the home page by clicking the back-to-home icon.
     * @returns {Promise<void>}
     */
    async goBackToHomePage() {
        await this.click(this.backToHomeIcon);
    }
}

module.exports = new SearchPage();
