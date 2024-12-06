

import Empty from "component/Empty";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";





import { useTranslation } from 'react-i18next';
import DeckCreateForm from './deck-create-form.component'
import { useState } from "react";

function GlobalFilter({ globalFilter, setGlobalFilter, getDecks }) {

  const { t } = useTranslation();

  return (
    <div className="flex justify-between mt-10">
      <div className="flex gap-x-8 items-center h-12">
        {/* <span className="font-medium uppercase text-sm">Your card set</span> */}

        

<div className="flex" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse cursor-pointer">
    <li className="inline-flex items-center">
      <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Thư viện của bạn
      </span>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">Bộ thẻ</span>
      </div>
    </li>
   
  </ol>
</div>

      </div>
      <div className="flex items-center gap-x-8">
        <DeckCreateForm getDecks={getDecks} />
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
              className="block w-full  px-4 h-10 ps-10 text-sm border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
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
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (index) => {
    setCurrentPage(index); // Cập nhật trạng thái trang hiện tại
    gotoPage(index); // Gọi hàm để thực hiện logic chuyển trang
  };




  return (
    <div>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        getDecks={getDecks}
      />
      <hr className="my-8"></hr>

      {
        data.length != 0 ? (
          <div className="">

            <div className="flex flex-col border rounded">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="">
                    <table {...getTableProps()} className="min-w-full bg-white">
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="py-4 px-3 bg-gray-200" // Áp dụng chiều rộng từ column.width
                              >
                                <div className="flex items-center space-x-4 font-medium text-[14px]">
                                  { column.Header != "Action" && <span>{column.render("Header")}</span> }
                                  {
                                    column.Header != "Action" && <img src="/src/assets/image/sort.png" className="w-4 h-4" alt="Sort icon" />
                                  }

                                </div>
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>

                      <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 min-h-[240px]">
                        {page.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-100 h-12 divide-y divide-gray-100">
                              {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} className="whitespace-nowrap text-sm text-gray-800 h-12 px-3">
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

                  </div>
                </div>
              </div>
            </div>

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
                    className="h-9 w-full bg-white placeholder:text-slate-400 text-sm border border-slate-200 pl-3 pr-8 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 appearance-none cursor-pointer"
                  >
                    {[5, 10, 15, 20, 25].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.2"
                    stroke="currentColor"
                    className="h-5 w-5 absolute top-2 right-4 text-slate-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      className="flex items-center justify-center px-3 h-9 ms-0 leading-tight bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
                            ? "bg-blue-500 text-white border-blue-500"
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
                      className="flex items-center justify-center px-3 h-9 leading-tight  bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700"
                    >
                      Next
                    </button>
                  </li>
                </ul>

              </div>
            </div>
            {/* </div> */}

          </div>
        ) : <Empty></Empty>
      }
    </div>
  );
};

export default TableComponent;
