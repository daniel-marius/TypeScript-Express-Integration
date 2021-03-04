import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import { AppRouter } from "./AppRouter"
import "./controllers/LoginController";
import "./controllers/RootController";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({ keys: ["typescriptkey"] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

// class Server {
//   app: Express = express();
//
//   constructor() {
//     this.app.use(bodyParser.urlencoded({ extended: false }));
//     this.app.use(cookieSession({ keys: ["typescriptkey"] }));
//     this.app.use(router);
//   }
//
//   start(): void {
//     this.app.listen(3000, () => {
//       console.log(`Listening on port 3000`);
//     });
//   }
// }
