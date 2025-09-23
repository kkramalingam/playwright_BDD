import { Page, Locator, BrowserContext } from '@playwright/test';
import { DEFAULT_TIMEOUT } from '../config/config';
import { createLogger } from './logger';
import { setTokenSourceMapRange } from 'typescript/lib/typescript';
const logger = createLogger('wrapper');

/**
 * Wrapper class for Playwright Page interactions
 */
export class PlaywrightWrapper {

  public page: Page;
  public context: BrowserContext

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }



  /**
   * Navigate to a URL
   * @param url - The URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'load', timeout: DEFAULT_TIMEOUT });
  }

  /**
   * Get page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    const title = await this.page.title();
    logger.info(`Page title: ${title}`);
    return title;
  }

  /**
     * Types into the specified textbox, clears existing text, and presses <ENTER>.
     * @param {string} locator - The locator for the textbox element.
     * @param {string} data - The data to be typed into the textbox.
     */
    async fillAndEnter(locator: string, data: string) {
        
            await this.page.locator(locator).clear();
            await this.page.locator(locator).pressSequentially(data,{delay:300})
            await this.page.focus(locator)
            await this.page.keyboard.press("Enter",{delay:200});

    }


      /**
    * Waits for a specific element to be attached to the DOM.
    * 
    * @param {string} locator - The locator for the element to wait for.
    * @param {string} name - A descriptive name for the element (not used in this function but could be useful for logging).
    */
    async waitSelector(locator: string) {
      
            await this.page.waitForSelector(locator, { timeout: 30000, state: "attached" });
       
    }

    async replaceUrl()
    {
       await this.page.waitForLoadState('networkidle');
  
  // Step 3: Get the current redirected URL
  let url1 = this.page.url();
  
  // Step 4: Strip autoStartTour if it exists
  url1 = url1.replace(/&?help-autoStartTour=[^&#]*/g, "");
  
  // Step 5: Navigate to cleaned URL
  await this.page.goto(url1);
  }

    async pressEnter()
    {
      await this.page.keyboard.press("Enter")
    }

  /**
   * Get the current URL
   * @returns The current URL
   */
  async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    logger.info(`Current URL: ${url}`);
    return url;
  }

  /**
   * Click on an element
   * @param selector - The element selector
   */
  async click(selector: string): Promise<void> {
    logger.info(`Clicking on: ${selector}`);
    await this.page.click(selector, { timeout: DEFAULT_TIMEOUT });
  }

  /**
   * Double click on an element
   * @param selector - The element selector
   */
  async doubleClick(selector: string): Promise<void> {
    logger.info(`Double clicking on: ${selector}`);
    await this.page.dblclick(selector, { timeout: DEFAULT_TIMEOUT });
  }

  /**
   * Fill an input element
   * @param selector - The input element selector
   * @param value - The value to fill
   */
  async fill(selector: string, value: string): Promise<void> {
    logger.info(`Filling ${selector} with value: ${value}`);
    await this.page.locator(selector).clear();
    await this.page.fill(selector, value, { timeout: DEFAULT_TIMEOUT });
  }


   /**
   * Fills an element but wit sequential typing 
   * @param selector - The input element selector
   * @param data - The value to fill
   */
  async typeSequential(selector:string,data:string)
  {
    logger.info(`Typing sequentially the ${selector} with value ${data}`)
    await this.page.locator(selector).clear();
    await this.page.locator(selector).pressSequentially(data,{delay:300});
  }

  /**
   * Check if an element is visible
   * @param selector - The element selector
   * @returns True if the element is visible, false otherwise
   */
  async isVisible(selector: string): Promise<boolean> {
    logger.info(`Checking if ${selector} is visible`);
    const element = this.page.locator(selector);
    return await element.isVisible({ timeout: DEFAULT_TIMEOUT });
  }

 async tabAndEnter()
 {
  logger.info(`Pressing the Tab and then the Enter`)
    await this.page.keyboard.press("Tab")
    await this.page.keyboard.press("Enter");
 }

   /**
    * Waits for a specified duration based on the wait type provided.
    * 
    * @param {'minWait' | 'mediumWait' | 'maxWait'} waitType - The type of wait duration ('minWait', 'mediumWait', or 'maxWait').
    */
    async wait(waitType: 'minWait' | 'mediumWait' | 'maxWait') {
        try {
            switch (waitType) {
                case 'minWait':
                    await this.page.waitForTimeout(3000);
                    break;
                case 'mediumWait':
                    await this.page.waitForTimeout(5000);
                    break;
                case 'maxWait':
                    await this.page.waitForTimeout(10000);
                    break;
                default:
                    console.log("Invalid wait type provided.");
                    throw new Error(`Invalid wait type: ${waitType}`);
            }
        } catch (error) {
            console.error("Error during wait:", error);
        }
    }


    
   


  /**
   * Wait for an element to be visible
   * @param selector - The element selector
   * @param timeout - The timeout in milliseconds (optional)
   */
  async waitForVisible(selector: string, timeout = DEFAULT_TIMEOUT): Promise<void> {
    logger.info(`Waiting for ${selector} to be visible`);
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Types into the specified textbox after clearing any existing text.
   * 
   * @param {string} locator - The locator for the textbox element.
   * @param {string} name - The name of the textbox element.
   * @param {string} data - The data to be typed into the textbox.
   */
    async type(locator: string, data: string) {
              await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);

     
    }
  

  /**
   * Wait for an element to be hidden
   * @param selector - The element selector
   * @param timeout - The timeout in milliseconds (optional)
   */
  async waitForHidden(selector: string, timeout = DEFAULT_TIMEOUT): Promise<void> {
    logger.info(`Waiting for ${selector} to be hidden`);
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Wait for the first element matching selector to be hidden
   * Useful when multiple elements match and you want the first instance to disappear
   * @param selector - The element selector
   * @param timeout - The timeout in milliseconds (optional)
   */
  async waitForFirstHidden(selector: string, timeout = DEFAULT_TIMEOUT): Promise<void> {
    logger.info(`Waiting for first matching ${selector} to be hidden`);
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Get text from an element
   * @param selector - The element selector
   * @returns The element text
   */
  async getText(selector: string): Promise<string> {
    logger.info(`Getting text from: ${selector}`);
    const text = await this.page.locator(selector).innerText({ timeout: DEFAULT_TIMEOUT });
    logger.info(`Text content: ${text}`);
    return text;
  }

  /**
   * Get all text values from elements matching a selector
   * @param selector - The element selector
   * @returns Array of text values
   */
  async getAllTexts(selector: string): Promise<string[]> {
    logger.info(`Getting all texts from: ${selector}`);
    const elements = this.page.locator(selector);
    const count = await elements.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).innerText();
      texts.push(text);
    }

    logger.info(`Found ${texts.length} texts`);
    return texts;
  }

  /**
   * Select an option from a dropdown by value
   * @param selector - The dropdown selector
   * @param value - The value to select
   */
  async selectByValue(selector: string, value: string): Promise<void> {
    logger.info(`Selecting value ${value} from dropdown ${selector}`);
    await this.page.selectOption(selector, { value });
  }

  /**
   * Select an option from a dropdown by label
   * @param selector - The dropdown selector
   * @param label - The label to select
   */
  async selectByLabel(selector: string, label: string): Promise<void> {
    logger.info(`Selecting label ${label} from dropdown ${selector}`);
    await this.page.selectOption(selector, { label });
  }

  /**
   * Switch to a tab by index
   * @param index - The tab index
   */
  async switchToTab(index: number): Promise<void> {
    logger.info(`Switching to tab index: ${index}`);
    const pages = this.page.context().pages();

    if (index >= pages.length) {
      throw new Error(`Tab index out of bounds: ${index}, total tabs: ${pages.length}`);
    }

    this.page = pages[index];
    await this.page.bringToFront();
  }

  /**
   * Take a screenshot
   * @param path - The file path to save the screenshot
   */
  async takeScreenshot(path: string): Promise<void> {
    logger.info(`Taking screenshot: ${path}`);
    await this.page.screenshot({ path, fullPage: true });
  }

  /**
   * Execute JavaScript in the page context
   * @param script - The JavaScript code to execute
   * @param args - Arguments to pass to the script
   * @returns The result of script execution
   */
  async executeScript<T>(script: string, ...args: any[]): Promise<T> {
    logger.info('Executing JavaScript');
    return await this.page.evaluate(script, ...args);
  }

  /**
   * Refresh the current page
   */
  async refresh(): Promise<void> {
    logger.info('Refreshing page');
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    logger.info('Going back in browser history');
    await this.page.goBack({ waitUntil: 'networkidle' });
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    logger.info('Going forward in browser history');
    await this.page.goForward({ waitUntil: 'networkidle' });
  }

  async keyBoardpress(selector: string, key: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.locator(selector).focus()
    await this.page.keyboard.press(key);
  }
}