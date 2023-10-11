import { BASE_URL } from "../consts";
import { BrowserContext } from "../fixture/fixtures";

/**
 * Add/insert a cookie for accepting all cookies. This is being inserted as if we accepted all.
 *
 * @param context - Playwright context of a page
 */
export async function addConsentCookie(context: BrowserContext): Promise<void> {
    const CONSENT_COOKIE = {
        necessary: true,
        performance: true,
        functional: true,
        advertising: true,
        type: "category"
    };
    await context.addCookies([{ name: "cookiefirst-consent", value: JSON.stringify(CONSENT_COOKIE), url: BASE_URL }]);
}
