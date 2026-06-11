import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { LoginLocators } from '../locators/LoginLocators'
import { cartPageLocators } from '../locators/cartPageLocators'
import { CartPage } from '../pages/CartPage'
import { checkoutData } from '../test-data/checkoutData'
import { CheckoutPage } from '../pages/CheckoutPage'


test.describe("cart page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink()

    })

    test("validate checkout page UI Elements and url", async ({ page }) => {
        await cartPage.clickCheckoutButton()
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
        const elements = await checkoutPage.getCheckoutElements()
        await expect(elements.cancel).toBeVisible()
        await expect(elements.continue).toBeVisible()
        await expect(elements.pageInfo).toBeVisible()
    })

    test("validate cancel button functionality", async ({ page }) => {
        await cartPage.clickCheckoutButton()
        await checkoutPage.clickCancel()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
    })

    test("validate continue button", async ({ page }) => {
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutPage.clickonContinue()
    })

test.only("validate the error message when clicking on continue with no data", async({page})=>
{
 await cartPage.clickCheckoutButton()  
 await checkoutPage.clickonContinue()
 const error = await checkoutPage.getErrorMessage()
 expect(error?.trim()).toBe("Error: First Name is required")  
})


})