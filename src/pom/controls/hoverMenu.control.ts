import { Locator, Page } from "../../fixture/fixtures";
import { waitForTrue } from "../../lib/waiting";
import { hasClass } from "../../lib/locators";
/**
 * This a drop list control that can have lazy loading!., lets users select a single value out
 * of a list of possible values.
 */
export class HoverMenuControl {

    readonly page: Page;
    readonly parent: Locator;
    readonly allMenuItems: Locator;

    /**
     * Creates an instance of DropListControl.
     *
     * @param page - Playwright page.
     * @param parent - Parent element, usually a [data-test-select-name] element
     */
    constructor(page: Page, parent: Locator) {
        this.page = page;
        this.parent = parent;
        this.allMenuItems = this.parent.locator("li");
    }

    /**
     * Wait for this control to be shown.
     */
    async waitUntilShown(): Promise<void> {
        await this.parent.waitFor({ state: "visible" });
    }

    /**
     * Wait for this control to be hidden.
     */
    async waitUntilHidden(): Promise<void> {
        await this.parent.waitFor({ state: "hidden" });
    }

    /**
     * Use to tell if the menu control is shown or not.
     *
     * @returns - True if it can be seen else False
     */
    async isVisible(): Promise<boolean> {
        return this.parent.isVisible();
    }

    /**
     * Query all the possible options in the hover menu.
     *
     * @returns - A array of objects that have the text value and id of each unique item.
     */
    async getOptions(): Promise<Array<Record<string, string>>> {

        const gatheredData: Array<Record<string, string>> = [];
        const allItems = await this.allMenuItems.all();

        for (const item of allItems) {
            gatheredData.push({
                "text": await item.textContent() ?? "",
                "id": await item.getAttribute("id") ?? ""
            });
        }

        return gatheredData;
    }

    /**
     * Selects the specified option from the hover menu.
     *
     * @param option The option to select.
     * @throws An error if the specified option is not found.
     */
    async selectOption(option: string): Promise<void> {

        await this.parent.hover();

        await waitForTrue(this.page, async () => {
            return (await hasClass(this.parent, "hover"));
        });

        const wantedOption = option.toLowerCase();

        const allItems = await this.allMenuItems.all();
        for (const item of allItems) {
            const textContent = (await item.textContent() ?? "").toLowerCase();

            if (textContent === wantedOption) {
                await item.click();

                return;
            }
        }
        throw new Error(`Option ${option} not found`);
    }

}