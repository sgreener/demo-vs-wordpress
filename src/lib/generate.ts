/**
 * Generates a random hex string like "332B13F3D" of a given length.
 *
 * @param length - Length of the string you want to generate.
 * @param sourceString - If provided, then it will be used instead of hex chars.
 * @returns - A hex string of given length.
 */
export function genHexString(length: number, sourceString = "0123456789ABCDEF"): string {
    const hex = sourceString;
    let output = "";
    for (let i = 0; i < length; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}