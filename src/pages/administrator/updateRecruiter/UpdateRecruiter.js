import React from "react";
import RouteNavigation from "../../../routes/RouteNavigation";
import UpdateRecruiterBloc from "./bloc/UpdateRecruiterBloc";
import UpdateRecruiterComponent from "./component/UpdateRecruiterComponent";
import UseUpdateRecruiter from "./component/UseUpdateRecruiter";
import UpdateRecruiterService from "./service/UpdateRecruiterService";

const UpdateRecruiter = () => {
  return (
    <div>
      <UpdateRecruiterComponent
        bloc={() =>
          UpdateRecruiterBloc(
            UpdateRecruiterService,
            UseUpdateRecruiter,
            RouteNavigation
          )
        }
      />
    </div>
  );
};

export default UpdateRecruiter;
