// import { useNavigate } from "react-router-dom";
import ActionType from "../../../../Context/ActionType";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const ActivationBloc = (ActivationService) => {
  const navigate = useNavigate()
  let { resendActivation } = ActivationService();
  const doResend = async (email, context) => {
    try {
      let res = await resendActivation(email);
      console.log("RESPONSE", res);
      context.dispatch({
        type: ActionType.LOGOUT,
      })
      Swal
      .fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Email is not registered",
      });
      throw err
    }
  };
 
  return { doResend };
};
export default ActivationBloc;
