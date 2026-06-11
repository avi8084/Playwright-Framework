import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { LoginLocators } from '../locators/LoginLocators'
import { ProductPageLocators } from '../locators/ProductPageLocators'
import { productsToCart } from '../test-data/products'
import { cartPageLocators } from '../locators/cartPageLocators'
import { CartPage } from '../pages/CartPage'


test.describe("Product page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);

    })
    test("Validate cart Page URL and UI Elements", async ({ page }) => {
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui = cartPage.getCartPageElements()
        await expect((await ui).cartTitle).toBeVisible()
        expect((await ui).shoppingCart).toBeVisible()
        expect((await ui).checkout).toBeVisible()

    })

    test("Validate Continue Shopping Functionality", async ({ page }) => {
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    })
    test("Validate First Product in the Cart Page", async ({ page }) => {
        const firstProduct = await productPage.getFirstProductDetails();
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await page.waitForTimeout(3000)
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts[0]).toEqual(firstProduct);

    })
    test("Validate All Products Added to the Cart Page", async ({ page }) => {
        const allProductDetails = await productPage.getAllProductDetails();
        await productPage.addallProductToCart();
        await productPage.clickOnCartLink();
        // await page.waitForTimeout(3000)
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(allProductDetails);


    })
    test("Validate Specific Products Added to the Cart Page", async ({ page }) => {
        const getSpecificProductDetails = await productPage.getSpecificProductDetails(productsToCart)
        await productPage.addSpecificProductsToCart(productsToCart)
        await productPage.clickOnCartLink();
        
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(getSpecificProductDetails);


    })

    test.only("Validate Remove Product Functionality", async ({ page }) => {
        await productPage.addallProductToCart();
        await productPage.clickOnCartLink();
        const initialProducts = await cartPage.getCartProducts();
        expect(initialProducts.length).toBeGreaterThan(0);
        await cartPage.removeFirstProduct();

        const updatedCartProducts = await cartPage.getCartProducts();
        expect(updatedCartProducts.length).toBe(initialProducts.length -1);

    })
})
