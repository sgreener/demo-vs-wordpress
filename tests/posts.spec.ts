import { expect, test } from "../src/fixture/fixtures";
import { testStep } from "../src/lib/steps";
import { gotoPosts } from "./steps/core.steps";
import { useAddNewPostButton, searchPosts, getTotalShownPosts, getTotalExistingPosts, useViewPostButton, populatePostAndPublish, checkWeAreOnNewPostPage, checkWeAreNotOnNewPostPage } from "./steps/posts.steps";

test.describe("(f) Posts tests", () => {

    test.use({ storageState: ".auth/admin.json" });

    test("Add new post button lets you add new post", async ({ page }) => {
        await testStep(gotoPosts)(page);
        await testStep(useAddNewPostButton)(page);
        await testStep(checkWeAreOnNewPostPage)(page);
    });

    test("Can return from empty new post page", async ({ page }) => {
        await testStep(gotoPosts)(page);
        await testStep(useAddNewPostButton)(page);
        await testStep(useViewPostButton)(page);
        await testStep(checkWeAreNotOnNewPostPage)(page);
    });

    test("Can publish a new post", async ({ page }) => {
        await testStep(gotoPosts)(page);
        const total = await testStep(getTotalExistingPosts)(page);
        await testStep(useAddNewPostButton)(page);
        await testStep(populatePostAndPublish)(page);
        const newTotal = await testStep(getTotalExistingPosts)(page);
        expect(newTotal).toEqual(total + 1);
    });

    test("Can search for a specific post", async ({ page }) => {
        await testStep(gotoPosts)(page);
        await testStep(searchPosts)(page, "Currys");
        const total = await testStep(getTotalShownPosts)(page);
        expect(total).toEqual(1);
    });

    test("Can search for a few specific post", async ({ page }) => {
        await testStep(gotoPosts)(page);
        await testStep(searchPosts)(page, "Amazon");
        const total = await testStep(getTotalShownPosts)(page);
        expect(total).toEqual(3);
    });

});
