import { Outlet, Link, useParams } from "react-router-dom";
import { fetchData, showToastError } from "../global";
import { useEffect, useState } from "react";
import Decks from "../component/profile-users/Decks";
import { sub } from "date-fns";
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

  return (
    <div className="mx-4 md:mx-48 mt-28 mb-28">
      <div className="flex items-center gap-x-6">
        <div className="h-16 w-16 rounded-full overflow-hidden cursor-pointer">
          <img
            src={user?.avatar ? user.avatar : "/user.png"}
            loading="lazy"
            className="w-full h-full"
            alt=""
          />
          {/* <i className="fa-solid fa-angle-down pt-1"></i> */}
        </div>
        <div>
          <div>
            <p className="font-medium">{user?.email}</p>
            <div className="flex gap-x-2">
              <p>{user?.firstName + " " + user?.lastName}</p>
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
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <Decks />
    </div>
  );
}
