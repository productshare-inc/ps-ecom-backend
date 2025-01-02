import { VendureConfig } from "@vendure/core";
import { getEnvs } from "../../getEnvs";
import { PrivyAuthenticationStrategy } from "./privy-auth-strategy";

const { SUPERADMIN_PASSWORD, SUPERADMIN_USERNAME, COOKIE_SECRET } = getEnvs();

export const authOptions: VendureConfig["authOptions"] = {
  tokenMethod: ["bearer", "cookie"],
  superadminCredentials: {
    identifier: SUPERADMIN_USERNAME,
    password: SUPERADMIN_PASSWORD,
  },
  cookieOptions: {
    secret: COOKIE_SECRET,
    httpOnly: true,
    secure: process.env.APP_ENV !== "dev", // Use Secure only in production
    domain: process.env.APP_ENV === "dev" ? undefined : ".productshare.net",
    path: "/",
    sameSite: process.env.APP_ENV === "dev" ? "lax" : "none", // Use 'lax' for development
  },
  shopAuthenticationStrategy: [
    new PrivyAuthenticationStrategy(process.env.PRIVY_APP_ID, process.env.PRIVY_APP_SECRET),
  ],
};
