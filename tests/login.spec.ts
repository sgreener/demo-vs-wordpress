import { VALID_PASSWORD, VALID_USERNAME, INVALID_USERNAME, INVALID_PASSWORD } from "../src/consts";
import { test } from "../src/fixture/fixtures";
import { testStep } from "../src/lib/steps";
import { checkWeAreLoggedIn, checkWeAreNotLoggedIn } from "./steps/core.steps";
import { gotoLoginScreen, loginAs } from "./steps/login.steps";

test.describe.parallel("(f) Login tests", () => {
    test("Can login with valid credentials", async ({ page }) => {
        await testStep(gotoLoginScreen)(page);
        await testStep(loginAs)(page, VALID_USERNAME, VALID_PASSWORD);
        await testStep(checkWeAreLoggedIn)(page);
    });

    test("Can not login with invalid password", async ({ page }) => {
        await testStep(gotoLoginScreen)(page);
        await testStep(loginAs)(page, VALID_USERNAME, INVALID_PASSWORD);
        await testStep(checkWeAreNotLoggedIn)(page);
    });

    test("Can not login with unknown username", async ({ page }) => {
        await testStep(gotoLoginScreen)(page);
        await testStep(loginAs)(page, INVALID_USERNAME, VALID_PASSWORD);
        await testStep(checkWeAreNotLoggedIn)(page);
    });
});
