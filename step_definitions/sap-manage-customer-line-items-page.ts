import { Then, When } from "@cucumber/cucumber";
import { PlaywrightWrapper } from "../utils/wrapper";
import { selector } from "./selectors";
import { expect } from 'chai';
 
const getWrapper=(world:any):PlaywrightWrapper=>new PlaywrightWrapper(world.page,world.context)

When(`the user enters Customer ID {string} and Company Code {string} in Manage Customer Line Page`,async function(customer_id,company_Code){

    const wrapper=getWrapper(this)
    await wrapper.click(selector.customerValueHelp);
    await wrapper.waitForVisible(selector.customerRadio);
    await wrapper.click(selector.customerRadio);
    await wrapper.click(selector.okButton);

    await wrapper.click(selector.companyValueHelp);
    await wrapper.waitForVisible(selector.companyRadio);
    await wrapper.click(selector.companyRadio);
    await wrapper.click(selector.okButton);

})

When('the user selects Status {string}', async function (string) {
           const wrapper=getWrapper(this)

           await wrapper.click(selector.customerLineItemsStatus)
           await wrapper.click(selector.customerLineStatus_open)


         });

        

 
         When('the user selects Open on Key Date as {string}', async function (string) {
            const wrapper=getWrapper(this)
                       await wrapper.click(selector.openKeyDatePicker)
           await wrapper.click(selector.selectDayAstdy)
         });

  
        

         When('the user clicks the Go button to fetch records', async function () { 
           const wrapper=getWrapper(this)
           await wrapper.click(selector.GoButtoninManageCustomer);
         });

         Then('the system should display the corresponding customer line items', async function () {
                        const wrapper=getWrapper(this)
        await wrapper.waitForFirstHidden(selector.busyIndicator)
        await wrapper.wait("minWait")
          const txt=await wrapper.getText(selector.customerNumber)
        expect(txt).to.be.a("string").to.include("17100001")
    

         });

         When('the user selects a customer line item', async function () {
           const wrapper=getWrapper(this)
    await wrapper.click(selector.firstRowCheckbox);
         });

  
         When('the user clicks on Edit Line Items', async function () {
            const wrapper=getWrapper(this)
                await wrapper.click(selector.editLineItemsButton);
         });

 
         When('the user updates the field FieldName with value NewValue', async function () {
           const wrapper=getWrapper(this)
          
            await wrapper.click(selector.itemPaymentBlockDropdown);
    await wrapper.click(selector.manualPaymentBlockedOption);
  
         });


         When('the user saves the changes', async function () {
            const wrapper=getWrapper(this)
              await wrapper.click(selector.okButton);
         });


         Then('the edited field FieldName should be updated with value NewValue', async function () {
           const wrapper=getWrapper(this)
            await wrapper.waitForVisible(selector.settingsIcon);
    await wrapper.click(selector.settingsIcon);
    await wrapper.type(selector.settingsSearchInput,'Item Payment Block');
    await wrapper.click(selector.settingsCheckbox);
    await wrapper.click(selector.settingsConfirmButton);
    await wrapper.wait('minWait');
    const txt=await wrapper.getText(selector.itemPaymentBlockValue)
   expect(txt, 'customerNumber should be defined').to.be.a('string');
expect(txt!.trim()).to.include('B');

         });


  