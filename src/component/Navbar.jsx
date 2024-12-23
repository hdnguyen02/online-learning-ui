import { Link, useLocation } from "react-router-dom";
import useAuth from "../context/AuthContext";
import YourLibrary from "./your-library.component";
import YourProfile from "./your-profile.component";
import LanguageSelector from "./language/LanguageSelector";
import { useTranslation } from 'react-i18next';
import { roles } from "../enum/role.enum";

function Navbar() {
  const { auth } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();





  if (
    location.pathname !== "/sign-in" &&
    location.pathname !== "/sign-up" &&
    !location.pathname.includes("settings") &&
    !location.pathname.includes("admin") &&
    !location.pathname.includes("learn-cards/join") &&
    !location.pathname.includes("learn-cards/test")
  ) {
    return (
      <nav className="dark:bg-[#0A092D] bg-white h-16 px-4 md:px-48 flex justify-between items-center fixed left-0 right-0 top-0 z-10 border border-t dark:border-none">
        <div className="flex items-center gap-x-8 py-2">
          <Link
            to={"/"}
            className="text-xl md:text-2xl font-bold text-blue-600 dark:text-[#FF7043]"
          >
            Online learning
          </Link>

          <div className="md:flex gap-x-4 lg:gap-x-8 text-xs uppercase font-bold">
            <Link
              to={"/"}
              className={location.pathname === "/" ? "link-active flex items-center" : "flex items-center"}
            >
              {t('NAVBAR.HOME')}
            </Link>
            <div
              className={
                location.pathname.includes('/my-decks') ||
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
              <Link to={'/groups'}
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
          {!auth && (
            <div className="mr-14 md:mr-0 flex gap-x-3">
              <Link
                to="sign-in"
                className="dark:text-white dark:border-white bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Sign in
              </Link>
              <Link
                to="sign-up"
                className="dark:bg-blue-600 dark:text-white dark:border-none bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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
