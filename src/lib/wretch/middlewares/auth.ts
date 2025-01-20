import { Middleware } from "wretch";
import SessionStorage from "../../storage/sessionStorage";

export const auth: Middleware = () => (next) => async (url, opts) => {
  const session = SessionStorage.getSession();
  const token = session?.token as string;

  opts.headers = {
    ...opts.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return next(url, opts);
};
