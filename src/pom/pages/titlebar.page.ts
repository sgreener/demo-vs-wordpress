import { Locator, Page } from "../../fixture/fixtures";
import { BasePage } from "./shared/base.page";
import { HoverMenuControl } from "../controls/hoverMenu.control";

export class TitleBarPage extends BasePage {

    readonly imageLogo: Locator;
    readonly hoverUserMenu: HoverMenuControl;
    readonly hoverNewMenu: HoverMenuControl;
    /**
     * This is the bar across the top of the commander that hosts the main navigation menu, avatar icon, notifications and title.
     *
     * @param page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, page.locator("div.quicklinks#wp-toolbar"));
        this.imageLogo = this.parent.locator("#wp-admin-bar-wp-logo");
        this.hoverNewMenu = new HoverMenuControl(page, this.parent.locator("li#wp-admin-bar-new-content"));
        this.hoverUserMenu = new HoverMenuControl(page, this.parent.locator("li#wp-admin-bar-my-account"));
    }

    /** @inheritdoc */
    async navigateTo(): Promise<void> {
        throw new Error("Not implemented");
    }

    /** @inheritdoc */
    async waitUntilShown(): Promise<void> {
        await this.parent.waitFor({ state: "attached" });
        await this.hoverNewMenu.waitUntilShown();
        await this.hoverUserMenu.waitUntilShown();
        await this.imageLogo.waitFor({ state: "visible" });

    }

    /** @inheritdoc */
    async waitUntilHidden(): Promise<void> {
        await this.parent.waitFor({ state: "detached" });
        await this.hoverNewMenu.waitUntilHidden();
        await this.hoverUserMenu.waitUntilHidden();
        await this.imageLogo.waitFor({ state: "hidden" });
    }

    /** @inheritdoc */
    async isShown(): Promise<boolean> {
        return this.imageLogo.isVisible();
    }

    /**
     * Logs out the user by selecting the "log out" option from the user menu and waits until the page is hidden.
     *
     * @returns A Promise that resolves when the user is logged out.
     */
    async logout(): Promise<void> {
        await this.hoverUserMenu.selectOption("log out");
        await this.waitUntilHidden();
    }

}
