import ListRecruiterComponent from '../listRecruiter/component/ListRecruiter';
import RecruiterService from '../listRecruiter/service/RecruiterService';
import RecruiterBloc from '../listRecruiter/bloc/ListRecruiterBloc';

const ListRecruiter = () => {
    return(
        <ListRecruiterComponent bloc={() => RecruiterBloc(RecruiterService)}/>
    )
}
export default ListRecruiter;