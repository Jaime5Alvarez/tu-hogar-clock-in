export const { DATABASE_URL, BETTER_AUTH_SECRET } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

if (!BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}
