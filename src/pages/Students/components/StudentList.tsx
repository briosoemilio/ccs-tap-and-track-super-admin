import React, { useMemo } from "react";
import { isEmpty } from "lodash";
import { UserDetails } from "../../../lib/service/students/types";

const StudentList = (props: {
  studentList: UserDetails[];
  filteredStudentList: UserDetails[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  totalItems: number;
  page: number;
  itemsPerPage: number;
}) => {
  const {
    studentList,
    filteredStudentList,
    nextPage,
    prevPage,
    goToPage,
    totalItems,
    page: currentPage,
    itemsPerPage,
  } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const students = useMemo(() => {
    if (!isEmpty(filteredStudentList)) return filteredStudentList;
    return studentList;
  }, [filteredStudentList, studentList]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>UUID</th>
            <th>Name</th>
            <th>YearSection</th>
            <th>ID Number</th>
            <th>Is Logged In</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => (
            <tr key={`student-${index}`}>
              <th>{index + 1}</th>
              <th>{student?.uuid}</th>
              <td>{student?.name}</td>
              <td>{student?.yearSection}</td>
              <td>{student?.idNumber}</td>
              <td>{student?.isLogged ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="btn btn-primary mx-1"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page + 1)}
            className={`btn mx-1 ${
              currentPage === page + 1 ? "btn-secondary" : "btn-primary"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="btn btn-primary mx-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentList;
