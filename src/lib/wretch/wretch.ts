import _wretch from "wretch";
import { queryString } from "./middlewares/queryString";
import { auth } from "./middlewares/auth";
import { API_BASE_URL } from "./constants";

const wretch = () => {
  const middlewares = [queryString(), auth()];

  return _wretch(API_BASE_URL)
    .middlewares(middlewares)
    .catcherFallback((err) => {
      throw err;
    });
};

export default wretch;
