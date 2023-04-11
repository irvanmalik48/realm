import { createClient } from "@supabase/supabase-js";

const conn = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_API_KEY,
  {
    db: {
      schema: "public",
    }
  }
);

export default conn;