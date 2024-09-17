import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(
  process.env.DATABASE_URL ??
    "postgres://postgres:postgres@127.0.0.1:5432/postgres",
);
const db = drizzle(queryClient);

export default db;
