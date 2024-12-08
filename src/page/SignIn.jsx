import { useState } from 'react';
import { fetchDataWithoutAccessToken, showToastError } from '../global';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import useAuth from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false); // State to manage password visibility

  async function postSignIn(email, password, isRemember) {
    const subUrl = `/auth/sign-in`;
    const body = { email, password, isRemember };

    try { 
      const response = await fetchDataWithoutAccessToken(subUrl, 'POST', body);
      const auth = response.data;
      localStorage.setItem('accessToken', auth.accessToken);
      checkAuth();
      navigate('/');
    } catch (error) {
      showToastError(error.message);
    }  
  }

  function handleSignIn(event) {
    event.preventDefault();
    postSignIn(email, password, isRemember);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-2/3 lg:block h-screen">
        <img
          src="https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg"
          alt="login image"
          loading="lazy"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-3xl text-center font-semibold mb-4">{t('LOGIN.TITLE')}</h1>
        <form onSubmit={handleSignIn} className="mt-12">
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block dark:text-white text-gray-600 text-sm font-medium">
              Email<span className=" text-red-500 ml-1">*</span>
            </label>
            <div className="relative mt-2">
              <input
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="dark:bg-[#2E3856] dark:text-white dark:outline-none dark:border-none block w-full rounded-md bg-white px-10 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                required
              />
              <span className="absolute left-3 top-1.5 text-gray-400">
                <i className="fa-regular fa-envelope font-light"></i>
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="font-medium block dark:text-white text-gray-600 mb-2 text-sm">
            {t('LOGIN.PASSWORD')}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className='relative'>
              {/* Biểu tượng khóa */}
              <span className="absolute left-3 top-1.5 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                onChange={e => setPassword(e.target.value)}
                type={isShowPassword ? 'text' : 'password'} // Toggle between text and password
                id="password"
                className="dark:bg-[#2E3856] dark:text-white dark:outline-none dark:border-none block w-full rounded-md bg-white px-10 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                required
              />
              <span
                onClick={() => setIsShowPassword(!isShowPassword)} // Toggle password visibility
                className='cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400'
              >
                {isShowPassword ? (
                  <i className="fa-solid fa-eye-slash text-xs"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className='flex justify-between items-center'>
            <div className="flex items-center">
              <input
                onChange={e => setIsRemember(e.target.checked)}
                type="checkbox"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-gray-600 dark:text-white ml-2 text-sm">
                Remember me
              </label>
            </div>
            {/* Forgot Password Link */}
            <div className="text-blue-500">
              <Link to={'/forgot-password'} className="hover:underline text-sm">
                Forgot password
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-6"
          >
            Submit
          </button>
        </form>
        {/* Sign up  Link */}
        <div className="mt-6 text-blue-500 text-end">
          <Link to={'/sign-up'} className="hover:underline text-sm">
            Sign up
          </Link>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
