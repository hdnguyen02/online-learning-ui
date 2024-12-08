import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import signUpService from '../../service/sign-up.service';
import { showToastError } from '../../global';
import useAuth from '../../context/AuthContext';

function SignUpComponent() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  async function postSignUp() {
    // const subUrl = `/auth/sign-up`;
    const body = { email, password, isRemember };

    try {
      const { data } = await signUpService.signUp(body);
      const { accessToken } = data; 
      localStorage.setItem('accessToken', accessToken);
      checkAuth(); 
      navigate('/');
    } catch (error) {
      showToastError(error.message);
    }
  }

  function handleSignUp(event) {
    event.preventDefault();
    postSignUp();
  }

  return (
    <div className="flex justify-center items-center h-screen overflow-y-hidden">
      
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-3xl font-semibold mb-4 text-center">Sign up</h1>
        <form onSubmit={handleSignUp} className='mt-12'>
      
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="dark:text-white block text-gray-600 text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-2">
              <input
                onChange={e => setEmail(e.target.value)}
                type="email"
                id="email"
                className="dark:bg-[#2E3856] dark:text-white dark:outline-none dark:border-none block w-full rounded-md bg-white px-10 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                required
              />
              <span className="absolute left-3 top-1.5 text-gray-400">
                <i className="fa-regular fa-envelope"></i>
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="dark:text-white block text-gray-600 text-sm mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-2">
              <input
                onChange={e => setPassword(e.target.value)}
                type="password"
                id="password"
                className="dark:bg-[#2E3856] dark:text-white dark:outline-none dark:border-none block w-full rounded-md bg-white px-10 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                required
              />
              <span className="absolute left-3 top-1.5 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
            </div>
          </div>

      

          {/* Remember Me Checkbox */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input 
                onChange={e => setIsRemember(e.target.checked)} 
                type="checkbox" 
                id="isRemember" 
                className="text-blue-500" 
              />
              <label htmlFor="isRemember" className="text-gray-600 dark:text-white ml-2 text-sm">Remember me</label>
            </div>
            <Link to='/forgot-password' className="hover:underline text-sm text-blue-500">Forgot password</Link>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-6"
          >
            Submit
          </button>
        </form>
         {/* Sign up  Link */}
    <div className="mt-6 text-blue-500 text-end">
      <Link to={'/sign-in'} className="hover:underline text-sm">
        Sign in
      </Link>
    </div>
      </div>
      <div className="w-2/3 lg:block h-screen">
        <img src="https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg" alt="login" loading="lazy" className="object-cover w-full h-full" />
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default SignUpComponent;
