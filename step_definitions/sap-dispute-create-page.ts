
import { expect } from 'chai';
import { PlaywrightWrapper } from '../utils/wrapper';
import { selector } from './selectors';
import { Then, When } from '@cucumber/cucumber';



const getWrapper = (world: any) => new PlaywrightWrapper(world.page, world.context);

When('the user clicks on the Create button to initiate a new dispute case', async function () {
    const wrapper = getWrapper(this);
    await wrapper.click(selector.createButton);
});

When('the user selects Customer ID {string} in the pop-up', async function (customerId: string) {
    const wrapper = getWrapper(this);
    await wrapper.fillAndEnter(selector.customerIdInput, customerId);
    
});



When('the user clicks on the Create button', async function () {
    const wrapper = getWrapper(this);
    await wrapper.click(selector.createConfirmButton);
});

When('the user enters Case Title {string}', async function (caseTitle: string) {
    const wrapper = getWrapper(this);
    await wrapper.type(selector.caseTitleInput, caseTitle);
});

When('the user selects Category {string}', async function (categoryCode: string) {
    const wrapper = getWrapper(this);
    await wrapper.fillAndEnter(selector.categoryInput, categoryCode);
});

When('the user sets Priority {string}', async function (priority: string) {
    const wrapper = getWrapper(this);
    await wrapper.fillAndEnter(selector.priorityInput, priority);
});

When('the user selects Reason {string}', async function (reasonCode: string) {
    const wrapper = getWrapper(this);
    await wrapper.fillAndEnter(selector.reasonInput, reasonCode);
});

When('the user enters Root Cause {string}', async function (rootCauseCode: string) {
    const wrapper = getWrapper(this);
    await wrapper.fillAndEnter(selector.rootCauseInput, rootCauseCode);
});

When('the user clicks on Create button', async function () {
    const wrapper = getWrapper(this);
    await wrapper.click(selector.caseCreateButton);
});

Then(`the dispute case should be created successfully`,async function()
{
    const wrapper=getWrapper(this);
    const text=await wrapper.getText(selector.toastSelector)
    expect(text,"The Dispute Case is  created successfully.").to.be.a("string").to.include("Dispute case was created.")
})
