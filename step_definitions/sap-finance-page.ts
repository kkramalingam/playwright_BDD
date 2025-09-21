import { When } from '@cucumber/cucumber';
import { PlaywrightWrapper } from "../utils/wrapper";
import {selector} from "../step_definitions/selectors"

const getWrapper=(world:any):PlaywrightWrapper=>new PlaywrightWrapper(world.page,world.context)

When(`the user selects Manage Dispute Cases from the dashboard`,async function(){
    
const wrapper=getWrapper(this)
await wrapper.click(selector.manageDisputeCases);


})


When(`the user selects Manage Customer Line Items from the dashboard`,async function(){
    
const wrapper=getWrapper(this)
await wrapper.click(selector.manageCustomerLineItems);


})

When(`the user selects Manage Payment Blocks from the dashboard`,async function(){
    
const wrapper=getWrapper(this)
await wrapper.click(selector.managePaymentBlocks);


})