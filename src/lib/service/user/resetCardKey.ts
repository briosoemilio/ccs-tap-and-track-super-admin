import wretch from "../../wretch/wretch";
import { UpdateUserRes } from "../students/types";

export const resetCardKey = async (identifier: string) => {
  const res = await wretch()
    .url(`/users/reset-card-key/${identifier}`)
    .patch()
    .json<UpdateUserRes>()
    .catch((err) => {
      console.log("Err resetting card key for user => ", err);
      throw err;
    });
  return res;
};
