# Test info

- Name: Check Post Pay
- Location: C:\Users\lenovo\Downloads\SAP-AUTOMATION-CUCMBER\features\tc001.spec.ts:4:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//bdi[text()="Account Type/Account ID"]//following::span[text()="Customer"]')
    - locator resolved to <span class="sapMSelectListItemText" id="application-Customer-postPayment-component---S1--fin.ar.payment.post.accountType-labelText">Customer</span>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

    at C:\Users\lenovo\Downloads\SAP-AUTOMATION-CUCMBER\features\tc001.spec.ts:39:101
```

# Test source

```ts
   1 |
   2 | import { test, expect } from "@playwright/test";
   3 |
   4 | test("Check Post Pay", async ({ page }) => {
   5 |   // 1. Launch browser and navigate to SAP SSO login page
   6 |   await page.goto("https://my426318.s4hana.cloud.sap/ui?sap-language=EN&help-mixedLanguages=false&help-autoStartTour=PR_28A0E50CC77DAF91#Customer-postPayment");
   7 |
   8 |   // 2. Enter the username
   9 |   await page.locator('input[placeholder="Email, User ID or Login Name"]').fill("hari.radhakrishnan@qeagle.com");
  10 |
  11 |   // 3. Click on "Continue"
  12 |   await page.getByRole('button', { name: /continue/i }).click();
  13 |
  14 |   // 4. Enter the password
  15 |   await page.getByPlaceholder('Password').fill("Tuna@321");
  16 |
  17 |   // 5. Click on "Continue"
  18 |   await page.locator(`//div[text()="Continue"]`).click();
  19 |
  20 |   // 6. Wait for Home page and click "Post Incoming Payments"  
  21 |  // await page.locator(`//a[contains(@aria-label,"Post Incoming Payments")]`).click(); 
  22 |   //  await page.waitForSelector(`//input[contains(@id,'post.docDateInput-datePicker-inner')]`);
  23 |   await page.locator(`//input[contains(@id,'post.docDateInput-datePicker-inner')]`).fill("2025-09-02");
  24 |   await page.locator(`//input[contains(@id,"post.fiscalPeriod-input-inner")]`).fill("09");
  25 |     await page.locator(`//input[contains(@id,"fin.ar.payment.post.referenceInput-input-inner")]`).fill("0090285807")
  26 |   await page.locator(`//input[contains(@id,"post.gLAccount-input-inner")]`).click();
  27 |   await page.locator('(//bdi[text()="Petty Cash"])[1]').click();
  28 |   await page.locator(`//span[contains(@id,'post.amountInTransCrcyInput-sfEdit-input-vhi')]`).click();
  29 |   await page.locator(`(//input[@aria-label="Search"])[1]`).fill("INR");
  30 |   await page.locator(`//div[contains(@id,"post.amountInTransCrcyInput-sfEdit-input-valueHelpDialog-smartFilterBar-btnBasicSearch-search")]`).click();
  31 |   await page.locator(`//span[text()="Indian Rupee"]`).click();
  32 |   await page.locator(` //input[contains(@id,"post.amountInTransCrcyInput-input-inner")]`).fill("500");
  33 |   await page.locator(`//bdi[text()="Post"]`).click();
  34 |
  35 |   const errorMsg = await page.locator(`//div[@class="sapMSLITitleOnly"]`).textContent();
  36 |   expect(errorMsg).toContain("Posting is only possible with a zero balance; correct document");
  37 |   await page.locator(`//bdi[text()="OK"]`).click();
  38 |
> 39 |   await page.locator(`//bdi[text()="Account Type/Account ID"]//following::span[text()="Customer"]`).click();
     |                                                                                                     ^ Error: locator.click: Target page, context or browser has been closed
  40 |   await page.locator(`//li[contains(@id,"post.AccountType.Customer")]`).click();
  41 |   await page.locator(`//span[contains(@id,'post.customerAccountInput-input-vhi')]`).click();
  42 |   await page.waitForSelector('text=Select: Customer', { timeout: 30000 });
  43 |   await page.locator('text=SILVERSTAR').first().click();
  44 |   await page.locator(`(//bdi[text()="Propose Items"])[1]`).click();
  45 |
  46 |   await page.waitForSelector(`(//span[contains(@id,'amountText')])`);
  47 |   const columnValues = await page.locator(`(//span[contains(@id,'amountText')])`).all();
  48 |   const count = columnValues.length;
  49 |
  50 |   let amountToUse: number | null = null;
  51 |
  52 |   for (let index = 0; index < count; index++) {
  53 |     await page.waitForTimeout(1000);
  54 |     const elementText = await columnValues[index].innerText();
  55 |
  56 |     if (elementText === null) {
  57 |       break;
  58 |     }
  59 |
  60 |     const cleanText = elementText.replace(/[^\d.-]/g, "").trim();
  61 |     const cleanValue = Number(cleanText);
  62 |
  63 |     if (!isNaN(cleanValue) && cleanValue > 1000) {
  64 |       amountToUse = cleanValue;  
  65 |       await page.locator(`(//tr[.//span[text()='${elementText}']]//button)[1]`).click();  
  66 |       console.log(amountToUse);
  67 |       await page.locator(` //input[contains(@id,"post.amountInTransCrcyInput-input-inner")]`).fill(amountToUse?.toString() || "NULL");
  68 |       await page.locator(`//bdi[text()="Post"]`).click();
  69 |
  70 |       const successMsg = await page.locator('//span[contains(text(),"Success")]').textContent();
  71 |       expect(successMsg).toContain("Success");
  72 |       break;
  73 |     } else if (cleanValue < 0) {
  74 |       console.log(`negative value: ${cleanValue}`);
  75 |     }
  76 |   }
  77 | });
  78 |
```