// src/env.ts
import { z } from "zod";
var envSchema = z.object({
  PORT: z.string().transform((val) => Number.parseInt(val, 10)).default("3001"),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url()
});
var env = envSchema.parse(process.env);

export {
  env
};
