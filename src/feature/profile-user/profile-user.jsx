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
              <div className='h-12 w-12 rounded-full overflow-hidden cursor-pointer'>
                <img
                  src={user?.avatar ? user.avatar : '/user.png'}
                  loading='lazy'
                  className='w-full h-full'
                  alt=''
                />
                
              </div>
              <div> 
              <p className='font-bold'>
                {user?.firstName || user?.lastName ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim() : user?.email}
              </p>
              <div className='text-sm text-gray-600'>Joined the system on {customFormatDD_MM_YYYY_HH_mm(user?.createdDate)}</div>


              </div>
            

            </div>


           
          </div>

          {/* <div className='text-sm'>Joined the system on {customFormatDD_MM_YYYY_HH_mm(user?.createdDate)}</div> */}


      </div>
      <hr className='my-6' />


      <DecksProfileUserComponent />
    </div>
  );
}
