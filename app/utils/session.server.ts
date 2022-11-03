import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSIONSECRET = process.env.SESSIONSECRET;
if (!SESSIONSECRET) {
  throw new Error("there must be a session secret set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "SID",
    secure: process.env.NODE_ENV == "production",
    secrets: [SESSIONSECRET],
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const createUserSession = async (redirectTo: string) => {
  const session = await storage.getSession();
  session.set("logged_in", true);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export const getUserSession = async (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

export const isLoggedIn = async (request: Request): Promise<boolean> => {
  const session = await getUserSession(request);
  const isUserLoggedIn = session.get("logged_in");
  if (!isUserLoggedIn || typeof isUserLoggedIn !== "boolean") return false;
  return isUserLoggedIn;
};

export const requireLoggedIn = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  if (!(await isLoggedIn(request))) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return true;
};

export const login = (password: string) => {
  return password == process.env.ADMINPASSWORD;
};

export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};
