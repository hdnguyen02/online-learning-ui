import React, { useMemo, useState, useEffect, useRef  } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table"

import ModalCreateCard from "./ModalCreateCard";


// Bộ lọc tìm kiếm toàn cục
function GlobalFilter ({ globalFilter, setGlobalFilter,getCards, decks }) {


    const refModalCreateCard = useRef()

    async function handleShowModalCreateCard() {
        refModalCreateCard.current.show()
    }

    return <div className="flex justify-between mt-10">
    <div className="flex gap-x-8 items-center h-12">
      <span className="font-medium uppercase text-sm">Your card</span>
    </div>
    <div className="flex items-center gap-x-8">
      <button onClick={handleShowModalCreateCard} className="">
        <img  src="plus.png" className="w-9" alt="" />
      </button>
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
    <ModalCreateCard decks={decks} getCards={getCards} ref={refModalCreateCard} />
  </div>
} 

const TableComponent = ({ columns, data, handleEdit, handleDelete, getCards, decks }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Sử dụng `page` thay vì `rows` cho phân trang
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

  return (
    <>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        getCards={getCards}
        decks={decks}
      />

      <hr className="my-8"></hr>
      <table
        {...getTableProps()}
        className="w-full text-sm text-left rtl:text-right text-gray-500"
      >
        <thead className="text-sm text-gray-700 uppercase">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-5"
                >
                  {column.render("Header")}
                  <span className="ml-2">
                  <i className="fa-solid fa-sort opacity-60"></i>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="odd:bg-gray-100 even:bg-white"
              >
                {row.cells.map((cell) => (
                  <td className="px-6 py-5" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
        <div className="flex gap-x-12 items-center">
        <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <i className="fa-solid fa-angles-left text-2xl"></i>
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="ml-4"
        >
          <i className="fa-solid fa-angles-right text-2xl"></i>
        </button>
        </div>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          {[5, 10, 15, 20, 25].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        </div>
       
       

        {/* <span>
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="w-12 h-12"
          />
        </span> */}
    
      </div>
    </>
  );
};

export default TableComponent;
