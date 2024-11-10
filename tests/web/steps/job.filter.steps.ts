import { expect, chromium, Page, Browser } from '@playwright/test';
import JobsPage from '../pages/JobsPage';
import { Given, When, Then} from '@cucumber/cucumber'

let jobPage: JobsPage;
let browser: Browser;
let page: Page;

Given('User on the jobs page with the URL {string}', async function ( url: string) {
    browser = await chromium.launch({headless: false});
    page = await browser.newPage()
    jobPage = new JobsPage(page);
    await jobPage.open(url);
    await jobPage.validatePage();
  });

Given('User open all location jobs page', async function () {
  await jobPage.openLocationAllJobsPage();
});

When('User selects {string} as province and {string} as city',  async ( province: string, city: string) => {
  await jobPage.selectProvince(province);
  await jobPage.selectCity(city);
});

When('User applies the filter', async function () {
  await jobPage.applyFilter();
});

Then('User should see job listings for {string} only', async function (location: string) {
  const jobLocations = await jobPage.getAllJobLocationText();
  jobLocations.forEach(title => {
      expect(title).toContain(location);
  });

  page.close()
});