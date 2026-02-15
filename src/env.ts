import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: z.url(),
    AUTH_URL: z.url(),
  },

  //   Client Example
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
  },

  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    AUTH_URL: process.env.AUTH_URL,
  },
});
