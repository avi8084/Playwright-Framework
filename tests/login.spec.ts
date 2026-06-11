import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { BASE_URL,USERNAME,PASSWORD } from '../utils/envConfig'

test('Login to saucedemo application with valid credentials', async ({ page }) => {
    const loginpage = new LoginPage(page)
    await page.goto(BASE_URL)
    await loginpage.login(USERNAME , PASSWORD)

})