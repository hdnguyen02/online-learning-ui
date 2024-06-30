import { Outlet } from "react-router-dom";
import NotFound from "../page/NotFound";
import useAuth from "../context/AuthContext";

const PrivateRoutes = () => {
  const { auth } = useAuth() 



  return auth == false ? (
    <div className="mx-auto mt-32 overflow-hidden flex items-center justify-center font-medium">
      Loading...
    </div>
  ) : auth == null ? (
    <NotFound />
  ) : (
    <Outlet />
  );
};

export default PrivateRoutes;
