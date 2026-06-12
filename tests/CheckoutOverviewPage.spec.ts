import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { LoginLocators } from '../locators/LoginLocators'
import { cartPageLocators } from '../locators/cartPageLocators'
import { CartPage } from '../pages/CartPage'
import { checkoutData } from '../test-data/checkoutData'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage'
import { productsToCart } from '../test-data/products'


test.describe("checkout Overview page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutoverviewPage:CheckoutOverviewPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutoverviewPage = new CheckoutOverviewPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await productPage.getSpecificProductDetails(productsToCart);
        await productPage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickonContinue();

    })

   test("Validate checkout overview page UI and URL" , async({page})=>
{
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    const elements = await checkoutoverviewPage.getCheckoutOverviewElements();
    await expect(elements.pagInfo).toBeVisible();
    await expect(elements.cancelButton).toBeVisible();
    await expect(elements.finishButton).toBeVisible();
})

test("Validate CancelButton Functionality" , async({page}) =>
{
    await checkoutoverviewPage.clickOnCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
})

test("Validate Item Total Calculations" , async({page})=>{
    await page.waitForTimeout(2000)
    const overviewProducts =await checkoutoverviewPage.getOverviewProducts();
    const calculatedTotal = overviewProducts.reduce((sum, {price}) => sum + parseFloat(price.replace("$" ,"")) ,0)
    const UIItemTotal = await checkoutoverviewPage.getItemTotal();
    expect (calculatedTotal).toBe(UIItemTotal);
})

test("Validate Final Total (ItemTotal +Tax" , async({page})=>
{
    const itemTotal = await checkoutoverviewPage.getItemTotal();
    const tax = await checkoutoverviewPage.getTax();
    const finalTotal = await checkoutoverviewPage.getTotal();
    const expectedFinalTotal = itemTotal +tax;
    expect (finalTotal).toBe(expectedFinalTotal)
})

})