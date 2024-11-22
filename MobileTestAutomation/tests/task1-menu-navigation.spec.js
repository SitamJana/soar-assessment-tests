const HomePage = require('../pages/home.page');
const WaitHelper = require('../helper/wait.helper');

describe('Wikipedia App Tests - Task 1', () => {
  it('Validate all Menu Navigation', async () => {
    await HomePage.openMyListsMenu(); // Open My lists menu
    await WaitHelper.pause(3000); // Pause for 3 seconds
    await HomePage.openHistoryMenu(); // Open History menu
    await WaitHelper.pause(3000); // Pause for 3 seconds
    await HomePage.openNearByMenu(); // Open Near By menu
    await WaitHelper.pause(3000); // Pause for 3 seconds
    await HomePage.openExploreMenu(); // Open Explore menu
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await HomePage.isDisplayed(); // Validate home page displayed
  });
});
