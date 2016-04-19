module.exports = {
  beforeEach: function(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000);
  },
  'Smoke test': function(browser) {
    browser.expect.element('body > img').to.be.visible;
    browser.expect.element('body > img').to.have.attribute('src')
      .which.contains('assets');
  },
  after: function(browser) { browser.end(); },
};
