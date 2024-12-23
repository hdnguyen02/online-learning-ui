import { useEffect, useState } from "react";
import { fetchData, showToastError, showToastMessageV2 } from "../global";
import { Link } from "react-router-dom";
import Empty from "../component/Empty";
import { customFormatDistanceToNow } from "../global";
import { useNavigate } from "react-router-dom";


import useAuth from "../context/AuthContext";

export default function GlobalGroups() {

  const [groupsJoined, setGroupsJoined] = useState(null);
  const [groups, setGroups] = useState(null);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const [globalGroups, setGlobalGroups] = useState();
  const [searchTerm, setSearchTerm] = useState();
  async function getGroupsGlobal() {
    try {
      const subUrl = "/groups/global";
      const { data } = await fetchData(subUrl, "GET");
      console.log("data: ", data);
      // setGlobalGroups(data);
      console.log(data.groups); 
      setGroups(data.groups);
      setGroupsJoined(data.groupsJoined);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleJoinGroup(id) {
    try {
      const subUrl = `/groups/${id}/join`;
      const { message } = await fetchData(subUrl, 'POST');

      showToastMessageV2(message, () => {
        navigate(`/groups/detail-attendance/${id}/members`);
      },);
    }
    catch (error) {
      showToastError(error.message);
    }
  }

  const onDetailGroup = (id, emailOwner) => {
    if (auth.email == emailOwner) {
      navigate(`detail-owner/${id}/members`);
    }
    else {
      navigate(`detail-attendance/${id}/members`);
    }

  }



  useEffect(() => {
    getGroupsGlobal();
  }, []);


  const [isOpenGroupsJoined, setIsOpenGroupsJoined] = useState(true);
  const [isOpenGroups, setIsOpenGroups] = useState(true);


  const toggleAccordionGroupsJoined = () => {
    setIsOpenGroupsJoined(!isOpenGroupsJoined);
  };

  const toggleAccordionGroups = () => {
    setIsOpenGroups(!isOpenGroups);
  };




  return (
    <div>


      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            onClick={toggleAccordionGroupsJoined} // Khi nhấn vào, thay đổi trạng thái
            aria-expanded={isOpenGroupsJoined} // Cập nhật trạng thái mở/đóng
            aria-controls="accordion-collapse-body-1"
          >
            <span className="text-gray-900">Nhóm học tập của bạn</span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 ${isOpenGroupsJoined ? 'rotate-180' : ''} shrink-0`} // Xoay icon khi mở
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`transition-all duration-300 ${isOpenGroupsJoined ? 'block' : 'hidden'}`} // Thêm hiệu ứng chuyển động khi mở/đóng
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            {/* Nội dung accordion */}
            <div>
              {groupsJoined?.length !== 0 ? (
                <div className="mb-12 grid grid-cols-2 gap-12">
                  {groupsJoined?.map((groupJoined, index) => (
                    <div key={index}>
                      <span className="text-sm text-gray-800 dark:text-white">
                        {customFormatDistanceToNow(groupJoined.createdDate)}
                      </span>
                      <div className="shadow mt-3 flex justify-between gap-x-6 py-5 border dark:border-none p-4 rounded-md bg-white dark:bg-[#2E3856]">
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            className="size-12 flex-none rounded-full bg-gray-50"
                            src="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png"
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900 dark:text-white uppercase truncate">
                              {groupJoined.name}
                            </p>
                            <Link className="mt-1 truncate text-xs/5 text-gray-500 dark:text-white">
                              {groupJoined.emailOwner}
                            </Link>
                          </div>
                        </div>
                        <div className="flex gap-x-3 items-center font-medium">
                          <div className="mt-1 flex gap-x-2 items-center">
                            {groupJoined.commonDeckCount}
                            <i className="fa-solid fa-folder"></i>
                          </div>
                          <div className="mt-1 flex gap-x-2 items-center">
                            {groupJoined.memberCount}
                            <i className="fa-solid fa-user"></i>
                          </div>
                          <div onClick={() => onDetailGroup(groupJoined.id, groupJoined.emailOwner)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm w-24 flex justify-center py-1.5 me-2 cursor-pointer">
                            Chi tiết
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty></Empty>
              )}
            </div>
          </div>
        </div>




      </div>







      <div id="accordion-collapse" className="mt-12" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            onClick={toggleAccordionGroups} // Khi nhấn vào, thay đổi trạng thái
            aria-expanded={isOpenGroups} // Cập nhật trạng thái mở/đóng
            aria-controls="accordion-collapse-body-1"
          >
            <span className="text-gray-900">Nhóm học tập</span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 ${isOpenGroups ? 'rotate-180' : ''} shrink-0`} // Xoay icon khi mở
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`transition-all duration-300 ${isOpenGroups ? 'block' : 'hidden'}`} // Thêm hiệu ứng chuyển động khi mở/đóng
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            {/* Nội dung accordion */}
            
            <div>
              {groups?.length !== 0 ? (
                <div className="mb-12 grid grid-cols-2 gap-12">
                  {groups?.map((group, index) => (
                    <div key={index}>            
                      <span className="text-sm text-gray-800 dark:text-white">
                        {customFormatDistanceToNow(group.createdDate)}
                      </span>
                      <div className="shadow mt-3 flex justify-between gap-x-6 py-5 border dark:border-none p-4 rounded-md bg-white dark:bg-[#2E3856]">
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            className="size-12 flex-none rounded-full bg-gray-50"
                            src="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png"
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900 dark:text-white uppercase truncate">
                              {group.name}
                            </p>
                            <Link className="mt-1 truncate text-xs/5 text-gray-500 dark:text-white">
                              {group.emailOwner}
                            </Link>
                          </div>
                        </div>
                        <div className="flex gap-x-3 items-center font-medium">
                          <div className="mt-1 flex gap-x-2 items-center">
                            {group.commonDeckCount}
                            <i className="fa-solid fa-folder"></i>
                          </div>
                          <div className="mt-1 flex gap-x-2 items-center">
                            {group.memberCount}
                            <i className="fa-solid fa-user"></i>
                          </div>
                          <div onClick={() => handleJoinGroup(group.id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm  w-24 flex justify-center py-1.5 me-2 cursor-pointer">
                            Tham gia
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty></Empty>
              )}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};





