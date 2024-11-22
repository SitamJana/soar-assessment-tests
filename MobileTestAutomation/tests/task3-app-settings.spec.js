const HomePage = require('../pages/home.page');
const SettingsPage = require('../pages/settings.page');
const WaitHelper = require('../helper/wait.helper');

describe('Wikipedia App Tests - Task 3', () => {
  it('Validate user is able to change app settings ', async () => {
    await HomePage.openAppSettings(); // Open app settings
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await SettingsPage.clickOnAllSettingsToggleIcons(); // Click on all settings toggle switch
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await SettingsPage.goBackToHomePage(); // Go back to home page
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await HomePage.isDisplayed(); // Validate home page displayed
  });
});
