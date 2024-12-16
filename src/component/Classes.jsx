import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';


const Classes = () => {


  const [name, setName] = useState();
  const [desc, setDesc] = useState();



  const location = useLocation();

  const appElement = document.getElementById('root');






  async function onCreateGroup(event) {
    event.preventDefault();
    const isPublic = document.getElementById('public-checkbox').checked;
    const body = {
      name, description: desc, isPublic
    };

    try {
      const subUrl = '/groups';
      const { message } = await fetchData(subUrl, 'POST', body);
      showToastMessage(message);

      setName('');
      setDesc('');
      setIsOpenCreateClass(false);

    } catch (error) {
      showToastError(error.message);
    }
  }












  useEffect(() => {
  }, [])

  return (
    <div>
      <div className='profile flex gap-x-3 items-center justify-between font-medium h-12'>
        <div className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse cursor-pointer">
            <li className="inline-flex items-center">
              <span className="dark:text-white inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Thư viện của bạn
              </span>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="dark:text-white ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">Nhóm học tập</span>
              </div>
            </li>

          </ol>
        </div>
        <div className='flex gap-x-8 items-center'>


        </div>

      </div>

      <hr className='my-8 dark:opacity-10'></hr>



      <div className="md:flex">
        <ul className="w-80 flex-column space-y space-y-4 text-sm font-medium text-gray-800 md:me-4 mb-4 md:mb-0">
          <li>
            <Link to={'/groups/owner'} className={
              location.pathname.includes('groups/owner')
                ? 'bg-blue-600 text-white inline-flex items-center px-4 py-3 rounded-lg w-full'
                : 'bg-gray-200 inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full'
            }>
              Lớp học của bạn
            </Link>
          </li>
          <li>
            <Link to={'/groups/attendance'} className={
              location.pathname.includes('groups/attendance')
                ? 'bg-blue-600 text-white inline-flex items-center px-4 py-3 rounded-lg w-full'
                : 'bg-gray-200 inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full'
            }>
              Lớp học bạn tham gia
            </Link>
          </li>


        </ul>
        <div className="text-medium text-gray-500 rounded-lg w-full">
          <Outlet />
        </div>
      </div>







    </div>
  )
}
export default Classes
