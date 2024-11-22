## OWASP Juice Shop Test Automation

### Overview
This repository houses the automated test suite for the OWASP Juice Shop website, constructed using the Playwright framework. It leverages the Page Object Model (POM) pattern for enhanced test maintainability, generates HTML reports for comprehensive test results, and utilizes Winston for robust logging.

### Key Features

* **Playwright:** Drives browser automation for reliable and cross-platform testing.
* **Page Object Model:** Separates page logic from test cases for improved code organization.
* **HTML Reporting:** Generates detailed test reports for analysis and debugging.
* **Winston Logging:** Provides granular control over test execution logging.

### Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/SitamJana/soar-assessment-tests/WebTestAutomation.git
   ```
2. **Install dependencies:**
   ```bash
   cd WebTestAutomation
   npm init playwright@latest
   npm install
   ```
3. **Run tests:**
   ```bash
   npm test
   ```
Test runs by default in Parallel mode. Test results will be generated in the `playwright-report` directory.

4. **View test reports:**
   ```bash
   npm run report
   ```

### Project Structure
```
WebTestAutomation/
├── playwright.config.js
├── page-objects/
│   ├── basket-page.js
│   ├── common-page.js
│   ├── login-page.js
│   ├── product-list-page.js
│   ├── registration-page.js
├── tests/
│   ├── task1-display-all-products.spec.js
│   ├── task2-see-product-reviews.spec.js
│   ├── task3-registration-and-login.spec.js
│   ├── task4-place-order.spec.js
├── helpers/
│   ├── log-helper.js
│   ├── utility-helper.js
├── playwright-report/
├── logs/
├── package.json
└── README.md
```

### Usage
* **Page Objects:** Encapsulate page elements and interactions.
* **Test Cases:** Write tests using the Page Objects, focusing on test logic.
* **Configuration:** Customize test behavior through configuration file (Playwright).
* **Reporting:** Generate HTML reports for detailed test results.
* **Logging:** Use Winston for comprehensive logging of test execution.

### Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes with clear commit messages.
4. Push your branch to your fork.
5. Create a pull request.

### License
This project is licensed under the MIT License.
