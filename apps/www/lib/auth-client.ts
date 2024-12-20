import { createAuthClient } from "better-auth/react";
import { multiSessionClient } from "better-auth/client/plugins";

const BaseDomain =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro/v1/auth"
    : "http://localhost:3001/v1/auth";
export const authClient = createAuthClient({
  baseURL: BaseDomain,
  plugins: [multiSessionClient()],
});

export const { signIn, signUp, useSession, signOut, multiSession } = authClient;
