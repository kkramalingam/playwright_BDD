import { Then, When, world } from "@cucumber/cucumber";
import { selector } from "./selectors";
import { PlaywrightWrapper } from "../utils/wrapper";
import { expect } from 'chai';


const getWrapper=(world:any):PlaywrightWrapper=>new PlaywrightWrapper(world.page,world.context)
         When('the user enters Supplier ID {string}', async function (supplierId:string) {

            const wrapper=getWrapper(this)     
                        await wrapper.click(selector.supplierInput);
                        await wrapper.click(selector.supplierFirstRow);
                
                await wrapper.wait('minWait');
            
         });

         When(`the user enters Company Code {string}`,async function(company_code){
         const wrapper=getWrapper(this)
         await wrapper.fillAndEnter(selector.companyCodeInput,company_code);

         })
   

         When('the user selects Status {string} from the drop-down', async function (string) {
             const wrapper=getWrapper(this)
            await wrapper.click(selector.ClickSupplierStatus);
            await wrapper.click(selector.SelectBlockedStatus);
         });


         When('the user clicks on the Go button to fetch results', async function () {     
             const wrapper=getWrapper(this)

 await wrapper.click(selector.GoButtoninPaymentBlocks);
             
         });

         When('the user clicks on the {string} record hyperlink', async function (supplierId) {   
             const wrapper=getWrapper(this)   
            await wrapper.click(selector.BlockedSupplier(supplierId));
              });

  
         When('the user clicks on the Unblock Supplier button on the supplier detail page', async function () {
            const wrapper=getWrapper(this)
             await wrapper.click(selector.UnblockSupplierButton);
                // Confirmation button uses the same action in this UI; wait for toast instead
                await wrapper.wait('minWait');
         });


         Then('the supplier should be unblocked and a confirmation Toast message should be displayed', async function () {
             const wrapper=getWrapper(this)
              const verify = await wrapper.getText(selector.ToastMsg);
                  expect(verify, 'Toast message should be defined').to.be.a('string');
                  expect(verify.trim()).to.include('Payments are no longer blocked for this supplier.');
      
         });


/* async selectSupplierById(supplierId?: string) {
                // If supplierId is provided, use the parameterized selector, otherwise open the supplier picker
                if (supplierId) {
                        await this.click(selector.BlockedSupplier(supplierId), 'Blocked Supplier', 'row');
                } else {
                        await this.click(selector.supplierInput, 'Supplier Input', 'list');
                        await this.click(selector.supplierFirstRow, 'First Row of the Supplier', 'table');
                }
                await this.wait('minWait');
        }

        async setCompanyCode(companyCode: string) {
                await this.fillAndEnter(selector.companyCodeInput, 'Company Code', companyCode);
        }

                async selectStatusBlocked() {
                                        await this.click(selector.ClickSupplierStatus, 'Enable status dropdown', 'list');
                                        await this.click(selector.SelectBlockedStatus, 'Select blocked status', 'button');
                        }

        async clickGoInPayments() {
                await this.click(selector.GoButtoninPaymentBlocks, 'Go in payments block page', 'button');
        }

        async clickBlockedSupplierById(supplierId: string) {
                await this.click(selector.BlockedSupplier(supplierId), 'Blocked Supplier Id', 'link');
        }

        async unblockSupplier() {
               
        }

        async verifySupplierIsUnblocked() {
                const verify = await this.getTextContent(selector.ToastMsg);
                expect(verify).toContain('Payments are no longer blocked for this supplier.');
        } */