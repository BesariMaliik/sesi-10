import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';


describe("SauceDemo Automation Test", function () {
  let driver;

   before(async () => {
    let options = new chrome.Options();
        options.addArguments("--incognito");
        
        driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options).build();
  });

    after(async () => {
    await driver.quit();
  });


  // TEST CASE 1 - LOGIN

  it("TC01 - Login berhasil menggunakan user valid", async () => {
            
    await driver.get("https://www.saucedemo.com/");

    let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
       await inputUsername.sendKeys('standard_user');

     let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
      await inputPassword.sendKeys('secret_sauce');

     let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
      await buttonLogin.click();

    
      await driver.wait(until.urlContains("inventory.html"), 10000);

    const title = await driver
      .findElement(By.className("title"))
      .getText()

      expect(title).to.equal("Products");
      
  });

  // TEST CASE 2 - SORT Z → A

  it("TC02 - Mengurutkan produk dari Z ke A", async () => {
    const sortDropdown = await driver.findElement(
      By.className("product_sort_container"));
      await sortDropdown.sendKeys("Name (Z to A)");

    const productElements = await driver.findElements(
      By.className("inventory_item_name")
    );

    const productNames = [];
    for (let el of productElements) {
      productNames.push(await el.getText());
    }

    const expectedSorted = [...productNames].sort().reverse();

    expect(productNames).to.deep.equal(expectedSorted);

  });

  // TEST CASE 3 - Low ke High
  
  it("TC03 - Mengurutkan produk berdasarkan harga Low ke High", async () => {
 
    const sortDropdown = await driver.findElement(
       By.className("product_sort_container")
      );
      await sortDropdown.sendKeys("Price (low to high)");

    const priceElements = await driver.findElements(
      By.className("inventory_item_price")
    );

    const prices = [];
    for (let price of priceElements) {
      prices.push(parseFloat((await price.getText()).replace("$", "")));
    }

    const expectedSortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).to.deep.equal(expectedSortedPrices);
   
  });
  
});
