import { Locator, Page } from "../../fixture/fixtures";
import { BasePage } from "./shared/base.page";
import { genHexString } from "../../lib/generate";

export class NewPostPage extends BasePage {

    readonly header: Locator;
    readonly buttonViewPosts: Locator;
    readonly buttonPublish: Locator;

    readonly publishPanel: Locator;
    readonly labelReadyToPublish: Locator;
    readonly buttonPublishPanelPublish: Locator;
    readonly buttonPublishPanelViewPost: Locator;

    /**
     * This is the posts page (with a table of posts)
     *
     * @param page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, page.locator("#editor"));
        this.header = this.parent.locator("div.edit-post-header");
        this.buttonViewPosts = this.header.locator("a[aria-label='View Posts']");
        this.buttonPublish = this.header.locator("button:has-text('Publish')");

        this.publishPanel = this.parent.locator(".editor-post-publish-panel");
        this.labelReadyToPublish = this.publishPanel.locator("strong:has-text('Are you ready to publish?')");
        this.buttonPublishPanelPublish = this.publishPanel.locator("button:text-is('Publish')");

        this.buttonPublishPanelViewPost = this.publishPanel.locator("a:has-text('View Post')");
    }

    /** @inheritdoc */
    async navigateTo(): Promise<void> {
        throw new Error("Not implemented");
    }

    /** @inheritdoc */
    async waitUntilShown(): Promise<void> {
        await this.parent.waitFor({ state: "attached" });
        await this.buttonPublish.waitFor({ state: "visible" });
        await this.buttonViewPosts.waitFor({ state: "visible" });
    }

    /** @inheritdoc */
    async waitUntilHidden(): Promise<void> {
        await this.parent.waitFor({ state: "detached" });
        await this.buttonPublish.waitFor({ state: "hidden" });
        await this.buttonViewPosts.waitFor({ state: "hidden" });
    }

    /** @inheritdoc */
    async isShown(): Promise<boolean> {
        return this.parent.isVisible();
    }

    async clickViewPostsButton(): Promise<void> {
        await this.buttonViewPosts.click();
        await this.buttonViewPosts.waitFor({ state: "detached" });
        await this.page.waitForLoadState("domcontentloaded");
    }

    async populateAutomatedPost(): Promise<void> {

        const title = `AutoPost ${genHexString(10)}`;
        const body = `This is the body of a post created by a automated tests \n A random 24 char hex string = ${genHexString(24)}`;

        // Type in the text fields of the post editor
        await this.parent.pressSequentially(title);
        await this.page.keyboard.press("Tab");
        await this.parent.pressSequentially(body);
        await this.page.keyboard.press("Tab");

        await this.buttonPublish.click();

        // pre publish checks panel
        await this.publishPanel.waitFor({ state: "visible" });
        await this.buttonPublishPanelPublish.click();

        await this.page.waitForLoadState("domcontentloaded");

        // finished publishing
        await this.buttonViewPosts.click();
        await this.page.waitForLoadState("domcontentloaded");
    }


}
