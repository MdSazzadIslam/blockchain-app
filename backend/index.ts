import app from "./src/app";
import {
  errorHandler,
  notFoundErrorHandler,
} from "./src/middlewares/apiErrorHandler";
import { config } from "dotenv";
config();

(() => {
  app.use(errorHandler);
  app.use(notFoundErrorHandler);
  const PORT: number = parseInt(process.env.PORT as string);
  app
    .listen(PORT, () => {
      console.log("##########################################################");
      console.log("#####               STARTING SERVER                  #####");
      console.log(
        "##########################################################\n"
      );
      console.log(`Server running → PORT ${PORT}`);
    })
    .on("error", (e) => {
      console.error(e);
    });
})();
