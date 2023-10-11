/**
 * Parses a boolean value from a string. The primary use for this is extracting boolean values from .env entries.
 *
 * @param str - The string to parse.
 * @param defaultValue - The default value to return if the string is not matched to known boolean representation.
 * @returns - The parsed boolean value.
 */
export function parseBooleanValue(str: string | undefined, defaultValue = false): boolean {
    if (str === undefined) {
        return defaultValue;
    }
    const normalisedBoolean = str.toLowerCase().trim();
    if (["true", "1", "yes", "on", "enable", "y"].includes(normalisedBoolean)) {
        return true;
    } else if (["false", "0", "no", "off", "disabled", "-1", "n"].includes(normalisedBoolean)) {
        return false;
    }
    return defaultValue;
}

/**
 * Convert a string that is "CamelCase" into "Camel Case".
 *
 * @param str - The string you want to separate.
 * @returns A string that has been separated by spaces.
 */
export function camelCaseToSpace(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}
