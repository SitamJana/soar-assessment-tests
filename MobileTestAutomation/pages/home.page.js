const BasePage = require('./base.page');

class HomePage extends BasePage {
    /**
     * Locator for the "Explore" navigation menu item.
     * @returns {string} Selector for the Explore menu.
     */
    get exploreNavMenu() {
        return '~Explore';
    }

    /**
     * Locator for the "My Lists" navigation menu item.
     * @returns {string} Selector for the My Lists menu.
     */
    get myListsNavMenu() {
        return '~My lists';
    }

    /**
     * Locator for the "History" navigation menu item.
     * @returns {string} Selector for the History menu.
     */
    get historyNavMenu() {
        return '~History';
    }

    /**
     * Locator for the "Nearby" navigation menu item.
     * @returns {string} Selector for the Nearby menu.
     */
    get nearbyNavMenu() {
        return '~Nearby';
    }

    /**
     * Locator for the search container element on the Home page.
     * @returns {string} Selector for the search container.
     */
    get searchContainer() {
        return '//*[@resource-id="org.wikipedia.alpha:id/search_container"]';
    }

    /**
     * Locator for the three-dot menu icon.
     * @returns {string} Selector for the three-dot menu icon.
     */
    get threeDotMenuIcon() {
        return '//*[@resource-id="org.wikipedia.alpha:id/menu_overflow_button"]';
    }

    /**
     * Locator for the "Settings" menu option under the three-dot menu.
     * @returns {string} Selector for the Settings menu option.
     */
    get settingsMenuOption() {
        return '//*[@resource-id="org.wikipedia.alpha:id/explore_overflow_settings"]';
    }

    /**
     * Verifies that the search container element is displayed on the Home page.
     * @returns {Promise<void>}
     */
    async isDisplayed() {
        await this.assertElementDisplayed(this.searchContainer);
    }

    /**
     * Clicks on the "Explore" navigation menu item.
     * @returns {Promise<void>}
     */
    async openExploreMenu() {
        await this.click(this.exploreNavMenu);
    }

    /**
     * Clicks on the "My Lists" navigation menu item.
     * @returns {Promise<void>}
     */
    async openMyListsMenu() {
        await this.click(this.myListsNavMenu);
    }

    /**
     * Clicks on the "History" navigation menu item.
     * @returns {Promise<void>}
     */
    async openHistoryMenu() {
        await this.click(this.historyNavMenu);
    }

    /**
     * Clicks on the "Nearby" navigation menu item.
     * @returns {Promise<void>}
     */
    async openNearByMenu() {
        await this.click(this.nearbyNavMenu);
    }

    /**
     * Clicks on the search container element to initiate a search.
     * @returns {Promise<void>}
     */
    async clickOnSearchContainer() {
        await this.click(this.searchContainer);
    }

    /**
     * Opens the app settings by clicking the three-dot menu and selecting the "Settings" option.
     * @returns {Promise<void>}
     */
    async openAppSettings() {
        await this.click(this.threeDotMenuIcon);
        await this.click(this.settingsMenuOption);
    }
}

module.exports = new HomePage();