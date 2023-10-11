import fs from "fs";

import { CREDENTIALS } from "../../src/consts";
import { test as setup } from "../../src/fixture/fixtures";
import { addConsentCookie } from "../../src/lib/context";
import { TitleBarPage } from "../../src/pom/pages/titlebar.page";
import { LoginPage } from "../../src/pom/pages/login.page";

setup("Create .auth file for admin login", async ({ page, context }) => {
    const user = CREDENTIALS["admin"];
    if (!fs.existsSync(user.authFile)) {
        // insert a cookie to prevent cookie consent popup
        await addConsentCookie(context);
        // login
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.waitUntilShown();
        await loginPage.populateAndSubmitCredentials(user.username, user.password);
        await loginPage.waitUntilHidden();
        // wait for the application to load
        const titleBarPage = new TitleBarPage(page);
        await titleBarPage.waitUntilShown();
        // save this cookies for reuse later
        await page.context().storageState({ path: user.authFile });
    }
});
