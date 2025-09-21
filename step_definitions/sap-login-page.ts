import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/custom-world';
import { PlaywrightWrapper } from '../utils/wrapper';
import { expect } from 'chai';
import dotenv from "dotenv"


dotenv.config({path:"./data/login.env"});

const username=process.env.SAP_USERNAME || "hari.radhakrishnan@qeagle.com";
const password=process.env.SAP_PASSWORD || "Tuna@321";

const getWrapper = (world: any) => new PlaywrightWrapper(world.page, world.context);

Given('the user navigates to the SAP URL', async function () {
  const wrapper = getWrapper(this);
  const url = process.env.SAP_URL || '';
  if (!url) throw new Error('SAP_URL not provided in environment');
  await wrapper.navigateTo(url);
});

When('the user enters a valid username and password', async function () {
  const wrapper = getWrapper(this);
    await wrapper.fill('//input[@placeholder="Email, User ID or Login Name"]',username );
    await wrapper.click(`//div[@class="fn-button__text"]`);
    await wrapper.fill(`//input[@id='j_password']`, password);
    await wrapper.click(`//div[text()='Continue']`);
});


When('the user click on the Finance Tab', async function () {
  const wrapper = getWrapper(this);
  await wrapper.click(`//div[contains(@id,'header')]/span[text()='Finance']`);
});


