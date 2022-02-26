import { useContext, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { RootContext } from "../App";
import MiddlewareAuth from "../middleware/middlewareAuth";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Registers from "../pages/register/Register";
import VacancyDetail from "../pages/guest/vacancyDetail/VacancyDetail";
import Vacancy from "../pages/guest/vacany/Vacancy";
import RecruiterHome from "../pages/recruiter/home/RecruiterHome";
import AdministratorHome from "../pages/administrator/home/AdministratorHome";
import MiddlewareAuthRecruiter from "../middleware/middlewareAuthRecruiter";
import MiddlewareAuthAdministrator from "../middleware/middlewareAuthAdministrator";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import RegisterRecruiter from "../pages/administrator/registerRecruiter/RegisterRecruiter";
import ApplicantList from "../pages/applicant/applicant-list/ApplicantList";
import Homepage from "../pages/homepage/Homepage";
import NotFoundPage from "../pages/404/NotFoundPage";
import Profile from "../pages/applicant/profile/Profile";
import { Navbar } from "../pages/globalComponent/navbar/Navbar";

const AppRouters = () => {
  const data = useContext(RootContext);
  const navigate = useNavigate();
  let Role = null;
  let addressing;
  if (data.userInfo !== null) {
    let userInfo = jwt_decode(data.userInfo);
    Role = userInfo.Role;
    if (Role === "user") {
      addressing = "/dashboard";
    } else {
      addressing = "/".concat(Role);
    }
  } else {
    addressing = "/login";
  }
  return (
    <>

    <Navbar/>
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
        />
        <Route
          path="/register"
          element={Role === null ? <Registers /> : <Navigate to={addressing} />}
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
                <Profile />
              </>
            }
          ></Route>
        </Route>

        <Route path="/recruiter" element={<MiddlewareAuthRecruiter />}>
          <Route index element={<RecruiterHome />} />
          <Route path="applicants" element={<ApplicantList />}/>
        </Route>

        <Route path="/administrator" element={<MiddlewareAuthAdministrator />}>
          <Route index element={<AdministratorHome />} />
          <Route path="register/recruiter" element={<RegisterRecruiter />} />
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
        <Route
          path="/vacancy/:id"
          element={
            <>
              <VacancyDetail />
            </>
          }
        />
        
        
      
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
