import { useEffect, useState } from "react";
import { fetchData, showToastError } from "../global";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Empty from "../component/Empty";
import { customFormatDistanceToNow } from "../global";

export default function GlobalGroups() {
  const [globalGroups, setGlobalGroups] = useState();

  async function getGlobalGroups() {
    try {
      const subUrl = "/global/groups";
      const { data } = await fetchData(subUrl, "GET");
      setGlobalGroups(data);
    } catch (error) {
      showToastError(error.message);
    }
  }

  useEffect(() => {
    getGlobalGroups();
  }, []);

  return (
    globalGroups && (
      <>
        <div className="profile flex gap-x-3 items-center justify-between h-12">
          {/* <span className="font-medium uppercase text-sm">Study group</span> */}

          <div className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse cursor-pointer">
              <li className="inline-flex items-center">
                <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Chuyên gia
                </span>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">Lớp học</span>
                </div>
              </li>

            </ol>
          </div>
          <div className="flex gap-x-8 items-center">
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
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                  type="search"
                  id="decks-search"
                  className="block w-full px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name, description..."
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8" />

        {/* {globalGroups.length != 0 ? (
          <div className="mb-12 grid grid-cols-2 gap-12">
            {globalGroups.map((globalGroup, index) => (
              <div key={index}>
                <span className="uppercase text-xs">{customFormatDistanceToNow(globalGroup.created)}</span>
                <div key={index} className="bg-[#F0F6F6] p-6 rounded mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <div className="rounded-full h-10 w-10 overflow-hidden cursor-pointer">
                        <img
                          src={
                            globalGroup.owner.avatar
                              ? globalGroup.owner.avatar
                              : "/user.png"
                          }
                          loading="lazy"
                          className="w-full h-full"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="flex gap-x-2 items-center">
                          <span className="font-bold text-xl">
                            {globalGroup.name}
                          </span>
                          <span>({globalGroup.quantityMembers} member)</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                          <Link to={`/users/${globalGroup.owner.email}`} className="text-sm text-blue-600 underline">
                            {globalGroup.owner.firstName +
                              " " +
                              globalGroup.owner.lastName}
                          </Link>

                          {globalGroup.owner.roles.map((role, index) => {
                            return (
                              <span
                                key={index}
                                className="lowercase text-xs bg-gray-300 p-1 rounded-lg"
                              >
                                {role}
                              </span>
                            );
                          })}
                        </div>
                        <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                    {globalGroup.description}
                  </div>
                      </div>
                    </div>
                    <div>
            

                      <Link
                      to={`/groups/${globalGroup.id}`}
         
                      className="flex items-center gap-x-2 h-8 text-blue-900 hover:text-white border border-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 text-center"
                    >
                      <span>Detail</span>

                      <i className="fa-regular fa-eye"></i>
                    </Link>
                    </div>
                  </div>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )} */}


        {globalGroups.length != 0 ? (
          <div className='mb-12 grid grid-cols-2 gap-12'>
            {globalGroups.map((group, index) => (
              <div index={index}>
                <span className='text-sm text-gray-800'>{customFormatDistanceToNow(group.createdDate)}</span>
                <div className="shadow mt-3 flex justify-between gap-x-6 py-5 border p-4 rounded-lg bg-white">
                  <div className="flex min-w-0 gap-x-4">
                    <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900 uppercase">{group.name}</p>

                      <Link className="mt-1 truncate text-xs/5 text-gray-500 underline" to={`/users/${group.owner.id}`}
                      >
                        {group.owner.email}
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-x-3 items-center font-medium">

                    <div className='flex gap-x-2 items-center'>

                      <div className="mt-1 flex gap-x-2 items-center">
                        {group.quantityCommonDecks}
                        <i class="fa-solid fa-folder"></i>
                      </div>

                      <div className="mt-1 flex gap-x-2 items-center">
                        {group.quantityMembers}
                        <i class="fa-solid fa-user"></i>
                      </div>

                    </div>


                    <Link to={`/groups/${group.id}`} type='button' className='rounded-md bg-slate-800 py-1.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'>
                      Detail
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}



        <ToastContainer />
      </>
    )
  );
}
