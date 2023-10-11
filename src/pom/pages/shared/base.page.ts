import { Locator, Page } from "../../../fixture/fixtures";

/**
 * @abstract
 * @class BasePage
 * @classdesc Base page class.
 */
export abstract class BasePage {
    readonly page: Page;
    readonly parent: Locator;

    /**
     * Creates an instance of BasePage.
     *
     * @param page - The page object.
     * @param parent - The parent locator.
     */
    constructor(page: Page, parent: Locator) {
        this.page = page;
        this.parent = parent;
    }

    /**
     * Navigate to this page object model.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract navigateTo(...args: any[]): Promise<void>;

    /**
     * Check to see if this page object model is visible or not.
     *
     * @returns If the page is currently visible (true) or not (false).
     */
    abstract isShown(): Promise<boolean>;

    /**
     * Wait for this page object model to load and be visible.
     */
    abstract waitUntilShown(): Promise<void>;

    /**
     * Wait for this page object model to not be visible.
     */
    abstract waitUntilHidden(): Promise<void>;
}
