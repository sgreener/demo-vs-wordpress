import { Locator, Page } from "../../fixture/fixtures";
import { BasePage } from "./shared/base.page";

export class LoginPage extends BasePage {
    readonly buttonLogin: Locator;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly alertError: Locator;

    lastErrorMessage: string | undefined;

    /**
     * This is the bar across the top of the commander that hosts the main navigation menu, avatar icon, notifications and title.
     *
     * @param page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, page.locator("body > div#login"));
        this.buttonLogin = this.parent.locator("#wp-submit");
        this.inputUsername = this.parent.locator("#user_login");
        this.inputPassword = this.parent.locator("#user_pass");
        this.alertError = this.page.locator("div#login_error");

        this.lastErrorMessage = undefined;
    }

    /** @inheritdoc */
    async navigateTo(): Promise<void> {
        await this.page.goto("/wp-admin/");
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState("networkidle");
        await this.waitUntilShown();
    }

    /** @inheritdoc */
    async waitUntilShown(): Promise<void> {
        await this.parent.waitFor({ state: "attached" });
        await this.buttonLogin.waitFor({ state: "visible" });
        await this.inputUsername.waitFor({ state: "visible" });
        await this.inputPassword.waitFor({ state: "visible" });
    }

    /** @inheritdoc */
    async waitUntilHidden(): Promise<void> {
        await this.parent.waitFor({ state: "detached" });
        await this.buttonLogin.waitFor({ state: "hidden" });
        await this.inputUsername.waitFor({ state: "hidden" });
        await this.inputPassword.waitFor({ state: "hidden" });
    }

    /** @inheritdoc */
    async isShown(): Promise<boolean> {
        return this.parent.isVisible();
    }

    /**
     * Enter the credentials for user account and password on the login form and click continue.
     *
     * @param username - The username to enter.
     * @param password - The password to enter.
     */
    async populateAndSubmitCredentials(username: string, password: string): Promise<void> {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.buttonLogin.click();
    }

    /**
     * Waits until an error is shown (eg: incorrect credentials)
     *
     * @returns - A string that represents the contents of the error message.
     */
   async waitForErrorMessage(): Promise<void> {
       await this.alertError.waitFor({ state: "visible", timeout: 20000 });
       const text = await this.alertError.textContent();
       if (text !== null) {
           this.lastErrorMessage = text.trim();
       } else {
           this.lastErrorMessage = undefined;
       }
   }

}
