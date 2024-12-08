import { Link, useLocation } from "react-router-dom";
import useAuth from "../context/AuthContext";
import YourLibrary from "./your-library.component";
import YourProfile from "./your-profile.component";
import LanguageSelector from "./language/LanguageSelector";
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { auth } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (  
    location.pathname !== "/sign-in" &&
    location.pathname !== "/sign-up" &&
    !location.pathname.includes("settings") &&
    !location.pathname.includes("admin") && 
    !location.pathname.includes("learn-cards/join")
  ) {
    return (
      <nav className="dark:bg-[#0A092D] h-16 px-4 md:px-48 flex justify-between items-center fixed left-0 right-0 top-0 z-10 border border-t dark:border-none">
        <div className="flex items-center gap-x-8 py-2">
          <Link
            to={"/"}
            className="text-xl md:text-2xl font-bold dark:text-[#FF7043]"
          >
            Online learning
          </Link>

          {/* dropdown */}

          {/* <div class="group relative cursor-pointer py-2">

        <div class="flex items-center justify-between space-x-5 bg-transparent  px-4">
            <a class="menu-hover my-2 py-2 font-medium text-black lg:mx-4 uppercase text-xs" onClick="">
                Choose Day
            </a>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </div>

        <div
            class="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Sunday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Monday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Tuesday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Wednesday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Thursday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Friday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Saturday
            </a>

        </div>
    </div> */}

          <div className="md:flex gap-x-4 lg:gap-x-8 text-xs uppercase font-bold">
            <Link
              to={"/"}
              className={location.pathname === "/" ? "link-active flex items-center" : "flex items-center"}
            >
              {t('NAVBAR.HOME')}
            </Link>
            <div
              className={
                location.pathname === "/my-decks" ||
                location.pathname === "/my-cards" ||
                location.pathname.includes("/groups/") ||
                location.pathname === "/groups/owner"
                  ? "link-active"
                  : ""
              }
            > 
         
              <YourLibrary />


            </div>

            {auth && (
              <Link
                to={"/decks"}
                className={location.pathname === "/decks" ? "link-active flex items-center" : " flex items-center"}
              >
                 {t('NAVBAR.CARD_SET')}
              </Link>
            )}
            {auth && (
              <Link
                to={"/groups"}
                className={location.pathname === "/groups" ? "link-active flex items-center" : "flex items-center"}
              >
                {t('NAVBAR.STUDY_GROUP')}
              </Link>
            )}
            <Link
              to={"/contact"}
              className={location.pathname === "/contact" ? "link-active flex items-center" : "flex items-center"}
            >
              {t('NAVBAR.CONTACT')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-x-8">
          {/* <SearchClass></SearchClass> */}
          {/* ẩn hiện tùy theo authenticate*/}
          {!auth && (
            <div className="mr-14 md:mr-0 flex gap-x-3">
              <Link
                to="sign-in"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Sign in
              </Link>
              <Link
                to="sign-up"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Sign up
              </Link>
            </div>
          )}



          <LanguageSelector />

          <YourProfile />
         
        </div>

      </nav>
    );
  } else {
    return null;
  }
}

export default Navbar;
