import wretch from "../../wretch/wretch";
import { GetAllUsersRes } from "./types";

export const getStudent = async (identifier: string) => {
  const res = await wretch()
    .url(`/users/${identifier}`)
    .get()
    .json<GetAllUsersRes>()
    .catch((err) => {
      console.log("Err Getting specific student => ", err);
      throw err;
    });
  return res || null;
};
