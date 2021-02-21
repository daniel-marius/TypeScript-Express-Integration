import { Router, Request, Response, NextFunction } from "express";

// Rewriting the body property from Request type definition file
interface RequestWithBody extends Request {
  // Object with keys that are strings
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted!");
};

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in!</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in!</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get("/login", (req: Request, res: Response) => {
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
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = { loggedIn: false };
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("Welcome to protected route, logged in user!");
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "hi@hi.com" && password === "password") {
    // Mark this person as logged in
    req.session = { loggedIn: true };

    // Redirect them to the root route
    res.redirect("/");
  } else {
    res.send("Invalid email or password!");
  }
});

export { router };
