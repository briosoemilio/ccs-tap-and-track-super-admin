import wretch from "../../wretch/wretch";
import { GetAllUsersRes } from "./types";

export const getAllStudents = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/users/STUDENT?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetAllUsersRes>()
    .catch((err) => {
      console.log("Err Getting ALL Students => ", err);
      throw err;
    });
  return res.data;
};
