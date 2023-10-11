import { Page } from "../fixture/fixtures";

/**
 * Waits a callback to a function to be true.
 *
 * @param page - playwright page object so we can access delay function
 * @param callback - function that returns a true or false
 * @param [totalTime] - The total amount of time (millisecs) to wait for text to match - defaults to 15 secs
 * @param [checkInterval] - Of the total time, this is how often (millisecs) we check to see if the condition is matching - defaults to 200ms
 * @returns if True, the timeout was detected else it expired
 */
export async function waitForTrue(page: Page, callback: () => Promise<boolean>, totalTime = 15000, checkInterval = 200): Promise<boolean> {
    let currentElapsedTime = 0;
    while (currentElapsedTime < totalTime) {
        const result = await callback();
        if (result === true) {
            return true;
        }
        await page.waitForTimeout(checkInterval);
        currentElapsedTime += checkInterval;
    }
    return false;
}
