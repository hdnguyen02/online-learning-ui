import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import signUpService from '../../service/sign-up.service';
import { fetchData, fetchDataWithoutAccessToken, showToastError } from '../../global';
import useAuth from '../../context/AuthContext';

function SignUpComponent() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [step, setStep] = useState(0); // step = 0 => đăng ký,step = 1 nhập otp 

  async function postSignUp() {


    
    const otp1 = document.getElementById('otp-1').value; 
    const otp2 = document.getElementById('otp-2').value; 
    const otp3 = document.getElementById('otp-3').value; 
    const otp4 = document.getElementById('otp-4').value; 
    const otp5 = document.getElementById('otp-5').value; 
    const otp6 = document.getElementById('otp-6').value; 

    // join 6 chuỗi lại. 
    const contentOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6; 
    

    const body = { email, password, isRemember, contentOtp};

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
  

  const onFinalSubmitSignUp = async (event) => { 
    
    // gửi lên.
    event.preventDefault(); 
    postSignUp(); 
  }

  const sendOtp = async () => { 
    const subUrl = `/otp/send?email=${email}`;
    await fetchDataWithoutAccessToken(subUrl, 'POST'); 
  }

  function onSignUp(event) {
    event.preventDefault();

    // check pw và confirm pw       
    if  (password != confirmPassword) { 
      showToastError("Password và confirm password không khớp!");
      return; 
    }
    if (password.includes(" ")) {
      showToastError("Password không chứa ký tự khoản trắng!");
      return; 
    }
    setStep(1);
    sendOtp(); 
  }

  return (
    <div className="flex justify-center items-center h-screen overflow-y-hidden">
      { 
        step == 0 &&  
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-4 text-center">Sign up</h1>
          <form onSubmit={onSignUp} className='mt-12'>
        
            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="font-medium block dark:text-white text-gray-700 mb-2 text-sm">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2">
                <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="px-9 dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
                <span className="absolute left-3 top-1.5">
                  <i className="fa-regular fa-envelope"></i>
                </span>
              </div>
            </div>
  
            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="font-medium block dark:text-white text-gray-700 mb-2 text-sm">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2">
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  min={6}
                  className="px-9 dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
                <span className="absolute left-3 top-1.5">
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>
            </div>
  
            <div className="mb-6">
              <label htmlFor="confirm-password" className="font-medium block dark:text-white text-gray-700 mb-2 text-sm">
                Xác nhận Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2">
                <input
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  id="confirm-password"
                  min={6}
                  className="px-9 dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
                <span className="absolute left-3 top-1.5">
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
                  className="text-blue-500 w-4 h-4" 
                />
                <label htmlFor="isRemember" className="dark:text-white text-gray-700 ml-2 text-sm">Remember me</label>
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
      }


      {
        step == 1 &&  <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 rounded-xl shadow">
        <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Email verification</h1>
            <p className="text-[15px] text-slate-500">Enter the 6-digit verification code that was sent to your email.</p>
        </header>
        <form id="otp-form" onSubmit={onFinalSubmitSignUp}>
            <div className="flex items-center justify-center gap-3">
                <input
                    id="otp-1"
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    maxlength="1"
                    required
                    />
                <input
                  id="otp-2"
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    maxlength="1" />
                <input
                    id="otp-3"
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    maxlength="1" 
                    required
                    />
                <input
                  id="otp-4"
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    maxlength="1" 
                    required
                    />
                <input
                    id="otp-5"
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    maxlength="1" 
                    required
                    />
                <input
                    id="otp-6"
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    maxlength="1" 
                    required
                    />
            </div>
            <div className=" mx-auto mt-8">
                <button type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">Verify
                    Email</button>
            </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">Didn't receive code? <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Resend</a></div>
    </div>
      }
 
      <div className="w-2/3 lg:block h-screen">
        <img src="https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg" alt="login" loading="lazy" className="object-cover w-full h-full" />
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default SignUpComponent;
