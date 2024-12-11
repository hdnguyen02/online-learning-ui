import Navbar from "./component/Navbar";
import Home from "./page/Home";
import SignIn from "./page/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUp from "./page/SignUp";
import SignUpComponent from "./feature/sign-up/sign-up.component.jsx"
import Settings from "./page/Settings";
// import InfoUser from "./component/InfoUser";
// import ChangePW from "./component/ChangePW";
import ForgotPW from "./page/Forgot-PW";
import ResetPW from "./page/ResetPW";
import PrivateRoutes from "./helper/PrivateRoutes";
import Deck from "./feature/deck/deck.component";
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
// import OwnerCommonDecks from "./component/OwnerCommonDeck.jsx";
import Admin from "./page/Admin.jsx";
import Invoices from "./component/admin/Invoices.jsx";
import Statistics from "./component/admin/Statistics.jsx";
import Cards from "./component/cards/Cards";
import Decks from "./feature/deck/component/decks.component.jsx";
import ProfileUser from "./component/ProfileUser.jsx";
import DecksUser from './component/profile-users/Decks.jsx'
import UsersTest from './component/admin/UsersTest.jsx'



import GlobalDeckComponent from "feature/global-deck/global-deck.component.jsx";
import GlobalDecksComponent from "feature/global-deck/global-decks.component.jsx";

// import ProfileUserComponent from "feature/profile-user/profile-user.jsx";

import SettingComponent from "feature/setting/setting.component.jsx";
import ProfileUserComponent from "feature/setting/profile-user.component.jsx";


import CommonDecksComponent from "feature/common-deck/common-decks.component.jsx";
import PrepareCardComponent from "feature/card/prepare-card.component.jsx";
import JoinCardComponent from "feature/card/join-card.component.jsx";
import TestCardComponent from "feature/card/test-card.component.jsx";

import PassWordUserComponent from "feature/setting/password-user.component.jsx";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<UsersTest />}/>
            <Route path="users" element={<UsersTest/>}/>
            {/* <Route path="invoices" element={<Invoices />}/> */}
            <Route path="statistics" element={<Statistics />}/>
          </Route>

          <Route path="/decks" element={<GlobalDeckComponent />}>
            <Route path="" element={<GlobalDecksComponent />} />
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
              <Route path="decks" element={<CommonDecksComponent />} />
              <Route path="add-member" element={<AddMember />} />
              <Route path="members" element={<MembersOwnerClass />} />
              <Route path="comments" element={<CommentClass />} />
              <Route path="assignments" element={<Assignments />} />
            </Route>

            <Route
              path="detail-attendance/:id"
              element={<DetailClass></DetailClass>}
            >
              <Route path="decks" element={<CommonDecksComponent />} />
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
            <Route path=":id/learn-cards" element={<PrepareCardComponent />} />
            {/* <Route path=":id/learn-cards/join" element={<JoinCardComponent />} /> */}
          </Route>

          <Route path="/my-decks/:id/learn-cards/join" element={<JoinCardComponent />} />
          <Route path="/my-decks/:id/learn-cards/test" element={<TestCardComponent />} />

          <Route path="/my-cards" element={<Card />}>
            <Route path="" element={<Cards />} />
          </Route>


          {/* settings */}
          <Route path="/settings" element={<SettingComponent />}>
            <Route path="profile" element={<ProfileUserComponent />} />
            <Route path="password" element={<PassWordUserComponent />} />
          </Route>

          {/* profile */}

          <Route path="/users/:id" element={<ProfileUserComponent />}>
            <Route path="decks" element={<DecksUser />} />
          </Route>
        </Route>

        {/* public */}
        <Route path="/" exact element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUpComponent />} />
        <Route path="/forgot-password" element={<ForgotPW />} />
        <Route path="/reset-password" element={<ResetPW />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>


    </Router>
  );
}

export default App
