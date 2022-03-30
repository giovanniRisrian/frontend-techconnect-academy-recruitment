import React from "react";
import RouteNavigation from "../../../routes/RouteNavigation";
import ChangeRecruiterPasswordBloc from "./bloc/ChangeRecruiterPasswordBloc";
import ChangeRecruiterPasswordComponent from "./component/ChangeRecruiterPasswordComponent";
import UseChangeRecruiterPassword from "./component/UseChangeRecruiterPassword";
import ChangeRecruiterPasswordService from "./service/ChangeRecruiterPasswordService";

const ChangeRecruiterPassword = () => {
  return (
    <ChangeRecruiterPasswordComponent
      bloc={() =>
        ChangeRecruiterPasswordBloc(
          ChangeRecruiterPasswordService,
          UseChangeRecruiterPassword,
          RouteNavigation
        )
      }
    />
  );
};

export default ChangeRecruiterPassword;
