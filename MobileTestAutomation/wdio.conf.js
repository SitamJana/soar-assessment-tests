exports.config = {
    runner: 'local',
    port: 4723, // Default Appium server port
    specs: ['./tests/**/*.spec.js'], // Path to spec files
    maxInstances: 1, // One instance to avoid conflicts in Appium
    
    capabilities: [
      {
        platformName            : 'Android',
        'appium:automationName' : 'UiAutomator2',
        'appium:deviceName'     : 'Android',
        'appium:appPackage'     : 'org.wikipedia.alpha',
        'appium:appActivity'    : 'org.wikipedia.main.MainActivity',
        'appium:app'            : 'apk/WikipediaSample.apk'
      },
    ],
  
    logLevel: 'info', // Log verbosity
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000, // Timeout for tests
    },

    reporters: [['allure', {
      outputDir: 'reports',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }]],
  
  
  };
  