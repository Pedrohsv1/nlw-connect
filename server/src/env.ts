import { z } from 'zod'

const envSchema = z.object({
  PORT: z
    .string()
    .transform(val => Number.parseInt(val, 10))
    .default('3001'),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
