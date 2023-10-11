import { test } from "../fixture/fixtures";
import { camelCaseToSpace } from "./data";

/**
 * Wrap a function in a test.step function.
 *
 * The purpose of this is to cut down duplicate code. Before using this function, each
 * thing we wanted to be a step in the test needed to be inside a step function like so;
 * ``` javascript
 * test("A given test", async ({ context, page }) => {
 *   const loginPage = new LoginPage(page);
 *   await test.step("goto Login Screen", async () => {
 *     await gotoLoginScreen(loginPage);
 *   });
 * });
 * ```
 *
 * Now the same can be achieved using this function like so;
 * ``` javascript
 * test("A given test", async ({ context, page }) => {
 *   const loginPage = new LoginPage(page);
 *   await testStep(gotoLoginScreen)(loginPage);
 * });
 * ```
 * This function that is passed will have its name converted so its easier to read, capital letters will have a space
 * inserted in front. Then these will make groups in the html report when its generated.
 *
 * @param func - a function to wrap
 * @returns - a wrapped function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function testStep<T extends any[]>(func: (...args: T) => Promise<any>) {
    return async (...args: T) => {
        return test.step(camelCaseToSpace(func.name), async () => {
            return func(...args);
        });
    };
}
