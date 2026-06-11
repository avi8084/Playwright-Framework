import { Page } from "@playwright/test";
import { finalPageLocators } from "../locators/finalPageLocators";

export class FinalPage
{
    constructor(private page :Page){}

    async getFinalPageElements()
    {
        return{
            pageInfo : this.page.locator(finalPageLocators.pageInfo),
            successMessage : this.page.locator(finalPageLocators.successMsg),
            backHomeBtn : this.page.locator(finalPageLocators.backHomeButton)
        }
    }

    async getSuccessMsgTxt()
    {
        const text = this.page.locator(finalPageLocators.successMsg).innerText();
        return (await text).trim() ;
    }

    async clickonBackHomeBtn()
    {
       await this.page.locator(finalPageLocators.backHomeButton).click()
        
    }

}
