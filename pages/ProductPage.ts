import { Page } from "@playwright/test";
import { ProductPageLocators } from "../locators/ProductPageLocators";

export class ProductPage {
    constructor(private page: Page) {
    }

    async logout() {
        await this.page.click(ProductPageLocators.settingsIcon)
        await this.page.click(ProductPageLocators.logoutLink)
    }

    async openAboutPage() {
        await this.page.click(ProductPageLocators.settingsIcon)
        await this.page.click(ProductPageLocators.aboutLink)
    }

    async validateAllProductsDisplayed() {
        const names = await this.page.locator(ProductPageLocators.productNames).allTextContents()
        const description = await this.page.locator(ProductPageLocators.productDescription).allTextContents()
        const price = await this.page.locator(ProductPageLocators.productPrice).allTextContents()
        const buttoncount = await this.page.locator(ProductPageLocators.addToCartButton).count()
        if (names.length === 0)
            throw new Error("No product found")

        if (
            names.length !== description.length ||
            names.length !== price.length ||
            names.length !== buttoncount
        )
            throw new Error("Mismatch between the product details");

    }


    async addFirstProductToCart() {
        await this.page.locator(ProductPageLocators.addToCartButton).first().click()
    }

    async addallProductToCart() {
        const button = this.page.locator(ProductPageLocators.addToCartButton)
        const count = await button.count()

        for (let i = 0; i < count; i++) {
            await button.nth(i).click()
            await this.page.waitForTimeout(3000)
        }

    }
    async addSpecificProductsToCart(productName: string[]) {
        const addProducts = this.page.locator(ProductPageLocators.productNames)
        const count = await addProducts.count()
        for (let i = 0; i < count; i++) {
            const name = await addProducts.nth(i).textContent()
            if (name && productName.includes(name.trim())) {
                await this.page.locator(ProductPageLocators.addToCartButton).nth(i).click()
                await this.page.waitForTimeout(3000)
            }

        }
    }

    async filterByNameAtoZ() {
        await this.page.selectOption(ProductPageLocators.filterDropdown, "az")
        await this.page.waitForTimeout(3000)
    }

    async filterByNameZtoA() {
        await this.page.selectOption(ProductPageLocators.filterDropdown, "za")
        await this.page.waitForTimeout(3000)
    }

    async filterByPriceLowToHigh() {
        await this.page.selectOption(ProductPageLocators.filterDropdown, "lohi")
        await this.page.waitForTimeout(3000)
    }

    async filterByPriceHighToLow() {
        await this.page.selectOption(ProductPageLocators.filterDropdown, "hilo")
        await this.page.waitForTimeout(3000)
    }

    async getProductNames() {
        return await this.page.locator(ProductPageLocators.productNames).allTextContents()
    }

    async getProductPrices() {
        const prices = await this.page.locator(ProductPageLocators.productPrice).allTextContents()
        return prices.map(price => parseFloat(price.replace('$', '')))
    }

    async clickOnCartLink() {
        await this.page.locator(ProductPageLocators.cartLink).click()
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(ProductPageLocators.productNames).first().textContent()
        const description = await this.page.locator(ProductPageLocators.productDescription).first().textContent()
        const price = await this.page.locator(ProductPageLocators.productPrice).first().textContent()
        return  {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        };

    }
    async getAllProductDetails() {
        const allNames = await this.page.locator(ProductPageLocators.productNames).allTextContents()
        const allDescription = await this.page.locator(ProductPageLocators.productDescription).allTextContents()
        const allPrices = await this.page.locator(ProductPageLocators.productPrice).allTextContents()

        //array of object [{name , description ,price},{},{}]
        const allProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()

        }))
        return allProducts;



    }
    async getSpecificProductDetails(productName: string[])
     {
const allNames = await this.page.locator(ProductPageLocators.productNames).allTextContents()
        const allDescription = await this.page.locator(ProductPageLocators.productDescription).allTextContents()
        const allPrices = await this.page.locator(ProductPageLocators.productPrice).allTextContents()

        //array of object [{name , description ,price},{},{}]
        const allProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()

        }))
        return allProducts.filter(p => productName.includes(p.name)) ;
    }

}