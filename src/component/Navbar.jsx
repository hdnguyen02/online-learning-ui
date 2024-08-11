import { Link, useLocation } from "react-router-dom";
import useAuth from "../context/AuthContext";
import YourLibrary from "./YourLibrary";
import YourProfile from "./YourProfile";

function Navbar() {
  const { auth } = useAuth();
  const location = useLocation();

  function handleShowMenu() {
    document.getElementById("menu-mobile").style.display = "flex";
  }

  function handleCloseMenu() {
    document.getElementById("menu-mobile").style.display = "none";
  }

  if (
    location.pathname !== "/sign-in" &&
    location.pathname !== "/sign-up" &&
    !location.pathname.includes("settings") &&
    !location.pathname.includes("admin")
  ) {
    return (
      <nav className="bg-[#F0F6F6] h-16 px-4 md:px-48 flex justify-between items-center fixed left-0 right-0 top-0 z-10">
        <div className="flex items-center gap-x-8">
          <Link
            to={"/"}
            className="text-blue-700 text-xl md:text-3xl font-bold"
          >
            Quezlot
          </Link>

          <div className="hidden md:flex gap-x-4 lg:gap-x-8 text-sm font-medium">
            <Link
              to={"/"}
              className={location.pathname === "/" ? "link-active" : ""}
            >
              Home
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
                Expert card set
              </Link>
            )}
            {auth && (
              <Link
                to={"/groups"}
                className={location.pathname === "/groups" ? "link-active" : ""}
              >
                Expert study group
              </Link>
            )}
            <Link
              to={"/contact"}
              className={location.pathname === "/contact" ? "link-active" : ""}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* <li className='hover:cursor-pointer font-medium'>
          <Link className={location.pathname === '/' ? 'link-active' : ''} to={'/'} >Trang chủ</Link>
        </li>
        {auth &&<li className='hover:cursor-pointer font-medium'>
          <Link className={location.pathname.includes('/decks') ? 'link-active' : ''} to={'/decks'} >Bộ thẻ</Link>
        </li>}
        {auth &&<li className='hover:cursor-pointer font-medium'>
          <Link className={location.pathname.includes('/cards') ? 'link-active' : ''} to={'/cards'} >Thẻ</Link>
        </li>}
        {auth &&<li className='hover:cursor-pointer font-medium'>
          <Link className={location.pathname.includes('/groups') ? 'link-active' : ''} to={'/groups/owner'} >Lớp</Link>
        </li>}
        <li className='hover:cursor-pointer font-medium'>
          <Link className={location.pathname === '/contact' ? 'link-active' : ''} to={'/contact'} >Liên hệ</Link>
        </li> */}

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
        </div>

        {/* menu mobile */}
        <div className="fixed right-4 flex md:hidden">
          <button onClick={handleShowMenu}>
            <img className="w-8" src="/menu.png" alt="" />
          </button>
          <ul
            id="menu-mobile"
            className="hidden fixed top-0 bottom-0 right-0 text-md w-64 bg-blue-500 text-white font-medium p-8 flex-col gap-y-4"
          >
            <button onClick={handleCloseMenu}>
              <img src="/close.png" className="w-8" alt="" />
            </button>
            <li className="hover:cursor-pointer font-medium">
              <Link
                className={
                  location.pathname === "/" ? "link-active-mobile" : ""
                }
                to={"/"}
              >
                Trang chủ
              </Link>
            </li>
            {auth && (
              <li className="hover:cursor-pointer font-medium">
                <Link
                  className={
                    location.pathname.includes("/decks")
                      ? "link-active-mobile"
                      : ""
                  }
                  to={"/decks"}
                >
                  Bộ thẻ
                </Link>
              </li>
            )}
            {auth && (
              <li className="hover:cursor-pointer font-medium">
                <Link
                  className={
                    location.pathname.includes("/cards")
                      ? "link-active-mobile"
                      : ""
                  }
                  to={"/cards"}
                >
                  Thẻ
                </Link>
              </li>
            )}
            {auth && (
              <li className="hover:cursor-pointer font-medium">
                <Link
                  className={
                    location.pathname.includes("/classes")
                      ? "link-active-mobile"
                      : ""
                  }
                  to={"/classes"}
                >
                  Lớp
                </Link>
              </li>
            )}

            <li className="hover:cursor-pointer font-medium">
              <Link
                className={
                  location.pathname === "/contact" ? "link-active-mobile" : ""
                }
                to={"/contact"}
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return null;
  }
}

export default Navbar;
