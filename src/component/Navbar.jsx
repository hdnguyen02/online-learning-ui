import { Link, useLocation } from "react-router-dom";
import useAuth from "../context/AuthContext";
import YourLibrary from "./YourLibrary";
import YourProfile from "./YourProfile";
import LanguageSelector from "./language/LanguageSelector";
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { auth } = useAuth();
  console.log("giá trị auth: ")
  console.log(auth); 
  const location = useLocation();
  const { t } = useTranslation();

  if (  
    location.pathname !== "/sign-in" &&
    location.pathname !== "/sign-up" &&
    !location.pathname.includes("settings") &&
    !location.pathname.includes("admin")
  ) {
    return (
      <nav className="bg-[#F0F6F6] h-14 px-4 md:px-48 flex justify-between items-center fixed left-0 right-0 top-0 z-10">
        <div className="flex items-center gap-x-8">
          <Link
            to={"/"}
            className="text-blue-700 text-xl md:text-3xl font-bold"
          >
            Quezlot
          </Link>

          <div className="md:flex gap-x-4 lg:gap-x-8 text-sm font-medium">
            <Link
              to={"/"}
              className={location.pathname === "/" ? "link-active" : ""}
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
                className={location.pathname === "/decks" ? "link-active" : ""}
              >
                 {t('NAVBAR.CARD_SET')}
              </Link>
            )}
            {auth && (
              <Link
                to={"/groups"}
                className={location.pathname === "/groups" ? "link-active" : ""}
              >
                {t('NAVBAR.STUDY_GROUP')}
              </Link>
            )}
            <Link
              to={"/contact"}
              className={location.pathname === "/contact" ? "link-active" : ""}
            >
              {t('NAVBAR.CONTACT')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
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

          <YourProfile />
          <LanguageSelector />
        </div>

      </nav>
    );
  } else {
    return null;
  }
}

export default Navbar;
