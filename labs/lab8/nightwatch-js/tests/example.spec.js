module.exports = {
  '@tags': ['zeroBank'],

  before: async function (browser) {
    // Відкриваємо браузер і сторінку перед усіма тестами
    browser.url('http://zero.webappsecurity.com/');
  },

  after: async function (browser) {
    // Закриваємо браузер після всіх тестів
    await browser.end();
  },

  'Login with wrong credentials shows error': function (browser) {
    browser
      .url('http://zero.webappsecurity.com/')
      .waitForElementVisible('body', 5000)
      .click('#signin_button')
      .waitForElementVisible('#user_login', 5000)
      .setValue('#user_login', 'wronguser')
      .setValue('#user_password', 'wrongpass')
      .click('input[name="submit"]')
      .waitForElementVisible('.alert-error', 5000)
      .getText('.alert-error', function(result) {
        this.assert.match(result.value, /Login and\/or password are wrong/i);
      });
  },

  'Transfer Funds is visible after clicking Online Banking': function (browser) {
    browser
      .url('http://zero.webappsecurity.com/')
      .waitForElementVisible('#onlineBankingMenu', 5000)
      .click('#onlineBankingMenu')
      .waitForElementVisible('#transfer_funds_link', 5000)
      .getText('#transfer_funds_link', function(result) {
        this.assert.match(result.value, /Transfer Funds/i);
      });
  },

  'Feedback form sends data successfully': function (browser) {
    browser
      .url('http://zero.webappsecurity.com/feedback.html')
      .waitForElementVisible('#name', 5000)
      .setValue('#name', 'Tanya')
      .setValue('#email', 'tanya@example.com')
      .setValue('#subject', 'Subject Test')
      .setValue('#comment', 'This is a message!')
      .click('input[type="submit"]')
      .waitForElementVisible('div.container h3', 5000)
      .getText('div.container h3', function(result) {
        this.assert.match(result.value, /Feedback/i);
      });
  }
};
