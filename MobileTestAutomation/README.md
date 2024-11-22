## Appium JavaScript Project for Wikipedia App Testing

### Project Overview

This project is designed to automate testing for the Wikipedia Android app using Appium and JavaScript. It leverages the WebdriverIO framework to interact with the app and execute test cases.

### Project Structure:
```
apk
├── WikipediaSample.apk
helper
├── wait.helper.js
pages
├── base.page.js
├── home.page.js
├── search.page.js
├── settings.page.js
reports
tests
├── task1-menu-navigation.spec.js
├── task2-search-functionality.spec.js
├── task3-app-settings.spec.js
package-lock.json
package.json
wdio.conf.js
```

### How to Run:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/SitamJana/soar-assessment-tests/MobileTestAutomation.git
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Appium:**
   * Set up Appium Server and ensure your Android device is connected and configured.
   * Update the `wdio.conf.js` file with your device and app details.

   ```bash
   appium driver install uiautomator2
   appium
   ```

4. **Run Tests:**
   ```bash
   npm test
   ```

5. **See test reports:**
   ```bash
   npm run report
   ```

### To contribute to this project:
* Fork the repository.
* Create a new branch for your feature or bug fix.
* Make your changes and commit them.   
* Push your changes to your forked repository.
* Create a pull request to merge your changes into the main branch.

### License:
This project is licensed under the MIT License.