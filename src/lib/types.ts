//* Used to pass values to the waitFor method*/
export type WaitForPrams = {
    /**
     * Defaults to `'visible'`. Can be either:
     * - `'attached'` - wait for element to be present in DOM.
     * - `'detached'` - wait for element to not be present in DOM.
     * - `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element
     *   without any content or with `display:none` has an empty bounding box and is not considered visible.
     * - `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or
     *   `visibility:hidden`. This is opposite to the `'visible'` option.
     */
    state?: "attached" | "detached" | "visible" | "hidden";
    /**
     * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
     * option in the config, or by using the
     * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
     */
    timeout?: number;
};
