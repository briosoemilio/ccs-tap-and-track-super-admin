import wretch from "../../wretch/wretch";
import { CreateUserReq, RegisterRes } from "./types";

export const createStudent = async (reqBody: CreateUserReq) => {
  const res = await wretch()
    .url("/users/register")
    .post(reqBody)
    .json<RegisterRes>()
    .catch((err) => {
      console.log("Err register user => ", err);
      throw err;
    });
  return res;
};
