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
    ...(process.env.APP_ENV === "dev"
      ? {}
      : { domain: ".productshare.net", sameSite: "lax"}),
  
  },
  shopAuthenticationStrategy: [
    new PrivyAuthenticationStrategy(process.env.PRIVY_APP_ID, process.env.PRIVY_APP_SECRET),
  ],
};
