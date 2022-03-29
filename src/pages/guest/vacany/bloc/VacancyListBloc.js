import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const VacancyListBloc = (programService, useVacancyList) => {
  const { state } = useLocation();
  let { list, setList } = useVacancyList();
  const [typeProgram, setTypeProgram] = useState([]);
  const [types, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let [pages, setPage] = useState(1);
  let navigate = useNavigate();
  let { getInformationProgram, getProgramType, getAppliedProgram } =
    programService();

  const getListJobInformation = async (page, filter, search, context) => {
    let config;
    let userInfo;
    let responseAppliedId;
    let tempList;
    try {
      setLoading(true);

      if (context.userInfo) {
        config = {
          headers: { Authorization: `Bearer ${context.userInfo}` },
        };
        userInfo = jwt_decode(context.userInfo);
        console.log("Informasi Token", userInfo);
        responseAppliedId = await getAppliedProgram(userInfo.id, config);
        responseAppliedId = responseAppliedId.data.data
      }

      if (!state) {
        const response = await getInformationProgram(page, filter, search);
        tempList = response.data.data;
      } else {
        tempList = { ProgramList: state, LastPage: 1 };
      }
      console.log(context.userInfo)
      for (let x = 0; x < tempList.ProgramList.length; x++) {
        console.log(x + "=>", tempList.ProgramList[x].ID);
        if (context.userInfo) {
          
          if (responseAppliedId.includes(tempList.ProgramList[x].ID)) {
            tempList.ProgramList[x].applied = true;
          } else {
            tempList.ProgramList[x].applied = false;
          }
        } else {
          tempList.ProgramList[x].applied = false;
        }
      }
      console.log(tempList);
      setList(tempList);
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
        const response = await getInformationProgram(pages, "", searchValue);
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
    const lowerType = types.toLowerCase();
    setPage(1);
    getListJobInformation((pages = 1), lowerType, "");
    setPage(pages);
    setType(types);
  };

  const handlePage = (page, context) => {
    getListJobInformation(
      page,
      types.toLocaleLowerCase(),
      searchValue,
      context
    );

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
