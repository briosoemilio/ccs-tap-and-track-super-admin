import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import {
  UpdateUserReq,
  UserDetails,
} from "../../../lib/service/students/types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import FormTextField from "../../../components/TextField/FormTextField";
import { updateStudent } from "../../../lib/service/students/updateStudent";
import { updateStudentErrHandler } from "../utils";
import Loader from "../../../components/Loader/Loader";
import ArchiveUser from "../../../components/ArchiveUser/ArchiveUser";
import ArchiveModal from "../../../components/ArchiveUser/ArchiveModal";
import LostCard from "./LostCard";
import ResetKeycardModal from "./ResetKeycardModal";

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

  const [selectedStudent, setSelectedStudent] = useState<UserDetails>();

  const showUpdateStudentModal = () => {
    const modal = document?.getElementById("update_student");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.showModal();
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>UUID</th>
              <th>Email</th>
              <th>Name</th>
              <th>YearSection</th>
              <th>ID Number</th>
              <th>Is Logged In</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => (
              <tr
                key={`student-${index}`}
                className="hover:bg-slate-500 hover:cursor-pointer"
                onClick={() => {
                  setSelectedStudent(student);
                  showUpdateStudentModal();
                }}
              >
                <th>{index + 1}</th>
                <th>{student?.uuid}</th>
                <th>{student?.email}</th>
                <td>{student?.name}</td>
                <td>{student?.yearSection}</td>
                <td>{student?.idNumber}</td>
                <td>{student?.isLogged ? "Yes" : "No"}</td>
                <td>
                  <ArchiveUser
                    user={student}
                    onClick={() => setSelectedStudent(student)}
                  />
                </td>
                <td>
                  {student?.cardKey && (
                    <LostCard onClick={() => setSelectedStudent(student)} />
                  )}
                </td>
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
      <EditStudentModal student={selectedStudent} />
      <EditSuccessModal />
      <ArchiveModal user={selectedStudent as UserDetails} />
      <ResetKeycardModal user={selectedStudent as UserDetails} />
    </>
  );
};

export type EditStudentForm = {
  name?: string;
  yearSection?: string;
  idNumber?: string;
  email?: string;
};

const EditStudentModal = (props: { student?: UserDetails }) => {
  const { student } = props;
  const [initialState, setInitialState] = useState<UserDetails>();
  const [isLoading, setisLoading] = useState(false);
  const formMethods = useForm<EditStudentForm>();
  const { handleSubmit, setValue, control, setError } = formMethods;
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (!student) return;
    setInitialState(student);
    setValue("name", student?.name);
    setValue("yearSection", student?.yearSection || "");
    setValue("idNumber", student?.idNumber || "");
    setValue("email", student?.email || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  const isModified =
    initialState?.name !== watchedValues.name ||
    initialState?.yearSection !== watchedValues.yearSection ||
    initialState?.idNumber !== watchedValues.idNumber ||
    initialState?.email !== watchedValues.email;

  const showEditSuccessModal = () => {
    const modal = document?.getElementById("edit_success");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.showModal();
  };

  const closeUpdateStudentModal = () => {
    const modal = document?.getElementById("update_student");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.close();
  };

  const onSubmit = async (data: EditStudentForm) => {
    try {
      setisLoading(true);
      const reqBody = {
        id: student?.id,
        ...data,
      } as UpdateUserReq;
      const res = await updateStudent(reqBody);
      if (res.statusCode === 200) {
        showEditSuccessModal();
        closeUpdateStudentModal();
      }
    } catch (err) {
      updateStudentErrHandler(err, setError);
      if (err instanceof Error === false) return;
      console.log("Error on edit student : ", err?.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <dialog id="update_student" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Student Details</h3>
        <FormProvider {...formMethods}>
          <FormTextField name="name" label={"Name"} />
          <FormTextField name="yearSection" label={"Year Section"} />
          <FormTextField name="idNumber" label={"ID Number"} />
          <FormTextField name="email" label={"Email"} />
          <div className="flex flex-row gap-5">
            <button
              className="flex-1 bg-blue-500 disabled:bg-slate-500"
              onClick={handleSubmit(onSubmit)}
              disabled={!isModified}
            >
              {isLoading && <Loader />}
              SAVE
            </button>
            <button
              className="flex-1 bg-red-500"
              onClick={() => {
                closeUpdateStudentModal();
              }}
            >
              CLOSE
            </button>
          </div>
        </FormProvider>
      </div>
    </dialog>
  );
};

const EditSuccessModal = () => {
  const closeModal = () => {
    const modal = document?.getElementById("edit_success");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.close();
  };
  return (
    <dialog id="edit_success" className="modal">
      <div className="modal-box">
        <h1 className="text-center">Successfully Updated</h1>
        <div className="h-[50px]" />
        <div className="flex flex-row gap-5">
          <button
            className="flex-1 bg-red-500"
            onClick={() => {
              closeModal();
              location.reload();
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default StudentList;
