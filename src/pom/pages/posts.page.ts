import { Locator, Page } from "../../fixture/fixtures";
import { BasePage } from "./shared/base.page";

export class PostsPage extends BasePage {

    readonly titlePosts: Locator;
    readonly buttonAddNew: Locator;

    readonly tableTotals: Locator;
    readonly tablePostFilterScreenReader: Locator;

    readonly tableTotalAll: Locator;
    readonly tableTotalPublished: Locator;
    readonly tableTotalTrash: Locator;
    readonly tableTotalDraft: Locator;

    readonly tableTotalShown: Locator;
    readonly inputSearch: Locator;
    readonly inputSubmit: Locator;

    /**
     * This is the posts page (with a table of posts)
     *
     * @param page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, page.locator("#wpbody"));
        this.buttonAddNew = this.parent.locator("a:has-text('Add New')");
        this.titlePosts = this.parent.locator("h1:has-text('Posts')");

        this.tableTotals = this.parent.locator("ul.subsubsub");
        this.tablePostFilterScreenReader = this.parent.locator("form#posts-filter").locator("..").locator("h2.screen-reader-text").first();

        this.tableTotalAll = this.tableTotals.locator("li.all").locator("span.count");
        this.tableTotalPublished = this.tableTotals.locator("li.publish").locator("span.count");
        this.tableTotalTrash = this.tableTotals.locator("li.trash").locator("span.count");
        this.tableTotalDraft = this.tableTotals.locator("li.draft").locator("span.count");

        this.tableTotalShown = this.parent.locator("span.displaying-num").nth(0); // there are two of these on screen
        this.inputSearch = this.parent.locator("#post-search-input");
        this.inputSubmit = this.parent.locator("#search-submit");

    }

    /** @inheritdoc */
    async navigateTo(): Promise<void> {
        await this.page.goto("/wp-admin/edit.php");
        await this.page.waitForLoadState("domcontentloaded");
        await this.waitUntilShown();
        await this.page.waitForLoadState("networkidle");
    }

    /** @inheritdoc */
    async waitUntilShown(): Promise<void> {
        await this.parent.waitFor({ state: "attached" });
        await this.titlePosts.waitFor({ state: "visible" });
        await this.buttonAddNew.waitFor({ state: "visible" });
    }

    /** @inheritdoc */
    async waitUntilHidden(): Promise<void> {
        await this.parent.waitFor({ state: "detached" });
        await this.titlePosts.waitFor({ state: "hidden" });
        await this.buttonAddNew.waitFor({ state: "hidden" });
    }

    /** @inheritdoc */
    async isShown(): Promise<boolean> {
        return this.titlePosts.isVisible();
    }

    /**
     * Clicks the "Add New Post" button and waits until the page is hidden.
     *
     * @returns A Promise that resolves when the page is hidden.
     */
    async clickAddNewPostButton(): Promise<void> {
        await this.buttonAddNew.click();
        await this.buttonAddNew.waitFor({ state: "detached" });
        await this.page.waitForLoadState("load");
    }

    /**
     * Gets the total number of existing posts from the UI.
     *
     * @returns A Promise that resolves to the total number of existing posts.
     */
    async getTotalExistingPosts(): Promise<number> {
        await this.tableTotalAll.waitFor({ state: "visible" });
        let text = await this.tableTotalAll.textContent() ?? "";
        text = text.replace("(","").replace(")",""); // remove brackets
        const num = parseInt(text);
        if (isNaN(num)) {
            return 0; // no number found so will be zero
        }
        return num;
    }

    /**
     * Gets the total number of items shown in the table.
     *
     * @returns A Promise that resolves to the total number of items shown in the table.
     */
    async getTotalShown(): Promise<number> {
        await this.tableTotalShown.waitFor({ state: "visible" });
        let text = await this.tableTotalShown.textContent() ?? "";
        text = text.replace("items","").replace("item",""); // remove known text
        const num = parseInt(text);
        if (isNaN(num)) {
            return 0; // no number found so will be zero
        }
        return num;
    }


    /**
     * Searches for posts using the specified text.
     *
     * @param text The text to search for.
     * @returns A Promise that resolves when the search is complete.
     */
    async searchPosts(text:string): Promise<void> {
        await this.inputSearch.fill(text);
        await this.inputSubmit.click();
        await this.page.waitForLoadState("load");
    }


    async getPostFilterScreenReaderText(): Promise<string> {
        const text = await this.tablePostFilterScreenReader.textContent();
        return text ?? "";
    }
}
