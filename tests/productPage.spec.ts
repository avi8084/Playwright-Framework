import { test, expect} from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { LoginLocators } from '../locators/LoginLocators'
import { ProductPageLocators } from '../locators/ProductPageLocators'
import { productsToCart } from '../test-data/products'


test.describe("Product page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);

    })

    test("Validate Logout Functionality", async ({ page }) => {
        await productPage.logout()
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible()
    })

    test("About Page and Navigate Back", async ({ page }) => {
        await productPage.openAboutPage()
        await expect(page.locator(ProductPageLocators.requestDemoButton)).toBeVisible()
        await expect(page.locator(ProductPageLocators.tryitFreeButton)).toBeVisible()
        await page.goBack()
        await expect(page.locator(ProductPageLocators.settingsIcon)).toBeVisible()
    })

    test("validate Product Page", async ({ page }) => {

        await productPage.validateAllProductsDisplayed()
        await productPage.addFirstProductToCart()
        await productPage.addallProductToCart()
    })

    test("validate adding specific product to cart", async ({ page }) => {

        await productPage.addSpecificProductsToCart(productsToCart)


    })

    test('Filter By Name A to Z', async () => {
        await productPage.filterByNameAtoZ()
        const names = await productPage.getProductNames()
        const sorted = [...names].sort()
        expect(names).toEqual(sorted)

    })

    test('Filter By Name Z to A', async () => {
        await productPage.filterByNameZtoA()
        const names = await productPage.getProductNames()
        const sorted = [...names].sort().reverse()
        expect(names).toEqual(sorted)

    })

    test('Filter By Price Low to High', async () => {
        await productPage.filterByPriceLowToHigh()
        const prices = await productPage.getProductPrices()
        const sortedprice = [...prices].sort((a,b)=>a-b)
        expect(prices).toEqual(sortedprice)

    })

    test('Filter By Price High to Low', async () => {
         await productPage.filterByPriceHighToLow()
        const prices = await productPage.getProductPrices()
        const sortedprice = [...prices].sort((a,b)=>b-a)
        expect(prices).toEqual(sortedprice)

    })


})