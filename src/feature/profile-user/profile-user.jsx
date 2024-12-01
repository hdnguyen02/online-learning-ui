import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DecksProfileUserComponent from './decks-profile-user';
import { customFormatDD_MM_YYYY_HH_mm, fetchData } from '../../global';
export default function ProfileUserComponent() {
  const params = useParams();
  const [user, setUser] = useState();

  async function getInfoUser() {
    const subUrl = `/users?id=${params.id}`;
    const { data: rawData } = await fetchData(subUrl, 'GET');
    setUser(rawData);
  }

  useEffect(() => {
    getInfoUser();
  }, []);

  return (user &&
    <div className='mx-4 md:mx-48 mt-28 mb-28'>
   

        <div className='flex flex-col gap-y-1'>
          <div className='flex flex-col gap-y-1'>
            <div className='flex gap-x-3 items-center'>
              <div className='h-8 w-8 rounded-full overflow-hidden cursor-pointer'>
                <img
                  src={user?.avatar ? user.avatar : '/user.png'}
                  loading='lazy'
                  className='w-full h-full'
                  alt=''
                />
              </div>

              <p className='text-sm'>
                {user?.firstName || user?.lastName ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim() : user?.email}
              </p>




              {user?.roles.map((role, index) => {
                return (
                  <span key={index}>
                    <span className='text-white lowercase text-xs bg-green-600 py-1 px-2 rounded-lg'>
                      {role}
                    </span>
                  </span>
                );
              })}

            </div>


           
          </div>

          <div className='text-sm'>Joined the system on {customFormatDD_MM_YYYY_HH_mm(user?.createdDate)}</div>


      </div>
      <hr className='my-6' />

      <div className=''>

        <span className='font-medium uppercase text-sm'>Card set</span>
      </div>

      <DecksProfileUserComponent />
    </div>
  );
}
