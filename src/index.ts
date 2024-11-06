import { bootstrap, runMigrations } from "@vendure/core";
import { config } from "./vendure-config";
//test comment

runMigrations(config)
  .then(() => bootstrap(config))
  .catch((err) => {
    console.log(err);
  });
