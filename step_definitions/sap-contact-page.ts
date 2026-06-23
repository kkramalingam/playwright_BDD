import { When } from "@cucumber/cucumber";
import { PlaywrightWrapper } from "../utils/wrapper";
import { selector } from "./selectors";



      const getWrapper=(world:any):PlaywrightWrapper=>new PlaywrightWrapper(world.page,world.context)

          When('the user selects a finished customer contact from the list', async function () {
            const wrapper=getWrapper(this);
            
         });

         When('the user clicks on the Edit button in the contact page', async function () {
            const wrapper=getWrapper(this);
            await wrapper.click(selector.editInContactPage)
         });

         When('the user changes the contact type to {string}', async function (contactType) {
            const wrapper=getWrapper(this);
            await wrapper.click(selector.contactTypeInput)
            await wrapper.fillAndEnter(selector.contactTypeInput,contactType)
              
         });

          When('the user changes the date and time to {string} hrs and {string} pm', async function (Hour, Minute) {
            const wrapper=getWrapper(this);
             await wrapper.click(selector.opendatepicker)
             await wrapper.click(selector.selectHour)
             await wrapper.keyTypeAndEnter(Hour);

             await wrapper.click(selector.selectMinutes)
             await  this.keyTypeAndEnter(Minute)

             await this.click(selector.clickOk,"Ok button","Button")
         });



/* 


    async clickOnEditInCustomerContact()
    {
     try{             
    await this.click(selector.editInContactPage,"edit in contact page","button")
} 
catch(error)
{
   throw new error("The first resulting contact is not created perfectly..")
}

}

    async editContactType()
    {
              await this.click(selector.contactTypeInput,"CustomerContactPage","input field")
              await this.fillAndEnter(selector.contactTypeInput,"CustomerContactPage","002 (Visit)")
              //await this.click(selector.visitContactType,"selecting visit as type","list")
    }

    async editDateAndTime(Hour:string,Minute:string)
    {
             await this.click(selector.opendatepicker,"open datepicker","date input field")
             await this.click(selector.selectHour,"select the hour input","input")
             await this.keyTypeAndEnter(Hour,"Hour input field.")

             await this.click(selector.selectMinutes,"select the minutes input","input")
             await  this.keyTypeAndEnter(Minute,"Hour input field.")

             await this.click(selector.clickOk,"Ok button","Button")
               
    }

    async clickOnSaveInContactPage()
    {
             await this.click(selector.clickSave ,"Save Button","Button")
    }


    */