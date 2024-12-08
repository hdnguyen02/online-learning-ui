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
        <p className="mt-4 text-sm">Create by {detailClass.owner.email}</p>
        <p className="mt-4 text-sm text-gray-600">Mô tả: {detailClass.description}</p> 
        {/* <div className="flex items-center gap-x-3 mt-2">
          <div onClick={() => setShowProfile(!showProfile)} className='h-10 w-10 rounded-full overflow-hidden cursor-pointer'>
            <img src={detailClass.owner.avatar ? detailClass.owner.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
          </div>
          <div>
            <span className="text-gray-400 text-xs font-light">Created by</span>
            <div className="flex gap-x-2 items-center">
              <span className="font-medium">{detailClass.owner.firstName + " " + detailClass.owner.lastName}</span>
  
              {
                detailClass.owner.roles.map((role, index) => {
                  return <span key={index}>
                    <span className="lowercase text-xs bg-gray-300 p-1 rounded-lg">{role}</span>
                  </span>
                })
              }

            </div>
            <span className="text-gray-400 text-xs font-light">{customFormatDistanceToNow(detailClass.created)}</span>

          </div>
        </div> */}



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

        <hr className="my-8" />

        <Outlet />

      </div>
    )
  );
}
