import { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { RootContext } from "../App";
import MiddlewareAuth from "../middleware/middlewareAuth";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Registers from "../pages/register/Register";
import VacancyDetail from "../pages/guest/vacancyDetail/VacancyDetail";
import Vacancy from "../pages/guest/vacany/Vacancy";
import AdministratorHome from "../pages/administrator/home/AdministratorHome";
import MiddlewareAuthRecruiter from "../middleware/middlewareAuthRecruiter";
import MiddlewareAuthAdministrator from "../middleware/middlewareAuthAdministrator";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import RegisterRecruiter from "../pages/administrator/registerRecruiter/RegisterRecruiter";
import About from "../pages/about/About";
import ProgramPosting from "../pages/program/program-posting/ProgramPosting";
import ApplicantList from "../pages/applicant/applicant-list/ApplicantList";
import Homepage from "../pages/homepage/Homepage";
import NotFoundPage from "../pages/404/NotFoundPage";
// import Profile from "../pages/applicant/profile/Profile";
import { Navbar } from "../pages/globalComponent/navbar/Navbar";
import DetailApplicant from "../pages/applicant/detailApplicant/DetailApplicant";
// import StatusBar from "../pages/applicant/status/StatusBar";
import ViewProfile from "../pages/applicant/viewProfile/ViewProfile";
import ListProgramApplied from "../pages/applicant/status/ListProgramApplied";
// import StatusDetail from "../pages/applicant/status/StatusDetail";
import RecruiterHome from "../pages/recruiter/home/RecruiterHome";
import Reccomendation from "../pages/applicant/reccomendation/Reccomendation";
import ActionType from "../Context/ActionType";
import ActivationAccount from "../activation/activation_account";
import ListRecruiter from "../pages/administrator/listRecruiter/List";
import UpdateRecruiter from "../pages/administrator/updateRecruiter/UpdateRecruiter";
import Activations from "../pages/activation/Activation";

const AppRouters = () => {
  const data = useContext(RootContext);
  // const navigate = useNavigate();
  let Role = null;
  let addressing;
  if (data.userInfo !== null) {
    let userInfo = jwt_decode(data.userInfo);

    if (userInfo.exp * 1000 > Date.now()) {
      Role = userInfo.Role;
      if (Role === "user") {
        addressing = "/applicant/profile";
      } else {
        addressing = "/".concat(Role);
      }
    } else {
      localStorage.removeItem("token");
      data.dispatch({ type: ActionType.LOGIN, name: null, token: null });
      Role = null;
      alert("Token Expired");
      addressing = "/login";
    }
  } else {
    addressing = "/login";
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage />
              {/* <button onClick={()=>navigate('/login')}>Login</button><button onClick={()=>navigate('/register')}>Register</button> */}
            </>
          }
        />

        <Route
          path="/login"
          element={Role === null ? <Login /> : <Navigate to={addressing} />}
        >
          <Route path=":id/:email" element={<Login />} />
        </Route>
        <Route
          path="/register"
          element={Role === null ? <Registers /> : <Navigate to={addressing} />}
        />
        <Route
          path="/activation"
          element={Role === null ? <Activations /> : <Navigate to={addressing} />}
        />
        <Route path="/dashboard" element={<MiddlewareAuth />}>
          <Route index element={<Dashboard />} />
          <Route
            path="home"
            element={
              <>
                <Vacancy />
              </>
            }
          />
        </Route>
        <Route path="/applicant" element={<MiddlewareAuth />}>
          <Route
            path="profile"
            element={
              <>
                <ViewProfile />
              </>
            }
          />

          <Route
            path="status"
            element={
              <>
                <ListProgramApplied />
              </>
            }
          ></Route>
          <Route
            path="reccomendation"
            element={
              <>
                <Reccomendation />
              </>
            }
          ></Route>
          {/* <Route
            path="status/:id"
            element={
              <>
                <StatusDetail />
              </>
            }
          ></Route> */}
        </Route>

        <Route path="/about" element={<About />} />

        <Route path="/recruiter" element={<MiddlewareAuthRecruiter />}>
          <Route index element={<RecruiterHome />} />
          <Route
            path="applicants/details/:programid/:applicantid"
            element={<DetailApplicant />}
          />
          <Route path="programs" element={<ProgramPosting />} />
          <Route path="applicants" element={<ApplicantList />} />
          <Route
            path="applicants/:programId/:applicantId"
            element={<ApplicantList />}
          />
        </Route>

        <Route path="/administrator" element={<MiddlewareAuthAdministrator />}>
          <Route index element={<AdministratorHome />} />
          <Route path="register/recruiter" element={<RegisterRecruiter />} />
          <Route path="list/recruiter" element={<ListRecruiter />} />
          <Route path="update/recruiter/:id" element={<UpdateRecruiter />} />
        </Route>

        <Route
          path="/vacancy"
          element={
            <>
              <Vacancy />
            </>
          }
        />
        <Route
          path="/recruiter"
          element={
            <>
              <RecruiterHome />
            </>
          }
        />

        <Route path="/vacancy/:id" element={<VacancyDetail />}>
          <Route index element={<MiddlewareAuth />} />
        </Route>
        <Route
          path="/vacancy/:id"
          element={
            <>
              <VacancyDetail />
            </>
          }
        />
        <Route path="programs" element={<Outlet />}></Route>

        <Route
          path="*"
          element={
            <>
              <NotFoundPage />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouters;
