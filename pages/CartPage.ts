import { Page } from "@playwright/test";
import { cartPageLocators } from "../locators/cartPageLocators";

export class CartPage
{
  constructor(private page :Page){}

  async clickOnContinueShopping()
  {
    await this.page.locator(cartPageLocators.continueShoppingButton).click()
  }

  async getCartPageElements()
    {
        return{
            cartTitle : this.page.locator(cartPageLocators.cartTitle),
            shoppingCart : this.page.locator(cartPageLocators.continueShoppingButton),
            checkout : this.page.locator(cartPageLocators.checkoutButton)

        }
    }
   
    async getCartProducts()
    {
        const allNames = await this.page.locator(cartPageLocators.productNames).allTextContents()
                const allDescription = await this.page.locator(cartPageLocators.productDescription).allTextContents()
                const allPrices = await this.page.locator(cartPageLocators.productPrice).allTextContents()
        
                //array of object [{name , description ,price},{},{}]
                const allCartProducts = allNames.map((_, i) =>
                ({
                    name: allNames[i].trim(),
                    description: allDescription[i].trim(),
                    price: allPrices[i].trim()
        
                }))
                return allCartProducts;
    }

    async removeFirstProduct()
    {
        await this.page.locator(cartPageLocators.removeButton).first().click();
    }
  
    async clickCheckoutButton()
    {
        await this.page.locator(cartPageLocators.checkoutButton).click();
    }
}