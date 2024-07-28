module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-translate',
          '--disable-extensions',
          '--remote-debugging-port=9222',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
        ],
      },
    },
    singleRun: true,
  });
};
