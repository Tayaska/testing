const puppeteer = require('puppeteer');

describe('Zero Bank UI Tests - Puppeteer', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true,  args: ['--disable-features=HttpsFirstBalancedModeAutoEnable'] });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Login with wrong credentials shows error', async () => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('#signin_button');
    await page.type('#user_login', 'wronguser');
    await page.type('#user_password', 'wrongpass');
    await page.click('input[name="submit"]');

    // Чекаємо, поки з’явиться повідомлення про помилку
    await page.waitForSelector('.alert-error');
    const errorText = await page.$eval('.alert-error', el => el.textContent.trim());
    expect(errorText).toMatch(/Login and\/or password are wrong/i);
  });

  test('Transfer Funds is visible after clicking Online Banking', async () => {
    await page.goto('http://zero.webappsecurity.com/');
  
    // Натискаємо на "Online Banking"
    await page.waitForSelector('#onlineBankingMenu');
    await page.click('#onlineBankingMenu');
  
    // Перевіряємо, що з'явилось посилання "Transfer Funds"
    await page.waitForSelector('#transfer_funds_link');
    const transferText = await page.$eval('#transfer_funds_link', el => el.textContent.trim());
    expect(transferText).toMatch(/Transfer Funds/i);
  });
  

  test('Feedback form sends data successfully', async () => {
    await page.goto('http://zero.webappsecurity.com/feedback.html');
    await page.type('#name', 'Tanya');
    await page.type('#email', 'tanya@example.com');
    await page.type('#subject', 'Subject Test');
    await page.type('#comment', 'This is a message!');
    await page.click('input[type="submit"]');

    // Перевіряємо, що з’явився заголовок або повідомлення після сабміту
    await page.waitForSelector('div.container h3');
    const thankYouText = await page.$eval('div.container h3', el => el.textContent.trim());
    expect(thankYouText).toMatch(/Feedback/i);
  });
});

