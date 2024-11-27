

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
        <span className="font-medium uppercase text-sm">Your card set</span>
      </div>
      <div className="flex items-center gap-x-8">
        <DeckCreateForm getDecks={getDecks}/>
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
    <>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        getDecks={getDecks}
      />
      <hr className="my-8"></hr>

      {
        data.length != 0 ? (
          <div className="">

            <div className="flex flex-col min-h-[300px] h-[300px] overflow-x-hidden overflow-y-scroll border rounded">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table
                      {...getTableProps()}
                      className="min-w-full divide-y divide-gray-200"
                    >
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="px-6 py-5 text-start text-xs font-medium uppercase bg-gray-50"
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
                      <tbody
                        {...getTableBodyProps()}
                        className="divide-y divide-gray-200"
                      >
                        {page.map((row) => {
                          prepareRow(row);
                          return (
                            <tr
                              {...row.getRowProps()}
                              className="hover:bg-gray-100"
                            >
                              {row.cells.map((cell) => (
                                <td
                                  {...cell.getCellProps()}
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                                >
                                  {cell.render("Cell")}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>




            <div className="mt-4 flex justify-between">
              <div>
                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      gotoPage(0); 
                      setCurrentPage(0); 
                    }}
                    required
                    className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
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
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>




              </div>

              <div className="flex gap-x-12 items-center">
                <div>
                  <div>
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
              </div>
            </div>
          </div>
        ) : <Empty></Empty>
      }
    </>
  );
};

export default TableComponent;
