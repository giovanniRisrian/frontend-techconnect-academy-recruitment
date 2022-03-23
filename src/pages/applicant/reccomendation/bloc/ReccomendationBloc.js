// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { RootContext } from "../../../../App";
// import ActionType from "../../../../Context/ActionType";

import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { RootContext } from "../../../../App";
const ReccomendationBloc = (ReccomendationService) => {
  const navigate = useNavigate();
  const context = useContext(RootContext);

  const { getJobReccomendationId, postGetDataByListId } =
    ReccomendationService();
  // console.log(getJobReccomendationId);
  // let { getJobReccomendationId } = ReccomendationService();
  // console.log("apaeror");

  const doReccomendation = async () => {
    console.log("masuik sini");
    let userInfo = jwt_decode(context.userInfo);
    console.log(userInfo);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          // "Content-Type": "multipart/form-data",
        },
      };
      console.log(context.userInfo)
      let resp = await getJobReccomendationId(config);
      console.log(resp.data.data);
      console.log("OIIII");
      let resp2 = await postGetDataByListId({ ID: resp.data.data }, config);
      // console.log(resp2.data.data);
      navigate("/vacancy", { state: resp2.data.data })
    } catch (err) {
      alert(err);
    }
  };
  return { doReccomendation };
};
export default ReccomendationBloc;
