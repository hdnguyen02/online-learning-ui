import { useParams } from "react-router-dom";
import { fetchData } from "../global";
import { useEffect, useState } from "react";
import Decks from "../component/profile-users/Decks"
import { customFormatDD_MM_YYYY_HH_mm } from "../global";
export default function ProfileUser() {
  const params = useParams();
  const [user, setUser] = useState();

  async function getInfoUser() {
    const subUrl = `/users?id=${params.id}`;
    const { data: rawData } = await fetchData(subUrl, "GET");
    setUser(rawData);
  }

  useEffect(() => {
    getInfoUser();
  }, []);

  return (user &&
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
            <div className="text-sm">Joined the system on {customFormatDD_MM_YYYY_HH_mm(user?.createdDate)}</div>
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
