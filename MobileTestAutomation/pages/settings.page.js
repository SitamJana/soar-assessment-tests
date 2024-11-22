const BasePage = require('./base.page');
const WaitHelper = require('../helper/wait.helper');

class SettingsPage extends BasePage {
    /**
     * Selector for the toggle icons in the settings page.
     * @returns {string} XPath selector for the toggle icons.
     */
    get toggleIcons() {
        return '//*[@resource-id="org.wikipedia.alpha:id/switchWidget"]';
    }

    /**
     * Selector for the back-to-home icon.
     * @returns {string} Selector for the navigation button to go back to the home page.
     */
    get backToHomeIcon() {
        return '~Navigate up';
    }

    /**
     * Clicks on all toggle icons in the settings page to switch their states.
     * Pauses briefly between each click to ensure smooth operation.
     * @returns {Promise<void>}
     */
    async clickOnAllSettingsToggleIcons() {
        $$(this.toggleIcons).forEach(async toggleIcon => {
            await toggleIcon.click();
            await WaitHelper.pause(500);
        });
    }

    /**
     * Navigates back to the home page by clicking the back-to-home icon.
     * @returns {Promise<void>}
     */
    async goBackToHomePage() {
        await this.click(this.backToHomeIcon);
    }
}

module.exports = new SettingsPage();