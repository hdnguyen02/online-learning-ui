import Navbar from "./component/Navbar";
import Home from "./page/Home";
import SignIn from "./page/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./page/SignUp";
import Settings from "./page/Settings";
import InfoUser from "./component/InfoUser";
import ChangePW from "./component/ChangePW";
import ForgotPW from "./page/Forgot-PW";
import ResetPW from "./page/ResetPW";
import PrivateRoutes from "./helper/PrivateRoutes";
import Deck from "./page/Deck";
import FlipCard from "./page/FlipCard";
import Contact from "./page/Contact";
import Card from "./page/Card";
import ClassUser from "./page/ClassUser";
import Classes from "./component/Classes";
import MembersOwnerClass from "./component/MembersOwnerClass.jsx";
import OwnerClasses from "./component/OwnerClasses.jsx";
import AttendanceClasses from "./component/AttendanceClasses.jsx";
import DetailClass from "./component/DetailClass.jsx";
import AddMember from "./component/AddMember";
import CommentClass from "./component/CommentClass.jsx";
import Assignments from "./component/Assignments.jsx";
import AssignmentTeacher from "./page/AssignmentTeacher.jsx";
import DetailAssignment from "./component/DetailAssignment.jsx";
import Submits from "./component/Submits.jsx";
import MembersAttendanceClass from "./component/MembersAttendanceClass.jsx";
import GlobalGroup from "./page/GlobalGroup.jsx";
import DetailGlobalGroup from "./page/DetailGlobalGroup.jsx";
import GlobalGroups from "./page/GlobalGroups.jsx";
import GlobalDecks from "./component/GlobalDecks.jsx";
import GlobalDeck from "./page/GlobalDeck.jsx";
import LearnCommonDeck from "./page/LearnCommonDeck.jsx";
import OwnerCommonDecks from "./component/OwnerCommonDeck.jsx";
import User from "./component/User.jsx";
import Admin from "./page/Admin.jsx";
import Users from "./component/admin/Users.jsx";
import Invoices from "./component/admin/Invoices.jsx";
import Statistics from "./component/admin/Statistics.jsx";
import Cards from "./component/cards/Cards";
import Decks from "./component/decks/Decks.jsx";
import ProfileUser from "./component/ProfileUser.jsx";
import DecksUser from './component/profile-users/Decks.jsx'
import UsersTest from './component/admin/UsersTest.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<UsersTest />}/>
            <Route path="users" element={<UsersTest/>}/>
            <Route path="invoices" element={<Invoices />}/>
            <Route path="statistics" element={<Statistics />}/>
          </Route>

          <Route path="/decks" element={<GlobalDeck />}>
            <Route path="" element={<GlobalDecks />} />
          </Route>

          <Route path="/groups" element={<GlobalGroup />}>
            <Route path="" element={<GlobalGroups />} />
            <Route path=":id" element={<DetailGlobalGroup />}></Route>
          </Route>

          <Route path="/teacher/groups/:idClass/assignments/:idAssignment" element={<AssignmentTeacher />}>
            <Route path="" element={<DetailAssignment />}>
              {" "}
            </Route>
            <Route path="submits" element={<Submits />}>
              {" "}
            </Route>
          </Route>

          <Route path="/student/groups/:idClass/assignments/:idAssignment" element={<AssignmentTeacher />}>
            <Route path="" element={<DetailAssignment />}/>
          </Route>

          {/* classes */}
          <Route path="/groups" element={<ClassUser />}>
            <Route path="" element={<Classes />}>
              <Route path="owner" element={<OwnerClasses />}></Route>
              <Route path="attendance" element={<AttendanceClasses />}></Route>
            </Route>

            <Route path="detail-owner/:id" element={<DetailClass></DetailClass>}>
              <Route path="decks" element={<OwnerCommonDecks />} />
              <Route path="add-member" element={<AddMember />} />
              <Route path="members" element={<MembersOwnerClass />} />
              <Route path="comments" element={<CommentClass />} />
              <Route path="assignments" element={<Assignments />} />
            </Route>

            <Route
              path="detail-attendance/:id"
              element={<DetailClass></DetailClass>}
            >
              <Route path="decks" element={<OwnerCommonDecks />} />
              <Route path="members" element={<MembersAttendanceClass />} />
              <Route path="comments" element={<CommentClass />} />
              <Route path="assignments" element={<Assignments />} />
            </Route>
            <Route
              path="detail-owner/:id"
              element={<DetailClass></DetailClass>}
            ></Route>
          </Route>

          <Route
            path="/common-decks/:id/learn-cards"
            element={<LearnCommonDeck />}
          />

          <Route path="/my-decks" element={<Deck />}>
            <Route path="" element={<Decks />} />
            <Route path=":id/learn-cards" element={<FlipCard />} />
          </Route>

          <Route path="/my-cards" element={<Card />}>
            <Route path="" element={<Cards />} />
          </Route>


          {/* settings */}
          <Route path="/settings" element={<Settings />}>
            <Route path="info" element={<InfoUser />} />
            <Route path="password" element={<ChangePW />} />
          </Route>

          {/* profile */}

          <Route path="/users/:emailUser" element={<ProfileUser />}>
            <Route path="decks" element={<DecksUser />} />
          </Route>
        </Route>

        {/* public */}
        <Route path="/" exact element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPW />} />
        <Route path="/reset-password" element={<ResetPW />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App
