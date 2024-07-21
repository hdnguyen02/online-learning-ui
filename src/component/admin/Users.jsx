import { useState, useEffect } from "react"
import { fetchData, showToastError, showToastMessage } from "../../global"
import Empty from "../Empty"
import { ToastContainer } from 'react-toastify'

export default function Users() {
  const [users, setUsers] = useState()

  async function getUsers() {
    const subUrl = "/admin/users"
    try {
      const { data } = await fetchData(subUrl, "GET")
      setUsers(data)
      console.log(data)
    } catch ({message}) {
        showToastError(message)
    }
  }

  async function handleChangeEnableUser(event, emailUser) {
      const checked = event.target.checked
      console.log(checked)
    const subUrl = `/admin/users?emailUser=${emailUser}&isEnabled=${checked}`

    try {
      const { message } = await fetchData(subUrl, "PUT")
      showToastMessage(message)
    } catch ({ message }) {
      showToastError(message)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // useEffect(() => {
  //     async function search() {
  //         const subUrl = `/cards/search?content=${searchContent}`
  //         try {
  //             const response = await fetchData(subUrl, 'GET')
  //             setCards(response.data)
  //         }
  //         catch (error) { console.log(error.message) }
  //     }
  //     search()
  // }, [searchContent])

  return (
    <div>
      <div className="flex justify-between mt-10">
        <div className="flex gap-x-8 items-center h-12">
          <span className="font-medium uppercase text-sm">Users</span>
        </div>
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
                type="search"
                id="decks-search"
                className="block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email..."
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8"></hr>

      {users && (
        <div className="">
          <div className="relative overflow-x-auto sm:rounded-md">
            <div className="flex justify-end gap-x-10 text-sm"></div>
            {users.length != 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-sm text-gray-700 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-5 font-medium  text-gray-900"
                    ></th>
                    <th scope="col" className="px-6 py-5">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-5">
                      FirstName
                    </th>
                    <th scope="col" className="px-6 py-5">
                      LastName
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Birth date
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Enabled
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="odd:bg-gray-100 even:bg-white">
                      <td className="px-6 py-5 font-medium">
                        <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                          <img
                            src={user.avatar ? user.avatar : "/user.png"}
                            loading="lazy"
                            className="w-full h-full"
                            alt=""
                          />
                        </div>
                      </td>

                      <td className="px-6 py-5 font-medium">{user.email}</td>
                      <td className="px-6 py-5 font-medium">
                        {user.firstName}
                      </td>
                      <td className="px-6 py-5 font-medium">{user.lastName}</td>
                      <td className="px-6 py-5">
                        {user.dateOfBirth != null ? user.dateOfBirth : "None"}
                      </td>
                      <td className="px-6 py-5">-</td>
                      <td className="px-6 py-5">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            defaultChecked={user.isEnabled}
                            onChange={(event) =>
                              handleChangeEnableUser(event, user.email)
                            }
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        
                        </label>
                      </td>
                      <td className="px-6 py-5">
                        {user.gender != null ? user.gender : "None"}
                      </td>
                      <td className="px-6 py-5">
                        {user.phone != null ? user.phone : "None"}
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
    
  )
}
