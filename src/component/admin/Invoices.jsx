import { useState, useEffect } from "react"
import { fetchData, showToastError, showToastMessage } from "../../global"
import Empty from "../Empty"
import { ToastContainer } from 'react-toastify'
import {commonformatDistanceToNow} from '../../helper/common'


export default function Invoices() { 

    const [invoices, setInvoices] = useState()


    async function getInvoices() { 
        const subUrl = '/admin/invoices'
        try { 
            const {data} = await fetchData(subUrl, 'GET')
            setInvoices(data)
        }
        catch({message}) {  
            showToastError(message)
        }
    }

    useEffect(() => {
        getInvoices()

    }, [])


    return <div>
    <div className="flex justify-between mt-10">
      <div className="flex gap-x-8 items-center h-12">
        <span className="font-medium uppercase text-sm">Invoices</span>
      </div>
      {/* <div className="flex items-center gap-x-8">
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
              type="search"
              id="decks-search"
              className="block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email..."
            />
          </div>
        </div>
      </div> */}
    </div>

    <hr className="my-8"></hr>

    {invoices && (
      <div className="">
        <div className="relative overflow-x-auto sm:rounded-md">
          <div className="flex justify-end gap-x-10 text-sm"></div>
          {invoices.length != 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-sm text-gray-700 ">
                <tr>
             
                  {/* <th scope="col" className="px-6 py-5">
                    Email
                  </th> */}
                  <th scope="col" className="px-6 py-5">
                    VnpResponseCode
                  </th>
                  <th scope="col" className="px-6 py-5">
                    VnpAmount
                  </th>
                  <th scope="col" className="px-6 py-5">
                    VnpBankCode
                  </th>
                  <th scope="col" className="px-6 py-5">
                    VnpCardType
                  </th>
                  <th scope="col" className="px-6 py-5">
                    VnpOrderInfo
                  </th>
                  <th scope="col" className="px-6 py-5">
                    VnpPayDate
                  </th>
         
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    {/* <td className="px-6 py-5 font-medium">
                        {invoice.user.email}
                    </td> */}

                  
                    <td className="px-6 py-5 font-medium">
                    {invoice.vnpResponseCode}
                    </td>
                    {/* <td className="px-6 py-5 font-medium">{user.lastName}</td> */}
                    <td className="px-6 py-5">
                    {invoice.vnpAmount}
                    </td>
                    <td className="px-6 py-5">{invoice.vnpBankCode}</td>
              
                    <td className="px-6 py-5">
                      {invoice.vnpCardType}
                    </td>
                    <td className=" py-5 text-ellipsis overflow-hidden whitespace-nowrap">
            
                    {invoice.vnpOrderInfo}
                    </td>
                    <td className="px-6 py-5">
                      {commonformatDistanceToNow(invoice.vnpPayDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty />
          )}
          {/* <hr className='my-4' /> */}
        </div>
      </div>
    )}
    <ToastContainer/>
  </div>
  

}