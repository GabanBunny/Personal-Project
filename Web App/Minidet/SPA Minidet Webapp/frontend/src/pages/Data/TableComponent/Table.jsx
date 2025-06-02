import React, { useEffect } from "react";
import "./Table.css";
import { ColumnVisibilityDropdown } from "./ColumnVisibilityDropdown ";
import { PaginationComponent } from "./Paigination";
import { QueryBar } from "./QueryBar";
import { NumberOfRows } from "./NumberOfRows";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ColumnDefinition } from "./Column";

const TableComponent = () => {
  // Query data
  const [queryData, setQueryData] = React.useState({});

  // Table data
  const [data, setData] = React.useState([]);

  // Table pagination
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Sorting
  const [sorted, setSort] = React.useState([]);

  // Filtering
  const [filtered, setFilter] = React.useState("");

  // Column Visibility
  const [visible, setVisible] = React.useState({});

  // Total number of pages
  const [totalPages, setTotalPage] = React.useState(0);

  useEffect(() => {
    // Render Query Data
    if (Object.values(queryData).length > 0) {
      setData(Object.values(queryData)[0]);
      setTotalPage(Object.values(queryData)[1] || 0);
    } else {
      //Render normal data
      getData(pagination.pageIndex, pagination.pageSize).then((inputData) => {
        if (inputData && Array.isArray(inputData.data)) {
          setData(inputData.data); // Set valid data array
          setTotalPage(inputData.total_page || 0); // Set total pages
        } else {
          setData([]); // Fallback empty array
          setTotalPage(0);
        }
      });
    }
    const interval = setInterval(() => {
      if (Object.values(queryData).length > 0) {
        setData(Object.values(queryData)[0]);
        setTotalPage(Object.values(queryData)[1] || 0);
      } else {
        getData(pagination.pageIndex, pagination.pageSize).then((inputData) => {
          if (inputData && Array.isArray(inputData.data)) {
            setData(inputData.data); // Set valid data array
            setTotalPage(inputData.total_page || 0); // Set total pages
          } else {
            setData([]); // Fallback empty array
            setTotalPage(0);
          }
        });
      }
    }, 1300);
    return () => {
      clearInterval(interval);
    };
  }, [pagination.pageIndex, pagination.pageSize, queryData]);

  const TableInstance = useReactTable({
    // React.useMemo hook to memoize the columns definition => Avoid re-render
    columns: React.useMemo(() => ColumnDefinition, []),
    data:
      Object.values(queryData).length > 0 ? Object.values(queryData)[0] : data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
    manualPagination: true,
    pageCount: Math.ceil(totalPages / pagination.pageSize),
    // update pagination state
    onPaginationChange: setPagination,
    onSortingChange: setSort,
    onGlobalFilterChange: setFilter,
    onColumnVisibilityChange: setVisible,
    state: {
      sorting: sorted,
      pagination,
      globalFilter: filtered,
      columnVisibility: visible,
    },
    enableMultiSort: true,
    // Press ctrl or shift for multi-level sorting
    isMultiSortEvent: (e) => e.ctrlKey,
    isSortEvent: (e) => e.shiftKey,
  });

  return (
    <div id="TableContainer">
      <div id="topOfTable">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "330px",
          }}
        >
          {/* Reset buttons */}
          <div
            style={{
              borderRadius: "8px",
              width: "100px",
              display: "flex",
              justifyContent: "space-evenly",
              border: "1px solid",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 32 32"
            >
              <path
                fill="#000"
                d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"
              ></path>
            </svg>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "16px",
                outline: "none",
              }}
              onClick={() => {
                TableInstance.setColumnFilters([]);
                setQueryData([]);
              }}
            >
              Reset
            </button>
          </div>
          {/* Column visibility */}
          <ColumnVisibilityDropdown TableInstance={TableInstance} />

          {/* Number Of Rows  */}
          <NumberOfRows setPagination={setPagination} isDataTable={true} />
        </div>
        {/* Query Bar */}
        <QueryBar
          queryData={queryData}
          setQueryData={setQueryData}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
        />
      </div>

      {/* Table */}
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
                      {/* Dropbox filtering */}
                      {columnElement.column.columnDef.header === "Anomaly" && (
                        <select
                          onChange={(e) =>
                            columnElement.column.setFilterValue(e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option></option>
                          <option>true</option>
                          <option>false</option>
                        </select>
                      )}
                      {columnElement.column.columnDef.header ===
                        "Attack Name" && (
                        <select
                          onChange={(e) =>
                            columnElement.column.setFilterValue(e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option></option>
                          <option>Benign</option>
                          <option>backdoor</option>
                          <option>ddos</option>
                          <option>dos</option>
                          <option>injection</option>
                          <option>mitm</option>
                          <option>password</option>
                          <option>ransomware</option>
                          <option>scanning</option>
                          <option>xss</option>
                        </select>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {TableInstance.getRowModel().rows.map((rowElement) => {
            return (
              <tr key={rowElement.id}>
                {rowElement.getVisibleCells().map((cellElement) => {
                  return (
                    <td key={cellElement.id}>
                      {flexRender(
                        cellElement.column.columnDef.cell,
                        cellElement.getContext()
                      )}
                    </td>
                  );
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

async function getData(pageIndex, pageSize) {
  const endpoint = `/api/data/table?currentPage=${pageIndex}&pageSize=${pageSize}`;
  try {
    //Read data
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { data: [], total: 0 };
    }
    // data = empty and 0 total page
  } catch (error) {
    console.error("Error fetching table data:", error);
  }
}
export default TableComponent;
