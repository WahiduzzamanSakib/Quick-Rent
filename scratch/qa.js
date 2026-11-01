const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true});
  const page = await browser.newPage();
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
    await page.goto(url, {waitUntil: 'networkidle0'});
    results.push({route: r, errors});
    page.removeListener('console', consoleListener);
    page.removeAllListeners('pageerror');
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
