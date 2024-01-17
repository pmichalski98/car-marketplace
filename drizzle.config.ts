import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle/migrations",
    driver: "pg",
    dbCredentials: {
        ssl: true,
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST!,
        database: process.env.POSTGRES_DATABASE!,
        password: process.env.POSTGRES_PASSWORD
    },
} satisfies Config;