const UpdateRecruiterBloc = (service, useUpdateRecruiter, navigation) => {
  const { navigateTo, paramsNav } = navigation();
  const { getRecruiterbyId, updateRecruiter } = service();
  const { data, setData } = useUpdateRecruiter();
  const params = paramsNav();

  console.log("id", params.id);
  const recruiterById = async (context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      const response = await getRecruiterbyId(params.id, config);
      setData(response);
      return response.data.data;
    } catch (err) {
      throw err;
    }
  };

  const updateRecruiterById = async (paramsUpdate, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      console.log(paramsUpdate);
      let mock = { ...paramsUpdate.values, ID: params.id };
      console.log("hasil mock", mock);
      const response = await updateRecruiter(mock, config);
      return response;
    } catch (e) {
      throw e;
    }
  };
  return { recruiterById, updateRecruiterById, data, navigateTo };
};

export default UpdateRecruiterBloc;
