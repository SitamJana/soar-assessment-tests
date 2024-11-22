## Performance Testing Flask APP APIs with Artillery
This project uses Artillery, a modern performance testing tool, to evaluate the performance and reliability of API endpoints. The project includes load testing, stress testing, and BDD-based load testing for API endpoints like /client_register and /client_login. It is designed for integration with CI/CD pipelines and generates detailed test reports.

### Features
* **Load Testing:** Simulates normal user load for /client_register API endpoint.
* **Stress Testing:** Evaluates the behavior of /client_login under extreme load.
* **BDD Load Testing:** Executes BDD-style scenarios for /client_register and /client_login with randomized input data at each iteration.
* **CI/CD Integration:** Configured to fit into automated regression testing pipelines.
* **Reports:** Generates detailed performance test reports.

### Prerequisites
1. **Node.js:** Install Node.js (v14 or higher).
2. **Artillery:** Install Artillery globally using npm:
   ```bash
   npm install -g artillery
   ```
3. **Git:** Ensure Git is installed for repository management

### Project Structure
```
performance-testing/
├── ci-cd/
│   ├── github-actions-workflow.yml                # Github Actions workflow file
├── tests/
│   ├── load_test_client_register.yml              # Load testing script for /client_register
│   ├── stress_test_client_login.yml               # Stress testing script for /client_login
│   ├── bdd_load_test_register_and_login.yml       # BDD-based load testing for both endpoints
├── report/                                        # Test reports
├── package.json                                   # Project dependencies and scripts
├── README.md                                      # Project documentation
```

### Usage
#### 1. Run Load Testing for /client_register
Execute the load testing scenario to simulate normal traffic:

```bash
npm run load-test:register
```

#### 2. Run Stress Testing for /client_login
Execute stress testing to evaluate API behavior under extreme load:

```bash
npm run stress-test:login
```

#### 3. Run BDD-Based Load Testing
Perform BDD-style load testing for /client_register and /client_login:

```bash
npm run bdd-load-tests
```

### Reports
1. Results will be saved to `report` folder post the test run.
2. Cloud test sample run report can be found under `cloud-test-report-details.txt` file.

### Apptim - Wikipedia App Performance Report
Apptim - Wikipedia App Performance Report can be found under `Apptim - Wikipedia App Performance Tests.pdf` document.