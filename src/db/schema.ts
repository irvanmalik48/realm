import {
  pgTable,
  varchar,
  boolean,
  text,
  integer,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  isAdministrator: boolean("isAdministrator").default(false),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const pastes = pgTable("pastes", {
  id: text("id").primaryKey().default(crypto.randomUUID()),
  shortLink: varchar("short_link", { length: 10 }).unique(),
  userId: text("user_id").references(() => users.id),
  title: varchar("title", { length: 100 }).notNull(),
  language: varchar("language", { length: 50 }).default("text"),
  text: text("text").notNull(),
  isPublic: boolean("is_public").default(false),
  passworded: boolean("passworded").default(false),
  password: varchar("password", { length: 1000 }),
});

export const gists = pgTable("gists", {
  id: text("id").primaryKey().default(crypto.randomUUID()),
  shortLink: varchar("short_link", { length: 10 }).unique(),
  userId: text("user_id").references(() => users.id),
  title: varchar("title", { length: 100 }).notNull(),
  renderAsMarkdown: boolean("render_as_markdown").default(false),
  content: text("content").notNull(),
  isPublic: boolean("is_public").default(false),
  passworded: boolean("passworded").default(false),
  password: varchar("password", { length: 1000 }),
});
