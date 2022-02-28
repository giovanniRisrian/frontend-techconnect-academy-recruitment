// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { RootContext } from "../../../../App";
// import ActionType from "../../../../Context/ActionType";

import { useState } from "react";
import { useNavigate } from "react-router";

const UploadButtonBloc = (UploadService) => {
  const navigate = useNavigate()
  let {postUpload} = UploadService()
  const [loading, setLoading] = useState(false)
  const doUpload = async (file, context,setInfo) => {
    var formData = new FormData();
    formData.append("file", file.file);
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}`,
        'Content-Type': 'multipart/form-data' },
      };
      setLoading(true)
      let res = await postUpload(formData,config);
      console.log("otuputtt",res.data.data)
      setInfo(res.data.data)
      setLoading(false)
      navigate('/vacancy')
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };
  return { doUpload, loading };
};
export default UploadButtonBloc;
