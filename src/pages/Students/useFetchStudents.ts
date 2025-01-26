import { useEffect, useState } from "react";
import { UserDetails } from "../../lib/service/students/types";
import { getAllStudents } from "../../lib/service/students/getAllStudents";
import { getStudent } from "../../lib/service/students/getStudent";
import { isEmpty } from "lodash";

export const useFetchStudents = () => {
  const [filteredStudentList, setFilteredStudentList] = useState<UserDetails[]>(
    []
  );
  const [studentList, setStudentList] = useState<UserDetails[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); // Fixed items per page
  const [totalItems, setTotalItems] = useState(0);

  const fetchStudents = async (page: number) => {
    const res = await getAllStudents(page, itemsPerPage);
    setTotalItems(res.total);
    setStudentList(res.data);
    setPage(res.page);
  };

  useEffect(() => {
    fetchStudents(page);
  }, []);

  const nextPage = () => {
    if (page * itemsPerPage < totalItems) {
      fetchStudents(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      fetchStudents(page - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page > 0 && (page - 1) * itemsPerPage < totalItems) {
      fetchStudents(page);
    }
  };

  const searchStudent = async (identifier: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (isEmpty(identifier)) {
        return setFilteredStudentList([]);
      }

      const res = await getStudent(identifier);
      if (res?.statusCode !== 302) return;
      setFilteredStudentList([res?.data as unknown as UserDetails]);
    } catch (err) {
      throw err;
    }
  };

  return {
    studentList,
    nextPage,
    prevPage,
    goToPage,
    page,
    totalItems,
    itemsPerPage,
    searchStudent,
    filteredStudentList,
  };
};
