import {
  subscriptions
} from "./chunk-5OAAD53O.mjs";
import {
  env
} from "./chunk-AUOFUMQ6.mjs";

// src/drizzle/client.ts
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
var pg = postgres(env.POSTGRES_URL);
var db = drizzle(pg, {
  schema: {
    subscriptions
  }
});

export {
  pg,
  db
};
