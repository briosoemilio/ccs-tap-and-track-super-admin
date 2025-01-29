import wretch from "../../wretch/wretch";
import { GetAllUsersRes } from "../students/types";

export const overridePassword = async (
  identifier: string,
  password: string,
  confirmPassword: string
) => {
  const res = await wretch()
    .url(`/users/override-password/${identifier}`)
    .patch({ password, confirmPassword })
    .json<GetAllUsersRes>()
    .catch((err) => {
      console.log("Err Overriding Password => ", err);
      throw err;
    });
  return res.data;
};
