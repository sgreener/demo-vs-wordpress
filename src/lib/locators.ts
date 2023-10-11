import { Locator } from "../fixture/fixtures";

/**
 * Will return true/false if the locator in question has the given class on it.
 *
 * @param locator - Playwright locator.
 * @param className - The name of the class.
 * @returns - True if it has it, else false.
 */
export async function hasClass(locator: Locator, className: string): Promise<boolean> {
    return locator.evaluate(
        (el, ops) => {
            return el.classList.contains(ops.className);
        },
        { className }
    );
}