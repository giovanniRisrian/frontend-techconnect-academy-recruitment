// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { RootContext } from "../../../../App";
// import ActionType from "../../../../Context/ActionType";

const UploadButtonBloc = (UploadService) => {
  // const navigate = useNavigate();
  
  let {postUpload} = UploadService()
  const doUpload = async (file, context,setInfo) => {
    

    var formData = new FormData();
    formData.append("file", file.file);
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}`,
        'Content-Type': 'multipart/form-data' },
      };
      let res = await postUpload(formData,config);
      console.log("otuputtt",res.data.data)
      setInfo(res.data.data)
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };
  return { doUpload };
};
export default UploadButtonBloc;
