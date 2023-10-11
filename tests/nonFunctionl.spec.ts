import { expect, test } from "../src/fixture/fixtures";
import { testStep } from "../src/lib/steps";
import { gotoDashboard, gotoPosts } from "./steps/core.steps";
import { checkTablePostFilterScreenReaderText } from "./steps/posts.steps";

test.describe("(nf) Posts tests", () => {

    test.use({ storageState: ".auth/admin.json" });

    test("Performance of posts screen loading", async ({ page }) => {
        await testStep(gotoDashboard)(page);
        const startTime = new Date().getTime();
        await testStep(gotoPosts)(page);
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        expect(elapsedTime, "Should take no more then 1 second to load").toBeLessThan(1000);
    });

    test("Check screen reader entry is as expected for posts-filter form", async ({ page }) => {
        await testStep(gotoPosts)(page);
        await testStep(checkTablePostFilterScreenReaderText)(page);
    });

});
