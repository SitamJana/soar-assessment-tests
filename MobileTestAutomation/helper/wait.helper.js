class WaitHelper {
    // Pause execution for few seconds
    async pause(milliseconds = 2000) {
        await driver.pause(milliseconds);
    }
  }
  
  module.exports = new WaitHelper();
  