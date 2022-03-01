// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { RootContext } from "../../../../App";
// import ActionType from "../../../../Context/ActionType";

import { useState } from "react";
import { useNavigate } from "react-router";

const UploadButtonBloc = (UploadService) => {
  const navigate = useNavigate()
  let {postUpload,postGetDataByListId} = UploadService()
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
      // setInfo(res.data.data.matchId)
      let res2 = await postGetDataByListId({"ID":res.data.data.matchId},config);
      setLoading(false)
      console.log(res2.data.data)
      navigate('/vacancy',{state:res2.data.data})
      // console.log(res2);
    } catch (err) {
      alert(err);
    }
  };
  return { doUpload, loading };
};
export default UploadButtonBloc;
