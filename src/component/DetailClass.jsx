import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchData } from "../global"

import { customFormatDistanceToNow } from "../global";

export default function DetailClass() {



  const params = useParams()
  const location = useLocation()

  const [detailClass, setDetailClass] = useState();

  async function getDetailClass(id) {
    const subUrl = `/groups/${id}`
    try {
      const response = await fetchData(subUrl, "GET");
      setDetailClass(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getDetailClass(params.id);
  }, []);

  return (
    detailClass && (
      <div>

        <h3 className="font-bold text-2xl">{detailClass.name}</h3>
        <p className="mt-4 text-sm">Tạo bởi {detailClass.owner.email}</p>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Mô tả: {detailClass.description}</p> 
        <div className="mt-8">
          <div className="flex gap-x-8">
            <div className={location.pathname.includes('members') ? "link-active" : ""}>


              {location.pathname.includes("owner") ? (
                <Link
                  to={`/groups/detail-owner/${params.id}/members`}
                  className="font-medium flex gap-x-2"
                >
                  <i className="fa-solid fa-users flex items-center"></i>
                  <span>Member</span>
                </Link>
              ) : (
                <Link
                  to={`/groups/detail-attendance/${params.id}/members`}
                  className="font-medium flex gap-x-2"
                >
                  <i className="fa-solid fa-users flex items-center"></i>
                  <span>Member</span>
                </Link>
              )}
            </div>

            <div className={location.pathname.includes('decks') ? "link-active" : ""}>


              {location.pathname.includes("owner") ? (
                <Link
                  to={`/groups/detail-owner/${params.id}/decks`}
                  className="font-medium flex gap-x-2"
                >
                  <i className="fa-regular fa-folder flex items-center"></i>
                  <span>Card set</span>
                </Link>
              ) : (
                <Link
                  to={`/groups/detail-attendance/${params.id}/decks`}
                  className="font-medium flex gap-x-2"
                >
                  <i className="fa-regular fa-folder flex items-center"></i>
                  <span>Card set</span>
                </Link>
              )}
            </div>

            {/* <div className={location.pathname.includes('assignments') ? "link-active" : ""}>


{location.pathname.includes("owner") ? (
  <Link
    to={`/groups/detail-owner/${params.id}/assignments`}
    className="font-medium flex gap-x-2"
  >
    <i className="fa-regular fa-file flex items-center"></i>
    <span>assignment</span>
  </Link>
) : (
  <Link
    to={`/groups/detail-attendance/${params.id}/assignments`}
    className="font-medium flex gap-x-2"
  >
    <i className="fa-regular fa-file flex items-center"></i>
    <span>assignment</span>
  </Link>
)}
</div> */}


            <div className={location.pathname.includes('comments') ? "link-active" : ""}>

              {location.pathname.includes("owner") ? (
                <Link
                  to={`/groups/detail-owner/${params.id}/comments`}
                  className="font-medium flex gap-x-2 "
                >
                  <i className="fa-regular fa-comment flex items-center"></i>
                  <span>Comment</span>
                </Link>
              ) : (
                <Link
                  to={`/groups/detail-attendance/${params.id}/comments`}
                  className="font-medium flex gap-x-2"
                >
                  <i className="fa-regular fa-comment flex items-center"></i>
                  <span>Comment</span>
                </Link>
              )}
            </div>
           
          </div>
        </div>

        <hr className="my-8 dark:opacity-10" />

        <Outlet />

      </div>
    )
  );
}
