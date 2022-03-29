import ListRecruiterComponent from "../listRecruiter/component/ListRecruiter";
import RecruiterService from "../listRecruiter/service/RecruiterService";
import RecruiterBloc from "../listRecruiter/bloc/ListRecruiterBloc";
import UseListRecruiter from "./component/UseListRecruiter";
import RouteNavigation from "../../../routes/RouteNavigation";

const ListRecruiter = () => {
  return (
    <ListRecruiterComponent
      bloc={() =>
        RecruiterBloc(RecruiterService, UseListRecruiter, RouteNavigation)
      }
    />
  );
};
export default ListRecruiter;
