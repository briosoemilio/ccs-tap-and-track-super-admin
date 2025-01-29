import { useEffect, useState } from "react";
import { UserDetails } from "../../lib/service/students/types";
import { getStudent } from "../../lib/service/students/getStudent";
import { isEmpty } from "lodash";
import { getAllAdmin } from "../../lib/service/admin/getAllAdmin";

export const useFetchAdmins = () => {
  const [filteredAdminList, setFilteredAdminList] = useState<UserDetails[]>([]);
  const [adminList, setAdminList] = useState<UserDetails[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); // Fixed items per page
  const [totalItems, setTotalItems] = useState(0);

  const fetchAdmins = async (page: number) => {
    const res = await getAllAdmin(page, itemsPerPage);
    setTotalItems(res.total);
    setAdminList(res.data);
    setPage(res.page);
  };

  useEffect(() => {
    fetchAdmins(page);
  }, []);

  const nextPage = () => {
    if (page * itemsPerPage < totalItems) {
      fetchAdmins(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      fetchAdmins(page - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page > 0 && (page - 1) * itemsPerPage < totalItems) {
      fetchAdmins(page);
    }
  };

  const searchAdmin = async (identifier: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (isEmpty(identifier)) {
        return setFilteredAdminList([]);
      }

      const res = await getStudent(identifier);
      if (res?.statusCode !== 302) return;
      setFilteredAdminList([res?.data as unknown as UserDetails]);
    } catch (err) {
      throw err;
    }
  };

  return {
    adminList,
    nextPage,
    prevPage,
    goToPage,
    page,
    totalItems,
    itemsPerPage,
    searchAdmin,
    filteredAdminList,
  };
};
