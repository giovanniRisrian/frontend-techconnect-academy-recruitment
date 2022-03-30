import StatusRecruitmentBloc from "./bloc/StatusRecruitmenBloc";
import StatusRecruitmen from "./component/StatusRecruitmentComponent";
import StatusService from "./service/StatusService";

const StatusDetail = () =>{
    return (
       <StatusRecruitmen bloc={() => StatusRecruitmentBloc(StatusService)} />
    )
}
export default StatusDetail;