
import { useRef, useState} from "react"
import Empty from "../../../component/Empty";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import Modal from "react-modal";



import ModalCreateDeck from "../../../component/ModalCreateDeck";
import { useTranslation } from 'react-i18next';

function GlobalFilter({ globalFilter, setGlobalFilter, getDecks }) {
  const refModalCreateDeck = useRef();
  const { t } = useTranslation();

  async function handleShowModalCreateDeck() {
    refModalCreateDeck.current.show();
  }
  Modal.setAppElement("#root");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  // thiết lập step. 
  const [step,setStep] = useState(0); // thiết lập step. 
  

  return (
    <div className="flex justify-between mt-10">
      <div className="flex gap-x-8 items-center h-12">
        <span className="font-medium uppercase text-sm">Your card set</span>
      </div>
      <div className="flex items-center gap-x-8">
        {/* <button onClick={handleShowModalCreateDeck} className="">
          <img src="plus.png" className="w-9" alt="" />
        </button> */}
        <button onClick={openModal} type="button" className="flex gap-x-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
          <i class="fa-solid fa-plus"></i>
          <span>{t('ACTION.CREATE')}</span> 
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
      {/* <ModalCreateDeck
        getDecks={getDecks}
        ref={refModalCreateDeck}
      ></ModalCreateDeck> */}

      {/* modal form */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ cho overlay
          },
          content: {
            top: "100px",
            left: "0",
            right: "0",
            bottom: "auto",
            height: "calc(100% - 140px)", // Chiều cao modal tính từ vị trí cách top 48px đến cuối màn hình
            maxWidth: "70%", // Chiếm toàn bộ chiều ngang
            margin: "0 auto", // Căn giữa ngang
            padding: "40px",
            borderRadius: "8px",
            display: "flex",           // Thêm flexbox cho modal
            flexDirection: "column",    // Căn theo chiều dọc
          },
        }}
      >

        {/* title */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">Tạo bộ thẻ</h1>
          <i onClick={closeModal} className="fa-solid fa-xmark text-2xl cursor-pointer"></i>
        </div>
        <hr className="mt-4"/>

        {/*  steps */}
        <div className="mt-3 relative">
  <ol className="flex items-center w-full justify-between relative">
    {/* Step 1 */}
    <li className="flex items-center w-full text-blue-600 relative z-10">
      <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0">
        <svg
          className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      </span>
      <span className="ml-4 text-blue-600 font-semibold">Thiết lập bộ thẻ</span>
    </li>

    {/* Thanh ngang nằm giữa các bước */}
    <div className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[12px] flex items-center justify-between z-0">
  <div className="h-1 w-full bg-blue-100"></div>
</div>


    {/* Step 2 */}
    <li className="flex justify-end items-center w-full relative z-10">
      <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
        <svg
          className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
        </svg>
      </span>
      <span className="ml-4 text-gray-500 font-semibold">Thiết lập thẻ</span>
    </li>
  </ol>
</div>









        

        



        {/* content */}
        <div className="flex-1 mt-4">

          {step == 0 &&  <div>    

                <form className="relative rounded-md">

                <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Tên bộ thẻ
      </label>
      <input class=" appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Mô tả bộ thẻ
      </label>
      <input class=" appearance-none border  w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="password"/>
    </div>
    
<label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900">Public</span>
</label>

                  
                </form>

        </div>}

        {step == 1 && <div>

        </div>}

         
        </div>


        {/* footer */}
        <div className="flex justify-end mt-auto pt-4 border-t">


           

        <div className="flex gap-x-3">

     
        <div class="group flex cursor-pointer items-center justify-center rounded-md bg-indigo-700 px-6 py-[6px] text-white transition">
  <span class="group flex w-full items-center justify-center rounded py-1 text-center font-bold">Tiếp tục</span>
  <svg class="flex-0 ml-4 h-6 w-6 transition-all group-hover:ml-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</div>
           
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-[6px] px-5 border border-blue-500 hover:border-transparent rounded">
            Lưu
        </button>
        </div>
        </div>
       


      </Modal>
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
        getDecks={getDecks}
      />
      <hr className="my-8"></hr>

      {
        data.length != 0 ? (
          <div> 
          <table
           {...getTableProps()}
           className="w-full text-sm text-left rtl:text-right text-gray-500"
         >
           <thead className="text-sm text-gray-700 bg-[#fafafa]">
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
