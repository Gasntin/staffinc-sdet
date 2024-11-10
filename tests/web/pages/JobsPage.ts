import { expect, Page } from "@playwright/test";

class JobsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string){
    await this.page.goto(url);
  }

  async validatePage(): Promise<void>{
    const label = 'Lihat Semua Pekerjaan';
    const workPreferenceLocator = this.page.getByText(label);
    await expect(workPreferenceLocator).toBeEnabled();
    await expect(workPreferenceLocator).toBeVisible();
  }

  async openLocationAllJobsPage(){
    const workPreferenceLocator = this.page.getByText("Lihat Semua Pekerjaan");
    expect(workPreferenceLocator).toBeEnabled();
    await workPreferenceLocator.click();

    const filterWorkPreferenceLocator = this.page.getByText("Filter");
    expect(filterWorkPreferenceLocator).toBeEnabled();
    await filterWorkPreferenceLocator.click();

    const workLocationLocator = this.page.getByText("Lokasi Pekerjaan");
    expect(workLocationLocator).toBeEnabled();
    await workLocationLocator.click();
  }

  async selectProvince(province: string): Promise<void>{
    const provinceLocator = this.page.getByText("Cari Provinsi");
    expect(provinceLocator).toBeEnabled();
    await provinceLocator.click({ force: true });

    await this.page.getByPlaceholder("Cari Provinsi...").fill(province);
    await this.page.getByText(province).click();
  }

  async selectCity(city: string): Promise<void>{
    const comboboxCity = this.page.locator('[role="combobox"][id="city_ids"]');
    await this.page.locator('[role="combobox"][id="city_ids"]').evaluate((el) => {
      el.removeAttribute("readonly");
      el.removeAttribute("disabled");
    });
    await comboboxCity.click({ force: true });

    await this.page.getByPlaceholder("Cari kota...").waitFor({ state: "visible" });
    await this.page.getByPlaceholder("Cari kota...").fill(city);

    const checkboxCity = this.page.getByLabel(city);
    await expect(checkboxCity).toBeVisible();
    await checkboxCity.click();
    await checkboxCity.check();
  }

  async applyFilter(): Promise<void>{
    await this.page.getByRole("button", { name: "Simpan" }).first().click();
    await this.page.getByRole("button", { name: "Simpan" }).click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyJobCardsContainCityName(page: Page, cityName: String):Promise<void> {
    const jobCardTexts: string[] = await page.$$eval(
      '//*[@data-testid="testid-molecule-job-card-location-icon"]/parent::*[@class="ant-space-item"]/following-sibling::*[@class="ant-space-item"]',
      (elements) => elements.map((element) => element.textContent || "")
    );

    for (const text of jobCardTexts) {
      expect(text).toEqual(cityName);
    }
  }

  async getAllJobLocationText():Promise <string[]>{
    const jobLocations: string[] = await this.page.$$eval(
      '//*[@data-testid="testid-molecule-job-card-location-icon"]/parent::*[@class="ant-space-item"]/following-sibling::*[@class="ant-space-item"]',
      (elements) => elements.map((element) => element.textContent || "")
    );

    return jobLocations;
  }
}

export default JobsPage;