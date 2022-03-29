import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const VacancyListBloc = (programService, useVacancyList) => {
  const { state } = useLocation();
  let { list, setList } = useVacancyList();
  const [typeProgram, setTypeProgram] = useState([]);
  const [types, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let [pages, setPage] = useState(1);
  let navigate = useNavigate();
  let { getInformationProgram, getProgramType} = programService();

  const getListJobInformation = async (page, filter, search) => {
    try {
      setLoading(true);
      if (!state) {
        const response = await getInformationProgram(page, filter, search);
        setList(response.data.data);
        // console.log("resssss",response);
      } else {
        setList({ ProgramList: state, LastPage: 1 });
      }

      setLoading(false);
      return list;
    } catch (err) {
      throw err;
    }
  };

  const getSearchByName = async (e) => {
    // console.log(e);
    try {
      if (e.keyCode === 13) {
        setPage(1);
        const response = await getInformationProgram(pages, types, searchValue);
        setList(response.data.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const getProgramTypeName = async () => {
    try {
      let response = await getProgramType();
      setTypeProgram(response.data.data);
    } catch (e) {
      throw e;
    }
  };

  const handleType = (types) => {
    setPage(1);
    getListJobInformation((pages = 1), types,searchValue);
    setPage(pages);
    setType(types);
  };

  const handlePage = (page) => {
    getListJobInformation(page, types, searchValue);

    setPage(page);
  };

  return {
    list,
    loading,
    navigate,
    getListJobInformation,
    getSearchByName,
    setSearchValue,
    getProgramTypeName,
    typeProgram,
    types,
    handleType,
    pages,
    setPage,
    searchValue,
    handlePage,
    state,
  };
};

export default VacancyListBloc;
