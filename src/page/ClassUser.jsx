import React from 'react' 
import { Outlet  } from 'react-router-dom'



function ClassUser() { 
  return (<div className='mx-4 md:mx-24 mt-28'>
      <Outlet />
  </div>)
}
export default ClassUser    