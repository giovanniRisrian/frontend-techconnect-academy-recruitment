import UploadButtonBloc from "./bloc/UploadButtonBloc"
import UploadButtonComponent from "./component/UploadButtonComponent"
import UploadService from "./service/UploadService"

const UploadButton = ()=>{
    return(<UploadButtonComponent bloc={() => UploadButtonBloc(UploadService)}/>)
}
export default UploadButton