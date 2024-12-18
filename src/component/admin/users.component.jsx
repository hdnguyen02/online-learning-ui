import React, { useMemo, useState, useEffect, useRef } from "react";
import TableComponent from "./table.component";
import { fetchData, showToastError, showToastMessage } from "../../global";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


import { customFormatDistanceToNow } from "../../global";

const UsersComponent = () => {
  const [data, setData] = useState([]);


  async function getUsers() {
    const subUrl = "/admin/users";
    try {
      const { data } = await fetchData(subUrl, "GET");
      setData(data);
      console.log(data);
    } catch ({ message }) {
      showToastError(message);
    }
  }

  async function handleChangeEnableUser(event, emailUser) {
    const checked = event.target.checked;
    console.log(emailUser);
    const subUrl = `/admin/users?emailUser=${emailUser}&isEnabled=${checked}`;

    try {
      const { message } = await fetchData(subUrl, "PUT");
      showToastMessage(message);
    } catch ({ message }) {
      showToastError(message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "avatar",
        Cell: ({ value }) => (
          <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
            <img
              src={value ? value : "/user.png"}
              loading="lazy"
              className="w-full h-full"
              alt=""
            />
          </div>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "First name",
        accessor: "firstName",
      },
      {
        Header: "Last name",  
        accessor: "lastName",
      },
      { 
        Header: "Gender",  
        accessor: "gender",
        Cell: ({ value }) => {
          return value === 'MALE' ? (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              Male
            </span>
          ) : (
            <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Female</span>

          );
        },
        
      },
      // {
      //   Header: "Roles",
      //   accessor: "roles",
      //   Cell: ({ value }) => (
      //     <div>
      //       {value?.map((role, index) => (
      //         <span
      //           key={index}
      //           className="lowercase text-xs mr-2 bg-gray-300 p-1 rounded-lg"
      //         >
      //           {role}
      //         </span>
      //       ))}
      //     </div>
      //   ),
      // },
      {
        Header: "Created At",
        accessor: "createdDate",
        Cell: ({ value }) => customFormatDistanceToNow(value),
      },
      {
        Header: "Enable",
        accessor: "isEnabled",
        Cell: ({ value, row }) => (
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                defaultChecked={value}
                onChange={(event) =>
                  handleChangeEnableUser(event, row.original.email)
                }
                type="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <TableComponent columns={columns} data={data} getUsers={getUsers} />
      <ToastContainer />
    </div>
  );
};

export default UsersComponent;
