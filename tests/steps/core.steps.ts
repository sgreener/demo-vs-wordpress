import { expect, Page } from "../../src/fixture/fixtures";
import { TitleBarPage } from "../../src/pom/pages/titlebar.page";
import { DashboardPage } from "../../src/pom/pages/dashboard.page";
import { PostsPage } from "../../src/pom/pages/posts.page";

/**
 * Goto the dashboard/landing screen.
 *
 * @param page - Playwright page
 */
export async function gotoDashboard(page: Page): Promise<void> {
    const pom = new DashboardPage(page);
    await pom.navigateTo();
}

/**
 * Goto the posts screen.
 *
 * @param page - Playwright page
 */
export async function gotoPosts(page: Page): Promise<void> {
    const pom = new PostsPage(page);
    await pom.navigateTo();
}

/**
 * Assert we are logged in.
 *
 * @param page - Playwright page
 */
export async function checkWeAreLoggedIn(page: Page): Promise<void> {
    const titleBarPage = new TitleBarPage(page);
    expect(await titleBarPage.isShown()).toEqual(true);
}

/**
 * Assert we are not logged in.
 *
 * @param page - Playwright page
 */
export async function checkWeAreNotLoggedIn(page: Page): Promise<void> {
    const titleBarPage = new TitleBarPage(page);
    expect(await titleBarPage.isShown()).toEqual(false);
}

