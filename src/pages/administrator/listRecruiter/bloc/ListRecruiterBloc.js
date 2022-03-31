import Swal from "sweetalert2";
import ActionType from "../../../../Context/ActionType";

const ListRecruiterBloc = (service, useRecruiterList, navigate) => {
  let {
    getListRecruiter,
    getRecruiterbyId,
    deleteRecruiter,
    postRegisterRecruiter,
    updateRecruiter,
  } = service();
  let {
    listRecruiter,
    setList,
    isLoading,
    setIsLoading,
    pageSize,
    setPageSize,
    modalRegister,
    setModalRegister,
    modalUpdate,
    setModalUpdate,
    id,
    setId,
    initialValueUpdate,
    changeInitialValueUpdate,
  } = useRecruiterList();

  const allRecruiter = async (context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setIsLoading(true);
      const response = await getListRecruiter(config);
      setList(response.data.data);
      setIsLoading(false);
      return response;
    } catch (err) {
      throw err;
    }
  };
  const deleteRecruiterbyId = async (id, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setIsLoading(true);
      await deleteRecruiter(id, config);
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      throw err;
    }
  };

  const doRegisterRecruiter = async (val, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      let res = await postRegisterRecruiter(val, config);
      // setModalRegister(false);
      // window.location.reload();
      // console.log(res);
      setModalRegister(false);
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      return res;
      // context.dispatch({
      //   type: ActionType.Register,
      //   token: res.data.data.token,
      //   name: res.data.data.name,
      // });
      // setModalRegister(false);
    } catch (err) {
      setModalRegister(false);
      Swal.fire({
        icon: "error",
        text: "Email has already exist",
      });
      throw err;
    }
  };

  const recruiterById = async (id, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      const response = await getRecruiterbyId(id, config);
      // console.log("apakah ini?", response.data.data);
      let mock = {
        fullname: "",
        email: "",
      };
      mock.fullname = response.data.data.fullname;
      mock.email = response.data.data.email;
      // console.log("mock", mock);
      changeInitialValueUpdate(mock);
      return response.data.data;
    } catch (err) {
      throw err;
    }
  };

  const updateRecruiterById = async (val, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      let mock = { ...val, ID: id };
      const response = await updateRecruiter(mock, config);
      setModalUpdate(false);

      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      return response;
    } catch (err) {
      setModalUpdate(false);
      Swal.fire({
        icon: "error",
        text: "Email has already exist",
      });
      throw err;
    }
  };

  return {
    allRecruiter,
    deleteRecruiterbyId,
    listRecruiter,
    isLoading,
    pageSize,
    setPageSize,
    modalRegister,
    setModalRegister,
    modalUpdate,
    setModalUpdate,
    doRegisterRecruiter,
    recruiterById,
    updateRecruiterById,
    setId,
    initialValueUpdate,
  };
};

export default ListRecruiterBloc;
