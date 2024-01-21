import {pgTable, text,} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    image: text("image"),
});
