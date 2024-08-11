import { Outlet, Link, useParams } from "react-router-dom";
import { fetchData, showToastError } from "../global";
import { useEffect, useState } from "react";
import Decks from "../component/profile-users/Decks"
import { commonFormatddMMYYYYHHmm, commonformatDistanceToNow } from "../helper/common";
export default function ProfileUser() {
  const params = useParams();
  const emailUser = params.emailUser;
  const [user, setUser] = useState();

  async function getInfoUser() {
    const subUrl = `/users/info?email=${emailUser}`;
    const { data } = await fetchData(subUrl, "GET");
    setUser(data);
  }

  useEffect(() => {
    getInfoUser();
  }, []);

  return ( user &&
    <div className="mx-4 md:mx-48 mt-28 mb-28">
      <div className="flex items-center gap-x-6">
        <div className="h-20 w-20 rounded-full overflow-hidden cursor-pointer">
          <img
            src={user?.avatar ? user.avatar : "/user.png"}
            loading="lazy"
            className="w-full h-full"
            alt=""
          />
          {/* <i className="fa-solid fa-angle-down pt-1"></i> */}
        </div>
        <div>
          <div className="flex flex-col gap-y-1">
            <p className="font-medium">{user?.email}</p>
            <div className="flex gap-x-2 items-center">
              <p className="text-sm">{user?.firstName + " " + user?.lastName}</p>
              {user?.roles.map((role, index) => {
                return (
                  <span key={index}>
                    <span className="lowercase text-xs bg-gray-300 p-1 rounded-lg">
                      {role}
                    </span>
                  </span>
                );
              })}
             
            </div>
            <div className="text-sm">Joined the system on {commonFormatddMMYYYYHHmm(user?.createAt)}</div>
          </div>
         
        </div>
      </div>
   

      <hr className="my-6" />

      <div className="">

<span className='font-medium uppercase text-sm'>Card set</span>
</div>

      <Decks />
    </div>
  );
}
