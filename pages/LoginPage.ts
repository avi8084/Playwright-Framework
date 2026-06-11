import { Page } from '@playwright/test'
import { LoginLocators } from '../locators/LoginLocators'

export class LoginPage {

    constructor(private page: Page) {
    }

    async login(username: string, password: string) {
        await this.page.fill(LoginLocators.userNameInput, username)
        await this.page.fill(LoginLocators.passwordInput, password)
        await this.page.click(LoginLocators.loginButton)
    }
}