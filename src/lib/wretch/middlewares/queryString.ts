import { Middleware } from "wretch/types";
import { isNil } from "lodash";
import { stringify } from "qs";
import { Options } from "../types/Options";

export const queryString: Middleware =
  () => (next) => async (url, opts: Options) => {
    if (!isNil(opts.query)) {
      const obj = opts.query as object;
      const query = "?" + stringify(obj, { encode: false });
      url = url + query;
    }

    return next(url, opts);
  };
