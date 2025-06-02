import React, { useEffect } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ColumnDefinition } from "./Column";
import { NumberOfRows } from "../../Data/TableComponent/NumberOfRows";
import { PaginationComponent } from "../../Data/TableComponent/Paigination";
import { ColumnVisibilityDropdown } from "../../Data/TableComponent/ColumnVisibilityDropdown ";
import { AddUser } from "./AddUser";
import { AddUserForm } from "./AddUserForm";

const TableComponent = () => {
  // Delete user
  const [deletedUser, setDeletedUser] = React.useState("");

  // Add user
  const [addUserStatus, setAddUserStatus] = React.useState(null);

  // Delete message when failed
  const [failedDelete, setFailedDelete] = React.useState("");

  // User data (User, password, Name,Surname)
  const [data, setData] = React.useState([]);

  // Total number of pages
  const [totalPages, setTotalPage] = React.useState(0);

  // Table Paginatnion
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  });

  // Sorting
  const [sorted, setSort] = React.useState([]);

  // Column Visibility
  const [visible, setVisible] = React.useState({});

  // Add user scale
  const [scale, setScale] = React.useState(1);

  // Update table
  useEffect(() => {
    getUser(pagination.pageIndex, pagination.pageSize).then((inputData) => {
      setData(inputData.data);
      setTotalPage(inputData.total_page || 0);
    });
  }, [pagination.pageIndex, pagination.pageSize, deletedUser, addUserStatus]);

  // Update add user size
  useEffect(() => {
    const ratio = 0.8 + (window.innerWidth / 1920) * 0.45;

    setScale(ratio);
  }, [window.innerWidth]);

  const TableInstance = useReactTable({
    columns: React.useMemo(() => ColumnDefinition, []),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
    manualPagination: true,
    pageCount: Math.ceil(totalPages / pagination.pageSize),
    onPaginationChange: setPagination, //For changing number of rows
    onSortingChange: setSort, //For setting sorted columns
    onColumnVisibilityChange: setVisible, //For set number of visible columns
    state: {
      sorting: sorted,
      pagination,
      columnVisibility: visible,
    },
    enableMultiSort: true,
    // Press ctrl or shift for multi-level sorting
    isMultiSortEvent: (e) => e.ctrlKey,
    isSortEvent: (e) => e.shiftKey,
  });

  // User Clicked addUser
  const [buttonClicked, setButtonClicked] = React.useState(false);

  return (
    <div
      style={{
        marginTop: "5px",
        paddingTop: "5px",
        paddingBottom: "5px",
      }}
    >
      {/* Add User */}
      {buttonClicked ? (
        <div style={{ transform: `scale(${scale})` }}>
          <AddUserForm
            setButtonClicked={setButtonClicked}
            setAddUserStatus={setAddUserStatus}
            addUserStatus={addUserStatus}
          />
        </div>
      ) : null}

      <div
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          {/* Column visibility */}
          <ColumnVisibilityDropdown TableInstance={TableInstance} />

          {/* Number Of Rows  */}
          <NumberOfRows setPagination={setPagination} isDataTable={false} />
        </div>

        {/* Add User */}
        <AddUser setButtonClicked={setButtonClicked} />
      </div>

      <table>
        <thead>
          {TableInstance.getHeaderGroups().map((headerElement) => {
            return (
              <tr key={headerElement.id}>
                {headerElement.headers.map((columnElement) => {
                  return (
                    <th
                      key={columnElement.id}
                      colSpan={columnElement.colSpan}
                      onClick={columnElement.column.getToggleSortingHandler()}
                    >
                      {/* Render header */}
                      {flexRender(
                        columnElement.column.columnDef.header,
                        columnElement.getContext()
                      )}
                      {/* Up and Down Sorting */}
                      {/* Sorting */}
                      {
                        { asc: " ↑", desc: " ↓" }[
                          // Return the Sorting state ↑ or ↓ or null
                          columnElement.column.getIsSorted() ?? null
                        ]
                      }
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {/* Render table body content */}
          {TableInstance.getRowModel().rows.map((rowElement) => {
            return (
              <tr key={rowElement.id}>
                {rowElement.getVisibleCells().map((cellElement) => {
                  // Specific rows to delete

                  if (cellElement.column.id == " ") {
                    return (
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "90%",
                        }}
                        key={cellElement.id}
                      >
                        {/* Can't delete message */}
                        {failedDelete &&
                        cellElement.row.original == failedDelete ? (
                          <div
                            style={{
                              width: "150px",
                              marginRight: "50px",
                              backgroundColor: "#fedce0",
                              borderRadius: "5px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "13px",
                                margin: "5px",
                                color: "#8e2b25",
                              }}
                            >
                              {`Cannot delete 
                            ${cellElement.row.original.username}`}
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {/* Remove user button */}
                        <button
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: " 5px",
                            border: "none",
                          }}
                          onClick={async () => {
                            const response = await removeUser(
                              cellElement.row.original
                            );
                            if (response["delete status"] === "success") {
                              setDeletedUser(cellElement.row.original);
                            } else if (response["delete status"] === "failed") {
                              setFailedDelete(cellElement.row.original);
                            }
                          }}
                          onMouseDown={(e) =>
                            (e.currentTarget.style.backgroundColor = "#e0e0e0")
                          }
                          onMouseUp={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          {/* Delete button */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="black"
                              d="m170.5 51.6l-19 28.4h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6h-93.7c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6l36.7 55H424c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v304c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128h-8c-13.3 0-24-10.7-24-24s10.7-24 24-24h69.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128v304c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32V128zm80 64v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16m80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16m80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16"
                            />
                          </svg>
                        </button>
                      </td>
                    );
                  }
                  // Normal rows content
                  else {
                    return (
                      <td key={cellElement.id}>
                        {flexRender(
                          cellElement.column.columnDef.cell,
                          cellElement.getContext()
                        )}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Paigination */}
      <PaginationComponent TableInstance={TableInstance} />
    </div>
  );
};

async function getUser(pageIndex, pageSize) {
  const endpoint = `/api/data/user?currentPage=${pageIndex}&pageSize=${pageSize}`;
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { data: [], total: 0 };
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
}

async function removeUser(userRow) {
  const endpoint = `/api/remove/user`;
  const settings = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userRow }),
  };

  try {
    const response = await fetch(endpoint, settings);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error deleting user", error);
  }
}
export default TableComponent;
