import React, { useState } from "react";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import StudentList from "./components/StudentList";
import { useFetchStudents } from "./useFetchStudents";
import Loader from "../../components/Loader/Loader";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/TextField/FormTextField";
import { NavLink } from "react-router-dom";
import AddStudentModal from "./components/AddStudentModal";

const Students = () => {
  const formMethods = useForm<{ identifier: string }>();
  const { handleSubmit, setError } = formMethods;
  const [isLoading, setIsLoading] = useState(false);
  const {
    studentList,
    filteredStudentList,
    nextPage,
    prevPage,
    goToPage,
    totalItems,
    page,
    itemsPerPage,
    searchStudent,
  } = useFetchStudents();

  const onSubmit = async (data: { identifier: string }) => {
    setIsLoading(true);
    try {
      await searchStudent(data.identifier);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      if (err?.message.includes("not found")) {
        setError("identifier", {
          message: "User not found, please check identifier",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateStudentModal = () =>
    document?.getElementById("add_student")?.showModal?.();

  return (
    <ScreenContainer>
      <div className="w-full">
        <div className="flex justify-between">
          <h1>Students List</h1>
          <button onClick={openCreateStudentModal}>CREATE NEW STUDENT</button>
        </div>
        <FormProvider {...formMethods}>
          <div className="flex items-center">
            <FormTextField
              name={"identifier"}
              label={"Search"}
              placeholder="Search student"
              left={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            <button onClick={handleSubmit(onSubmit)} className="mt-6 ml-5">
              {isLoading && <Loader />}
              SEARCH
            </button>
          </div>
        </FormProvider>
      </div>
      <div className="mt-5 mb-5">
        <div className="font-bold">NOTE: </div>
        Search only works with id number, email, or uuid. Name is not unique and
        cannot be used as a search parameter.
      </div>
      <StudentList
        studentList={studentList}
        filteredStudentList={filteredStudentList}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
        totalItems={totalItems}
        page={page}
        itemsPerPage={itemsPerPage}
      />
      <AddStudentModal />
    </ScreenContainer>
  );
};

export default Students;
