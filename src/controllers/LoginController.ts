import { Request, Response } from "express";

import { get, post, controller, bodyValidator } from "./decorators";

// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log("Request was made!");
//   next();
// }

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post("/login")
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email && password && email === "hi@hi.com" && password === "password") {
      // Mark this person as logged in
      req.session = { loggedIn: true };

      // Redirect them to the root route
      res.redirect("/");
    } else {
      res.send("Invalid email or password!");
    }
  }

  @get("logout")
  getLogout(req: Request, res: Response): void {
    req.session = { loggedIn: false };
    res.redirect("/");
  }
}