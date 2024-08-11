
import { Outlet, useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

export default function AssignmentTeacher() {
  const params = useParams();
  const location = useLocation();

  return (
    <div className="mx-4 md:mx-48 my-28">
      {location.pathname.includes("teacher") && (
        <nav className="font-medium flex gap-x-3">
          {/* nếu có submits -> tiến hành*/}
          <Link
            to={`/teacher/groups/${params.idClass}/assignments/${params.idAssignment}`}
            className={
              !location.pathname.includes("submits") ? "link-active" : ""
            }
          >
            Assignment
          </Link>
          |
          <Link
            to={`/teacher/groups/${params.idClass}/assignments/${params.idAssignment}/submits`}
            className={
              location.pathname.includes("submits") ? "link-active" : ""
            }
          >
            Submit
          </Link>
        </nav>
      )}

      <div className="mt-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
