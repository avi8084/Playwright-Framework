import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../../utils/envConfig'
import { ProductPage } from '../../pages/ProductPage'
import { LoginPage } from '../../pages/LoginPage'
import { LoginLocators } from '../../locators/LoginLocators'
import { cartPageLocators } from '../../locators/cartPageLocators'
import { CartPage } from '../../pages/CartPage'
import { checkoutData } from '../../test-data/checkoutData'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage'
import { productsToCart } from '../../test-data/products'
import { FinalPage } from '../../pages/FinalPage'


test.describe("Final page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutoverviewPage:CheckoutOverviewPage
    let finalPage:FinalPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutoverviewPage = new CheckoutOverviewPage(page);
        finalPage = new FinalPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await productPage.getSpecificProductDetails(productsToCart);
        await productPage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickonContinue();
        await checkoutoverviewPage.clickOnFinish();

    })
    test("Validate checkout overview page UI and URL" , async({page})=>
{
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html/Engineer B")
    const elements = await finalPage.getFinalPageElements();
    await expect(elements.backHomeBtn).toBeVisible();
    await expect(elements.successMessage).toBeVisible();
    await expect(elements.pageInfo).toBeVisible();


})
test("Validate the success Message" , async({page}) => {
    const message = await finalPage.getSuccessMsgTxt();
     expect(message).toBe("Thank you for your order!")

})
test("Validate Back Home Button 1" , async({page}) => {
    await finalPage.clickonBackHomeBtn();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

})

test("Validate Back Home Button 2" , async({page}) => {
    await finalPage.clickonBackHomeBtn();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

})
})