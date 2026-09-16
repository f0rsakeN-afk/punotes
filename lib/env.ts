import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1, "DATABASE_URL is required"),
  STACK_SECRET_SERVER_KEY: z.string().min(1, "STACK_SECRET_SERVER_KEY is required"),
  NEXT_PUBLIC_STACK_PROJECT_ID: z.string().min(1, "NEXT_PUBLIC_STACK_PROJECT_ID is required"),
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string().min(1, "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY is required"),
  REDIS_URL: z.string().url().min(1, "REDIS_URL is required"),
  GITHUB_TOKEN: z.string().min(1).optional(),
  GITHUB_OWNER: z.string().min(1).optional(),
  GITHUB_REPO: z.string().min(1).optional(),
  GITHUB_BRANCH: z.string().min(1).optional(),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1).optional(),
  IMAGEKIT_PUBLIC_KEY: z.string().min(1).optional(),
  IMAGEKIT_URL_ENDPOINT: z.string().url().optional(),
  REVALIDATE_SECRET: z.string().min(1).optional(),
  BACKEND_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ANALYTICS_SALT: z.string().min(1).optional(),
});

type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | null = null;

export function validateEnv(): Env {
  if (validatedEnv) return validatedEnv;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Check server logs.");
  }
  validatedEnv = parsed.data;
  return validatedEnv;
}

// Fail-closed on boot in production: validates lazily but can be called in instrumentation.ts or next.config
export function getEnv(): Env {
  return validateEnv();
}

// For client-side safe env access (only NEXT_PUBLIC_)
export function getPublicEnv() {
  const env = validateEnv();
  return {
    NEXT_PUBLIC_STACK_PROJECT_ID: env.NEXT_PUBLIC_STACK_PROJECT_ID,
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  };
}
