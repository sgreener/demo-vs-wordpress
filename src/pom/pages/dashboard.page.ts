import { Locator, Page } from "../../fixture/fixtures";
import { BasePage } from "./shared/base.page";


export class DashboardPage extends BasePage {

    readonly titleDashboard: Locator;


    /**
     * This is the bar across the top of the commander that hosts the main navigation menu, avatar icon, notifications and title.
     *
     * @param page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, page.locator("#wpbody"));
        this.titleDashboard = this.parent.locator("h1:has-text('Dashboard')");
    }

    /** @inheritdoc */
    async navigateTo(): Promise<void> {
        await this.page.goto("/wp-admin/index.php");
        await this.page.waitForLoadState("domcontentloaded");
        await this.waitUntilShown();
        await this.page.waitForLoadState("networkidle");
    }

    /** @inheritdoc */
    async waitUntilShown(): Promise<void> {
        await this.parent.waitFor({ state: "attached" });
        await this.titleDashboard.waitFor({ state: "visible" });
    }

    /** @inheritdoc */
    async waitUntilHidden(): Promise<void> {
        await this.parent.waitFor({ state: "detached" });
        await this.titleDashboard.waitFor({ state: "hidden" });
    }

    /** @inheritdoc */
    async isShown(): Promise<boolean> {
        return this.titleDashboard.isVisible();
    }

}
