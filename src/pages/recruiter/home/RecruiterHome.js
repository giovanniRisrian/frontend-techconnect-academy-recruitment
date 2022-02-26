import React from "react";
import RouteNavigation from "../../../routes/RouteNavigation";
import DashboardRecruiterBloc from "./bloc/DashboardRecruiterBloc";
import RecruiterHomeComp from "./component/RecruiterHomeComp";

const RecruiterHome = () => {
  return (
    <div>
      <RecruiterHomeComp bloc={() => DashboardRecruiterBloc(RouteNavigation)} />
    </div>
  );
};

export default RecruiterHome;
