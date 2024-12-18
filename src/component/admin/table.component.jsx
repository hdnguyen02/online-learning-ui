import React from "react"
import { useState } from "react";
import Empty from "../Empty";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

function GlobalFilter({ globalFilter, setGlobalFilter }) {

  return (
    <div className="flex justify-end mt-10">
      <div className="flex items-center gap-x-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value || undefined)}
              placeholder="Type to search..."
              className="block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

const TableComponent = ({
  columns,
  data,
  getDecks,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter, // Sử dụng hook tìm kiếm toàn cục
    useSortBy,
    usePagination
  );

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <hr className="my-8"></hr>

      {
        data.length != 0 ? (
          <div className="">

            <table
              {...getTableProps()}
              className="min-w-full bg-white dark:dark:bg-[#2E3856] border"
            >
              <thead className="py-4 px-3 bg-gray-200 dark:bg-gray-700">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="py-4 px-3 bg-gray-200 dark:bg-gray-700" // Áp dụng chiều rộng từ column.width
                      >
                        <div className="flex items-center space-x-4 font-medium text-[14px]">
                          {column.Header != "Action" && <span>{column.render("Header")}</span>}
                          {column.Header != "Action" && <i class="fa-solid fa-arrows-up-down"></i>}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 dark:divide-none min-h-[240px]">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="hover:bg-gray-100 dark:hover:bg-[#0A092D] h-12 divide-y divide-gray-100 dark:divide-y-0">
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="whitespace-nowrap text-sm h-12 px-3">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}

                {[...Array(Math.max(0, pageSize - page.length))].map((_, i) => (
                  <tr key={`empty-${i}`} className="h-12">
                    <td colSpan={headerGroups[0].headers.length} className="border-none bg-transparent"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 flex justify-end">
              <div className="flex gap-x-8 items-center">
                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      gotoPage(0);
                      setCurrentPage(0);
                    }}
                    className="dark:bg-[#2E3856] dark:border-none h-9 w-full bg-white placeholder:text-slate-400 text-sm border border-slate-200 pl-3 pr-8 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 appearance-none cursor-pointer"
                  >
                    {[5, 10, 15, 20, 25].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute h-5 w-5 top-[8.5px] right-4 fa-solid fa-circle-chevron-down" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </div>
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      className="flex items-center justify-center px-3 h-9 ms-0 leading-tight bg-white dark:bg-[#2E3856] dark:border-none dark:hover:bg-[#2E3856] dark:hover:text-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: pageCount }, (_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handlePageClick(index)}
                        className={`flex items-center justify-center px-4 h-9 leading-tight border 
                    ${currentPage === index
                            ? "bg-blue-500 text-white border-blue-500 dark:border-none"
                            : "bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                          }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}


                  <li>
                    <button
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                      className="flex items-center justify-center px-3 h-9 ms-0 leading-tight bg-white dark:bg-[#2E3856] dark:border-none dark:hover:bg-[#2E3856] dark:hover:text-white border  border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Next
                    </button>
                  </li>
                </ul>

              </div>
            </div>


            {/* <div className="mt-4 flex justify-between">
              <div>
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                  className="ml-2 h-8 border border-gray-300 rounded"
                >
                  {[5, 10, 15, 20, 25].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-x-12 items-center">
                <div>
                  <div>
                    <ul className="inline-flex -space-x-px text-sm">
                      <li>
                        <button
                          onClick={() => previousPage()}
                          disabled={!canPreviousPage}
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: pageCount }, (_, index) => (
                        <li key={index}>
                          <button
                            onClick={() => gotoPage(index)}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={() => nextPage()}
                          disabled={!canNextPage}
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        ) : <Empty></Empty>
      }

    </div>
  );
};

export default TableComponent;
