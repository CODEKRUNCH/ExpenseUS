import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfitPathLogin = () => {
  const [email, setEmail] = useState('');
  const [isvalidEmail, SetisValidEmail] = useState(false);
  const navigate = useNavigate();
  // this checks for the email validitiy and check each time a new email is written
  useEffect(()=>{
    const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    SetisValidEmail(emailregex.test(email));
  },[email])

  
  const [password, setPassword] = useState('');
  const [isvalidPassword,SetisValidPassword] = useState(false);
  useEffect(()=>{
    SetisValidPassword(password.length>=8);
  },[password])
  return (
        <div>
        <div className='bg-cover'>
          <img src="../public/images/chatgpt-image.png" alt="" />
        </div>
        <div className='lg:flex lg:flex-row lg:justify-end'>
        <div className="bg-gray-50 flex flex-col justify-end py-2 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="text-center font-poppins text-3xl font-extrabold italic text-gray-900">ExpenseUS</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Welcome to ExpenseUS<br />
              Experience Effortless Financial Tracking
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="mb-8">
                <h2 className="text-center text-xl font-semibold text-gray-900">Welcome</h2>
                <p className="text-center text-sm text-gray-600">
                  Start Managing Your Finance Faster and better
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="flex justify-items-start text-sm font-medium text-gray-700">
                    Email Here
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      // e.target.value is always a string (even for number inputs). Works with any input type (text, email, password, etc.).
                      onChange={(e)=>setEmail(e.target.value)}
                      required
                      className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className=" sm:text-sm">{isvalidEmail && <svg
                  className="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="flex justify-items-start text-sm font-medium text-gray-700">
                    Password Here
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="at least 8 characters"
                      onChange={(e)=>setPassword(e.target.value)}
                      required
                      className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">{isvalidPassword && <svg
                className="h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forget password?
                    </a>
                  </div>
                </div>

                  <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <button
                      type="button"
                      className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span>
                        <div className='flex justify-center'><svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.5014 16.3109C30.5014 15.1598 30.4061 14.3198 30.1998 13.4487H16.7871V18.6442H24.6601C24.5014 19.9354 23.6442 21.8798 21.7394 23.1864L21.7127 23.3604L25.9536 26.58L26.2474 26.6087C28.9458 24.1665 30.5014 20.5731 30.5014 16.3109Z" fill="#4285F4"/>
                        <path d="M16.7863 30C20.6434 30 23.8814 28.7555 26.2466 26.6089L21.7386 23.1865C20.5323 24.011 18.9132 24.5865 16.7863 24.5865C13.0086 24.5865 9.80225 22.1444 8.65929 18.7688L8.49176 18.7827L4.08208 22.1272L4.02441 22.2843C6.37359 26.8577 11.199 30 16.7863 30Z" fill="#34A853"/>
                        <path d="M8.66013 18.7689C8.35855 17.8978 8.18401 16.9644 8.18401 16C8.18401 15.0355 8.35856 14.1022 8.64427 13.2311L8.63627 13.0455L4.17132 9.6474L4.02524 9.7155C3.05703 11.6133 2.50146 13.7444 2.50146 16C2.50146 18.2555 3.05703 20.3866 4.02524 22.2844L8.66013 18.7689Z" fill="#FBBC05"/>
                        <path d="M16.7864 7.4133C19.4689 7.4133 21.2784 8.54885 22.3102 9.4978L26.3419 5.64C23.8658 3.38445 20.6435 2 16.7864 2C11.199 2 6.3736 5.1422 4.02441 9.71549L8.64345 13.2311C9.80229 9.85555 13.0086 7.4133 16.7864 7.4133Z" fill="#EB4335"/>
                        </svg>
                        </div>Sign in with Google</span>
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span>
                        <div className='flex justify-center'>
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30Z" fill="url(#paint0_linear_17_580)"/>
                                  <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
                                  <defs>
                                  <linearGradient id="paint0_linear_17_580" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                                  <stop stop-color="#18ACFE"/>
                                  <stop offset="1" stop-color="#0163E0"/>
                                  </linearGradient>
                                  </defs>
                                  </svg>
                                  </div>
                        Sign in with Facebook</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account yet?{' '}
                  <a onClick={()=>navigate('/signup')} className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                    Sign Up 
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default ProfitPathLogin;