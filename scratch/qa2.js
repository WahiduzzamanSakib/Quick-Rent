const puppeteer = require('puppeteer-core');
(async () => {
  const chromePath = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
  const browser = await puppeteer.launch({executablePath: chromePath, headless: true});
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  const routes = ['/', '/about', '/properties', '/login', '/register'];
  const base = 'http://localhost:3000';
  const results = [];
  for (const r of routes) {
    const url = base + r;
    const errors = [];
    const consoleListener = msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    };
    page.on('console', consoleListener);
    page.on('pageerror', err => errors.push(err.message));
    try {
      await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 0});
    } catch (e) {
      errors.push('Navigation error: ' + e.message);
    }
    results.push({route: r, errors});
    page.off('console', consoleListener);
    page.removeAllListeners('pageerror');
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
