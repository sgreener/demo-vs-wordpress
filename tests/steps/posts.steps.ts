import { expect, Page } from "../../src/fixture/fixtures";
import { PostsPage } from "../../src/pom/pages/posts.page";
import { NewPostPage } from "../../src/pom/pages/newPost.page";

/**
 * Clicks the "Add New Post" button on the Posts page.
 *
 * @param {Page} page - The Puppeteer page object.
 * @returns {Promise<void>}
 */
export async function useAddNewPostButton(page: Page): Promise<void> {
    const postsPage = new PostsPage(page);
    await postsPage.clickAddNewPostButton();

    const newPostPage = new NewPostPage(page);
    newPostPage.waitUntilShown();
}

/**
 * Clicks the "View Posts" button on the New Post page and waits until the Posts page is shown.
 *
 * @param {Page} page - The Puppeteer page object.
 * @returns {Promise<void>}
 */
export async function useViewPostButton(page: Page): Promise<void> {
    const newPostPage = new NewPostPage(page);
    await newPostPage.clickViewPostsButton();
    const postsPage = new PostsPage(page);
    await postsPage.waitUntilShown();
}

/**
 * Populates a new post and publishes it.
 *
 * @param page The page to operate on.
 * @returns A Promise that resolves when the post is published.
 */
export async function populatePostAndPublish(page: Page): Promise<void> {
    const newPostPage = new NewPostPage(page);
    await newPostPage.waitUntilShown();
    await newPostPage.populateAutomatedPost();
}


/**
 * Gets the total number of existing posts on the page.
 *
 * @param {Page} page - The Puppeteer page object.
 * @returns {Promise<number>} - The total number of existing posts.
 */
export async function getTotalExistingPosts(page: Page): Promise<number> {
    const postsPage = new PostsPage(page);
    return postsPage.getTotalExistingPosts();
};

/**
 * Returns the total number of posts shown on the page.
 *
 * @param {Page} page - The Puppeteer page object.
 * @returns {Promise<number>} - The total number of posts shown on the page.
 */
export async function getTotalShownPosts(page: Page): Promise<number> {
    const postsPage = new PostsPage(page);
    return postsPage.getTotalShown();
};

/**
 * Searches for posts containing the specified text.
 *
 * @param page - The Playwright page object.
 * @param text - The text to search for.
 * @returns A Promise that resolves when the search is complete.
 */
export async function searchPosts(page: Page, text: string): Promise<void> {
    const postsPage = new PostsPage(page);
    await postsPage.searchPosts(text);
};

/**
 * Checks the screen reader text for the posts filter on the posts page.
 *
 * @param page The page to check the screen reader text on.
 * @returns A Promise that resolves when the screen reader text is checked.
 */
export async function checkTablePostFilterScreenReaderText(page: Page): Promise<void> {
    const postsPage = new PostsPage(page);
    const text = await postsPage.getPostFilterScreenReaderText();
    expect(text, "Screen reader text for posts-filter is not as expected").toEqual("Filter posts list");
}

/**
 * Checks if we are on the new post page.
 *
 * @param page - The Playwright page object.
 * @returns A Promise that resolves when the check is complete.
 */
export async function checkWeAreOnNewPostPage(page: Page): Promise<void> {
    const newPostPage = new NewPostPage(page);
    expect(await newPostPage.isShown()).toEqual(true);
};

/**
 * Checks if we are not on the new post page.
 *
 * @param page - The Playwright page object.
 * @returns A Promise that resolves when the check is complete.
 */
export async function checkWeAreNotOnNewPostPage(page: Page): Promise<void> {
    const newPostPage = new NewPostPage(page);
    expect(await newPostPage.isShown()).toEqual(false);
};