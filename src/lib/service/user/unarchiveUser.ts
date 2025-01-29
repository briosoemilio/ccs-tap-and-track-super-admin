import wretch from "../../wretch/wretch";
import { UpdateUserRes } from "../students/types";

export const unarchiveUser = async (identifier: string) => {
  const res = await wretch()
    .url(`/users/unarchive-account/${identifier}`)
    .patch()
    .json<UpdateUserRes>()
    .catch((err) => {
      console.log("Err activating user => ", err);
      throw err;
    });
  return res;
};
