import wretch from "../../wretch/wretch";
import { GetAllUsersRes } from "../students/types";

export const getAllAdmin = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/users/ADMIN?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetAllUsersRes>()
    .catch((err) => {
      console.log("Err Getting ALL Admins => ", err);
      throw err;
    });
  return res.data;
};
