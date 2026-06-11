import { Page } from "@playwright/test";
import { checkoutOverviewLocators } from "../locators/checkoutOverviewLocators";

export class CheckoutOverviewPage {
    constructor(private page: Page) { }

    async getCheckoutOverviewElements() {
        return {
            pagInfo: this.page.locator(checkoutOverviewLocators.PageInfo),
            cancelButton: this.page.locator(checkoutOverviewLocators.cancelButton),
            finishButton: this.page.locator(checkoutOverviewLocators.finishButton),

        }
    }

    async getOverviewProducts()
    {
        const allNames = await this.page.locator(checkoutOverviewLocators.productNames).allTextContents()
                        const allDescription = await this.page.locator(checkoutOverviewLocators.productDescription).allTextContents()
                        const allPrices = await this.page.locator(checkoutOverviewLocators.productPrice).allTextContents()
                
                        //array of object [{name , description ,price},{},{}]
                        const allCartProducts = allNames.map((_, i) =>
                        ({
                            name: allNames[i].trim(),
                            description: allDescription[i].trim(),
                            price: allPrices[i].trim()
                
                        }))
                        return allCartProducts;
    }

    async getItemTotal()
    {
        const text = await this.page.locator(checkoutOverviewLocators.itemTotal).textContent()
        return parseFloat(text!.replace("Item total: $" ,"").trim());
    }

     async getTax()
    {
        const text = await this.page.locator(checkoutOverviewLocators.tax).textContent()
        return parseFloat(text!.replace("Tax: $", "").trim());
    }

      async getTotal()
    {
        const text = await this.page.locator(checkoutOverviewLocators.total).textContent()
        return parseFloat(text!.replace("Total: $" , "").trim());
    }

    async clickOnCancel()
    {
        await this.page.locator(checkoutOverviewLocators.cancelButton).click()
    }

    async clickOnFinish()
    {
        await this.page.locator(checkoutOverviewLocators.finishButton).click()
    }

    async getErrorMessage()
    {
       return await this.page.locator(checkoutOverviewLocators.errorMsg).textContent()
    }
}