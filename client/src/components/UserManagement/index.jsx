import { useEffect, useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import { Input } from "reactstrap";
import "./UserManagement.components.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "components/Shared/Modal";
import { capitalize, formatDate } from "utils/helper.function";

import {
  sortEmail,
  sortName,
  sortNumber,
  sortRegistrationDate,
  SortSvg,
} from "./UserManagement.helper";
import UserTable from "./UserTable";
import UserTableHeader from "./UserTableHeader";
import UserTableFooter from "./UserTableFooter";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { setNotify } from "store/slices/notifySlice";
import {
  getAllUsers,
  removeAllUsers,
  updateUserRole,
} from "store/slices/authSlice";
import { addModal } from "store/slices/modalSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.auth.users);
  const [initialUser, setInitialUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [tableUser, setTableUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refreshValues, setRefreshValues] = useState(false);
  const [onSearchValue, setOnSearchValue] = useState([]);
  const toggleModal = () => setShowModal(!showModal);

  const pageSized = () => {
    const total = Math.ceil(initialUser.length / 10) * 10;
    const array = [];
    for (let i = 1; i <= total / 10; i++) {
      if (i * 10 <= 100) {
        array.push(i * 10);
        continue;
      }
    }
    return array;
  };

  const handleDelete = async (user) => {
    try {
      // if (auth.user.id !== user._id) {
      toggleModal();
      dispatch(
        addModal([
          {
            data: users,
            id: user._id,
            title: "Delete User",
            text: `Are you sure you want to delete this ${
              user.role.toLowerCase() === "admin" ? "Admin user" : "user"
            } ?`,
            type: "DELETE_USER",
          },
        ])
      );
      // }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUser = async () => {
    const results = initialUser.filter(
      ({ _id: id1, role: role1 }) =>
        !users.some(
          ({ _id: id2, role: role2 }) => id2 === id1 && !(role2 !== role1)
        )
    );

    const narrowResult = results.map((result) => ({
      id: result._id,
      role: result.role,
    }));
    if (narrowResult.length) {
      dispatch(updateUserRole({ narrowResult, initialUser }));
    } else {
      dispatch(setNotify({ error: "Please first update a role" }));
    }
  };

  useEffect(() => {
    if (users && users.length > 0) {
      setInitialUser(users);
    }
  }, [users]);

  useEffect(() => {
    let resultUsers = [];
    if (initialUser && initialUser.length > 0) {
      console.log(users.filter(({ role }) => role === "admin").length);
      resultUsers = initialUser.map((user, index, initialUser) => {
        return {
          select: index + 1,
          // select: (
          //   <Input style={{ height: "20px", width: "20px" }} type="checkbox" />
          // ),
          name: capitalize(user.fullname),
          email_id: user.email,
          registration_date: formatDate(user.createdAt),
          job_title: capitalize(user.job_profile),
          internal_user: (
            <Input
              disabled={
                auth.user.id === user._id &&
                users.filter(({ role }) => role === "admin").length === 1
                  ? true
                  : false
              }
              style={{ height: "20px", width: "20px" }}
              checked={user.role === "internal_user"}
              type="checkbox"
              onChange={() => changeRole(user._id, "internal_user")}
            />
          ),
          external_user: (
            <Input
              disabled={
                auth.user.id === user._id &&
                users.filter(({ role }) => role === "admin").length === 1
                  ? true
                  : false
              }
              style={{ height: "20px", width: "20px" }}
              checked={user.role === "external_user"}
              type="checkbox"
              onChange={() => changeRole(user._id, "external_user")}
            />
          ),
          admin: (
            <Input
              disabled={
                auth.user.id === user._id &&
                users.filter(({ role }) => role === "admin").length === 1
                  ? true
                  : false
              }
              style={{ height: "20px", width: "20px" }}
              checked={user.role === "admin"}
              type="checkbox"
              onChange={() => changeRole(user._id, "admin")}
            />
          ),
          delete: (
            <i
              onClick={() =>
                auth.user.id === user._id &&
                users.filter(({ role }) => role === "admin").length === 1
                  ? ""
                  : handleDelete(user)
              }
              className={`ri-delete-bin-7-line cursor-pointer ${
                auth.user.id === user._id &&
                users.filter(({ role }) => role === "admin").length === 1
                  ? "cursor-disabled"
                  : ""
              }`}
            ></i>
          ),
        };
      });
    }

    setAllUser(resultUsers);
    if (onSearchValue.length) {
      const results = resultUsers.filter(({ email_id: id1 }) =>
        onSearchValue.some(({ email_id: id2 }) => id2 === id1)
      );

      setTableUser(results);
    } else {
      setTableUser(resultUsers);
    }

    const resultFilterUsers = resultUsers.map((arr) => {
      return {
        key: uuidv4().toLowerCase(),
        value: arr.name.charAt(0).toUpperCase() + arr.name.slice(1),
        data: arr,
      };
    });

    setFilterUser(resultFilterUsers);
    // eslint-disable-next-line
  }, [users, initialUser, auth.user._id, refreshValues]);

  function changeRole(id, role) {
    const updatedRole = initialUser.map((user) =>
      user._id === id ? { ...user, role: role } : user
    );
    setInitialUser(updatedRole);
  }

  const data = useMemo(() => tableUser, [tableUser]);

  const columns = useMemo(
    () => [
      {
        Header: (
          <>
            Select{"  "}
            {/* <i className="ri-sort-desc"></i> */}
            <span
              className="cursor-pointer"
              onClick={() =>
                sortNumber(
                  users.map((user) => user),
                  setInitialUser,
                  setRefreshValues
                )
              }
            >
              <SortSvg />
            </span>
          </>
        ),
        accessor: "select", // accessor is the "key" in the data
      },
      {
        Header: (
          <>
            Name{"  "}
            <span
              className="cursor-pointer"
              onClick={() =>
                sortName(
                  users.map((user) => user),
                  setInitialUser,
                  setRefreshValues
                )
              }
            >
              <SortSvg />
            </span>
          </>
        ),
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: (
          <>
            Email Id{"  "}
            <span
              className="cursor-pointer"
              onClick={() =>
                sortEmail(
                  users.map((user) => user),
                  setInitialUser,
                  setRefreshValues
                )
              }
            >
              <SortSvg />
            </span>
          </>
        ),
        accessor: "email_id", // accessor is the "key" in the data
      },
      {
        Header: (
          <>
            Registration Date{"  "}
            <span
              className="cursor-pointer"
              onClick={() =>
                sortRegistrationDate(
                  users.map((user) => user),
                  setInitialUser,
                  setRefreshValues
                )
              }
            >
              <SortSvg />
            </span>
          </>
        ),
        accessor: "registration_date", // accessor is the "key" in the data
      },
      {
        Header: (
          <>
            Job Title{"  "}
            {/* <SortSvg /> */}
          </>
        ),
        accessor: "job_title", // accessor is the "key" in the data
      },
      {
        Header: (
          <>
            Internal User{"  "}
            {/* <SortSvg /> */}
          </>
        ),
        accessor: "internal_user", // accessor is the "key" in the data
      },
      {
        Header: (
          <>
            External User{"  "}
            {/* <SortSvg /> */}
          </>
        ),
        accessor: "external_user", // accessor is the "key" in the data
      },
      {
        Header: (
          <>
            Admin{"  "}
            {/* <SortSvg /> */}
          </>
        ),
        accessor: "admin", // accessor is the "key" in the data
      },
      {
        Header: "Delete",
        accessor: "delete", // accessor is the "key" in the data
      },
    ],
    [users]
  );

  useEffect(() => {
    if (auth.token) dispatch(getAllUsers());
    return () => dispatch(removeAllUsers());
  }, [dispatch, auth.token]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination);

  if (!auth.token && !auth.user.role === "admin") return <Redirect to="/" />;

  return (
    <>
      <div className="admin-wrap Ab-admin">
        <div className="col-12">
          <Modal showModal={showModal} toggleModal={toggleModal} />
          <h3 className="mb-3">Manage Users</h3>
          <div className="card mb-3" style={{ backgroundColor: "aliceblue" }}>
            <UserTableHeader
              filterUser={filterUser}
              setTableUser={setTableUser}
              allUser={allUser}
              handleUpdateUser={handleUpdateUser}
              tableUser={tableUser}
              setOnSearchValue={setOnSearchValue}
            />
            <UserTable
              getTableProps={getTableProps}
              headerGroups={headerGroups}
              getTableBodyProps={getTableBodyProps}
              page={page}
              prepareRow={prepareRow}
            />
          </div>
          <UserTableFooter
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageSized={pageSized}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
          />
        </div>
      </div>
    </>
  );
};

export default Admin;
