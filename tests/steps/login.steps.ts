import { Page } from "../../src/fixture/fixtures";
import { TitleBarPage } from "../../src/pom/pages/titlebar.page";
import { LoginPage } from "../../src/pom/pages/login.page";

/**
 * Attempt to login with the supplied credentials.
 *
 * @param page - Playwright page
 */
export async function gotoLoginScreen(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
}

/**
 * Attempt to login with the supplied credentials.
 *
 * @param page - Playwright page
 * @param username - username to enter
 * @param password - password to enter
 */
export async function loginAs(page: Page, username: string, password: string): Promise<void> {
    const loginPage = new LoginPage(page);
    const titleBarPage = new TitleBarPage(page);

    await loginPage.populateAndSubmitCredentials(username, password);

    // This waits for either an error message or a screen that shows we logged in.
    await Promise.any([
        loginPage.waitForErrorMessage(),
        Promise.all([loginPage.waitUntilHidden(), titleBarPage.waitUntilShown()])
    ]);
}
