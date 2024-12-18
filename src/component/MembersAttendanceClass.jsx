import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData, showToastError, customFormatDistanceToNow } from "../global";
import { ToastContainer } from "react-toastify";
import Empty from './Empty'; 

export default function MembersOwnerClass() {
  const [userGroups, setUserGroups] = useState();


  const params = useParams();

  async function getMembers() {
    const subUrl = `/groups/${params.id}`;
    try {
      const { data } = await fetchData(subUrl, "GET");
      console.log(data);
      setUserGroups(data.userGroups);

    } catch ({ message }) {
      showToastError(message);
    }
  }

  useEffect(() => {
    getMembers()
  }, []);

  return (
    userGroups && (
      <div>


        {userGroups.length != 0 ? (
                  <div className="mb-8 grid grid-cols-2 gap-8">
                    {userGroups.map((userGroup, index) => (
                      <div key={index} className="flex justify-between gap-x-6 p-5 border rounded-lg">
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {userGroup.email}
                            </p>
                            <span className="text-gray-800 text-sm">
                              Joined {customFormatDistanceToNow(userGroup.createdDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty />
                )}
        <ToastContainer />
      </div>
    )
  );
}
