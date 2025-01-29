import wretch from "../../wretch/wretch";
import { UpdateUserRes } from "../students/types";

export const archiveUser = async (identifier: string) => {
  const res = await wretch()
    .url(`/users/archive-account/${identifier}`)
    .patch()
    .json<UpdateUserRes>()
    .catch((err) => {
      console.log("Err archiving user => ", err);
      throw err;
    });
  return res;
};
