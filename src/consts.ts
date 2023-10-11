// URL of application under test
export const BASE_URL = process.env.BASE_URL;

// These are credential sets and there auth file path
export const CREDENTIALS: Record<string, { username: string; password: string; authFile: string }> = {
    admin: {
        username: "overlord",
        password: "overlordpw",
        authFile: ".auth/admin.json"
    }
};

// Credentials for accounts
export const VALID_USERNAME = CREDENTIALS.admin.username;
export const VALID_PASSWORD = CREDENTIALS.admin.password;
export const INVALID_USERNAME = "*an_invalid_username*";
export const INVALID_PASSWORD = "*an_invalid_password*";
