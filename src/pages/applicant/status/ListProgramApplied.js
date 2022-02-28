import ListProgramApplyBloc from "./bloc/ListProgramApplyBloc";
import ListProgramApply from "./component/ListProgramApply";
import StatusService from "./service/StatusService";

const StatusBar = () =>{
    return (
       <ListProgramApply bloc={() => ListProgramApplyBloc(StatusService)} />
    )
}
export default StatusBar;