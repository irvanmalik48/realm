import NextAuth, { AuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db";
import Credentials from "next-auth/providers/credentials";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@realm.example",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const user = await db
          .select({
            id: users.id,
            email: users.email,
            name: users.name,
            password: users.password,
          })
          .from(users)
          .limit(1);
        const userNoPassword = {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
        };

        if (user[0] && credentials && user[0].email === credentials.email) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user[0].password!,
          );

          if (passwordMatch) {
            const user = userNoPassword;
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
} as AuthOptions;

export default NextAuth(authOptions);
