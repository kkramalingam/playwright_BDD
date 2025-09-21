import { expect } from 'chai';
import { PlaywrightWrapper } from '../utils/wrapper';
import { selector } from './selectors';
import { Then, When } from '@cucumber/cucumber';
import { wrap } from 'module';




const getWrapper = (world: any): PlaywrightWrapper =>
  new PlaywrightWrapper(world.page, world.context);

  let CASE_ID:string;
  let Closed_CASE_ID:string;
   //async searchByCustomerAndCompany
     When('the user enters Customer ID {string} and Company Code {string}', async function(customerKey: string, companyCode: string) {
        const wrapper =getWrapper(this);

        await wrapper.fill(selector.customerKeyInput, customerKey);
        await wrapper.fillAndEnter(selector.companyCodeInput, companyCode);
        await wrapper.click(selector.goButton);
        await wrapper.wait('minWait');
    })

    //async clickOnFirstDisputeCase()
     When('the user searches and selects the dispute case from the results list',async function(){
         const wrapper=getWrapper(this)
         await wrapper.click(selector.navigationIcon);
    })

    //async clickOnEdit()
     When('the user clicks on Edit in the case overview page',async function(){
         const wrapper =getWrapper(this)
         await wrapper.click(selector.editButton);
    })
    

    //async closeCase() {
     When('the user changes the status of the dispute case to Closed', async function () {
        const wrapper = getWrapper(this);
        // open status dropdown using wrapper
        await wrapper.click(selector.caseStatusDropdown);
        await wrapper.click(selector.closedStatus);
        
        // wait for busy indicator to disappear
        await wrapper.waitForFirstHidden(selector.busyIndicator);
        const text = await wrapper.getText(selector.CaseIdDetails);
        await wrapper.waitForHidden(selector.ToastMsg);
        Closed_CASE_ID=text;
    })

      When('the user clicks on the Save button', async function () {
        const wrapper = getWrapper(this);

        await wrapper.click(selector.saveButton);
        // wait for busy indicator to disappear
        await wrapper.wait('mediumWait')
    })
       

    //async searchDisputeCaseById
    When(``,async function(caseId: string, customerId: string) {
        const wrapper=getWrapper(this)
        await wrapper.fillAndEnter(selector.caseIdInput,caseId);
        await wrapper.fillAndEnter(selector.customerKeyInput, customerId);
        await wrapper.click(selector.goButton);
    })

    //async editDisputeCaseDetails
    When(``,async function(reasonText: string, categoryText: string, rootCauseText: string) {
        const wrapper=getWrapper(this)

        await wrapper.click(selector.caseReasonDropdown);
        await wrapper.click(selector.caseReasonOption(reasonText));
        await wrapper.click(selector.caseCategoryDropdown);
        await wrapper.click(selector.caseCategoryOption(categoryText));
        await wrapper.click(selector.disputeRootCauseDropdown);
        await wrapper.click(selector.rootCauseOption(rootCauseText));
    }
)
    //async openDisputeCase
    When(``,async function(caseId: string) {
        const wrapper=getWrapper(this)
        await wrapper.click(selector.disputeRow(caseId));
    })

    //async verifyEdit() 
    When(``, async function () {
        const wrapper = getWrapper(this);

        // Use wrapper to read text instead of directly using this.page.locator
        const customerText = await wrapper.getText(selector.customerLinkSpan);
        expect(customerText, 'Expected customer link span to contain text').to.be.a('string').and.not.equal('');

        await wrapper.click(selector.saveButton);
        // brief wait for toast to appear (uses existing wrapper wait helper)
        await wrapper.wait('minWait');

        const toastText = await wrapper.getText(selector.toastSelector);
        expect(toastText, `Save toast did not appear as expected. Actual text: "${toastText}"`).to.be.a('string').and.include('Your changes have been saved.');
    })
    

     When('the user navigates back to Manage Dispute Cases',async function()  {
        const wrapper = getWrapper(this);
        // wait for busy indicator to hide
        await wrapper.waitForFirstHidden(selector.busyIndicator);
        await wrapper.wait('minWait');
        await wrapper.click(selector.navigationMenu);
        await wrapper.click(selector.manageDisputeCasesTitle);
        await wrapper.click(selector.allDisputeCases);
        await wrapper.click(selector.openDisputeCases);
        await wrapper.wait('minWait');
    })

    Then('the dispute case should appear under the Closed section',async function () {

        const wrapper = getWrapper(this);
        const count = await wrapper.page.locator(`//span[text()=${Closed_CASE_ID}]`).count();
        expect(count).to.equal(0);
    })

  When(`the user clicks on the Closed Dispute Cases tab`,async function () {
        const wrapper = getWrapper(this);
        await wrapper.click(selector.closedDisputeCases);
    }) 

   When(`the user clicks on the Reopen Dispute Case button`,async function () {
        const wrapper = getWrapper(this);
        await wrapper.click(selector.ReopenCaseButton);
    })

   When(`the user selects Re-open from the dropdown and clicks the Reopen button`,async function() {
        const wrapper = getWrapper(this);
        await wrapper.click(selector.ReopenDropdown);
        await wrapper.wait('minWait');
        await wrapper.click(selector.ReopenedOption);
        await wrapper.wait('minWait');
        // emulate tab+enter via keyboard
        await wrapper.tabAndEnter();
        const text = await wrapper.getText(selector.CaseIdDetails);
        await wrapper.waitForHidden(selector.ToastMsg);
        CASE_ID=text;
    })

    

   When(`the dispute case should appear in the reopened section`,async function() {
        const wrapper = getWrapper(this);
        const count = await wrapper.page.locator(`//td[.//span[text()='${CASE_ID}']]`).count();
        if (count !== 1) throw new Error(`Expected reopened case ${CASE_ID} count to be 1 but was ${count}`);
    })

    When(`the user searches using Customer ID {string}, Company Code {string}`,async function( customerId: string, companyCode: string) {
        const wrapper = getWrapper(this);
        await wrapper.fillAndEnter(selector.caseIdInput, CASE_ID);
        await wrapper.fillAndEnter(selector.customerKeyInput, customerId);
        await wrapper.fillAndEnter(selector.companyCodeInput, companyCode);
        await wrapper.click(selector.goButton);
    })
