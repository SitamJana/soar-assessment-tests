const HomePage = require('../pages/home.page');
const SearchPage = require('../pages/search.page');
const WaitHelper = require('../helper/wait.helper');

describe('Wikipedia App Tests - Task 2', () => {
  it('Validate Search Functionality', async () => {
    await HomePage.clickOnSearchContainer(); // Click on search container
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await SearchPage.inputTextIntoSearchBox('New York'); // Enter search text
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await SearchPage.validateSearchResultsDisplayed(); // Validate search results displayed
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await SearchPage.clearSearchText(); // Clear search text
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await SearchPage.validateSearchResultsNotDisplayed(); // Validate search results not displayed
    await SearchPage.goBackToHomePage(); // Go back to home page
    await WaitHelper.pause(2000); // Pause for 2 seconds
    await HomePage.isDisplayed(); // Validate home page displayed
  });
});
