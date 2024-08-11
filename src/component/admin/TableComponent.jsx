import React, { useRef} from "react"
import Empty from "../Empty";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

import ModalCreateDeck from "../../component/ModalCreateDeck";

// Bộ lọc tìm kiếm toàn cục
function GlobalFilter({ globalFilter, setGlobalFilter }) {

  return (
    <div className="flex justify-between mt-10">
      <div className="flex gap-x-8 items-center h-12">
        <span className="font-medium uppercase text-sm">Users</span>
      </div>
      <div className="flex items-center gap-x-8">
        {/* <button onClick={handleShowModalCreateDeck} className="">
          <img src="plus.png" className="w-9" alt="" />
        </button> */}
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

  return (
    <>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <hr className="my-8"></hr>

      {
        data.length != 0 ? (
          <div>
      
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
       </div>
       </div>
        ) : <Empty></Empty>
      }

    </>
  );
};

export default TableComponent;
