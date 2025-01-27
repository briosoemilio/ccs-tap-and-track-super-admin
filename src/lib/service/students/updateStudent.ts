import wretch from "../../wretch/wretch";
import { UpdateUserReq, UpdateUserRes } from "./types";

export const updateStudent = async (reqBody: UpdateUserReq) => {
  const res = await wretch()
    .url(`/users/update-user/${reqBody.id}`)
    .patch(reqBody)
    .json<UpdateUserRes>()
    .catch((err) => {
      console.log("Err register user => ", err);
      throw err;
    });
  return res;
};
