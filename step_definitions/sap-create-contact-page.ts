import { When } from "@cucumber/cucumber";
import { PlaywrightWrapper } from "../utils/wrapper";
import { get } from "http";
import { selector } from "./selectors";
import { wrap } from "module";

const getWrapper=(world:any):PlaywrightWrapper=>new PlaywrightWrapper(world.page,world.context);

When('the user selects Process Receivables tile from the dashboard', async function () {
   
    const wrapper=getWrapper(this)
     await wrapper.click(selector.clickOnProcessReceivables);
});

When('the user enters Business Partner {string}', async function (businessPartner) {
   
    const wrapper=getWrapper(this)
    await wrapper.waitSelector(selector.clickOnIcon)
    await wrapper.click(selector.clickOnIcon);
    await wrapper.fillAndEnter(selector.enterOnSearch,businessPartner);
    await wrapper.click(selector.clickOnGO);
    await wrapper.click(selector.clickOnbpChechbox);
    await wrapper.click(selector.clickOnOk);

});

When('the user enters Collection Segment {string}', async function (collectionSegment) {
   const wrapper =getWrapper(this);
    await wrapper.click(selector.clickOnSegmentIcon);
    await wrapper.click(selector.enterSegement);
});

 When('the user clicks the Go button', async function () {
           const wrapper=getWrapper(this);
        await wrapper.click(selector.clickOnGO);
         });

When('the user selects the Business Partner link from the results', async function () {
    const wrapper=getWrapper(this)
 
         await wrapper.click(selector.clickOnItem);
});

When('the user clicks on Create Customer Contact', async function () {
     const wrapper=getWrapper(this)
    await wrapper.waitSelector(selector.clickOnCreateContact);
     await wrapper.click(selector.clickOnCreateContact);
});

When('the user selects Result of Contact {string}', async function (resultOfContact) {
     const wrapper =getWrapper(this);
     await wrapper.click(selector.clickOnResultContact)
     await wrapper.click(selector.clickOnResult)
     
    
});

 When('the user enters Contact Person Name {string}', async function (name) {
      const wrapper =getWrapper(this);      
      await wrapper.fillAndEnter(selector.enterContantPerson,name)
         });

 When('the user clicks on Create button in Contact Page',async function() {
    const wrapper =getWrapper(this);
    await wrapper.click(selector.clickOnCreateContact)
 })

  



/**
 * 
  async clickOnProcessReceivables(){
    await this.click(selector.clickOnProcessReceivables,'Click on Process Receivables','link');
  }

  async enterBusinessPartner(){
    await this.waitSelector(selector.clickOnIcon,'Click on Business Partner Icon')
    await this.click(selector.clickOnIcon,'Click on Business Partner Icon','icon');
    await this.fillAndEnter(selector.enterOnSearch,'Enter on Search Box','CACU_S01');
    await this.click(selector.clickOnGO,'Click on Go Button','button');
    await this.click(selector.clickOnbpChechbox,'Click on Checkbox','checkbox');
    await this.click(selector.clickOnOk,'Click on OK Button','button');
  }

  async enterCollectionSegement(){
    await this.click(selector.clickOnSegmentIcon,'Click on Collection Segment Dropdown','dropdown');
    await this.click(selector.enterSegement,'Select Collection Segment','option');
  }

  async enterCompanyCode(){
await this.fillAndEnter(selector.enterSegementCompanyCode,'Enter Company Code','1710');
  }

  async clickOnOkButton(){
    await this.click(selector.clickOnGO,'Click on OK Button','button');
  }

  async clickOnItem(){
    await this.click(selector.clickOnItem,'Click on Item','link');
  }

  async clickOnCreateContact(){
    await this.waitSelector(selector.clickOnCreateContact,'wait till Contact Button');
    await this.click(selector.clickOnCreateContact,'Click on Create Contact','button');
  }

  async contactResult(){
    await this.click(selector.clickOnResultContact,'Click on dropdown','dropdown')
    await this.click(selector.clickOnResult,'click on Not reachable','Click')
  }

  async enterContactPerson(){
    await this.fillAndEnter(selector.enterContantPerson,'Enter the Contact person','Babu')
  }

  async clickOnCreate(){
    await this.click(selector.clickOnCreateButton,'Click on Create Contact','link')
  }




}



 await sapLoginPage.navigateToUrl();
  await sapLoginPage.loginAs();
  await sapLoginPage.openFinanceMenu();
  await SapCreatecontactPage.clickOnProcessReceivables();
  await SapCreatecontactPage.enterBusinessPartner();
  await SapCreatecontactPage.enterCollectionSegement();
  await SapCreatecontactPage.enterCompanyCode();
  await SapCreatecontactPage.clickOnOkButton();
  await SapCreatecontactPage.clickOnItem();
  await SapCreatecontactPage.clickOnCreateContact();
  await SapCreatecontactPage.contactResult();
  await SapCreatecontactPage.enterContactPerson();
  await SapCreatecontactPage.clickOnCreate();
 */