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
  const [idList, setIdlist] = useState(null)
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
        responseAppliedId = responseAppliedId.data.data;
        setIdlist(responseAppliedId)
      }

      if (!state) {
        const response = await getInformationProgram(page, filter, search);
        tempList = response.data.data;
      } else {
        tempList = { ProgramList: state, LastPage: 1 };
      }
      console.log(context.userInfo);
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

  const getSearchByName = async (e,context) => {
    // console.log(e);
    let config;
    let userInfo;
    let responseAppliedId;
    let tempList;

    try {
      if (e.keyCode === 13) {
        if (context.userInfo) {
          config = {
            headers: { Authorization: `Bearer ${context.userInfo}` },
          };
          userInfo = jwt_decode(context.userInfo);
          // responseAppliedId = await getAppliedProgram(userInfo.id, config);
          responseAppliedId = idList
          // setIdlist(responseAppliedId)
          
        }
        setPage(1);
        setType("All")
        const response = await getInformationProgram(pages , "", searchValue);
        tempList = response.data.data;
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
        setList(tempList);
        setPage(pages);
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

  const handleType = async (types, context) => {
    // const lowerType = types.toLowerCase();
    let config;
    let userInfo;
    let responseAppliedId;
    let tempList;
    try {
      if (context.userInfo) {
        config = {
          headers: { Authorization: `Bearer ${context.userInfo}` },
        };
        userInfo = jwt_decode(context.userInfo);
        // responseAppliedId = await getAppliedProgram(userInfo.id, config);
        responseAppliedId = idList
        // setIdlist(responseAppliedId)
        
      }
      setSearchValue("")
      setPage(1);
      const response = await getInformationProgram((pages = 1), types, "");
      tempList = response.data.data;
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
      setList(tempList);
      setPage(pages);
      setType(types);
    } catch (e) {
      throw e;
    }
  };

  const handlePage = (page, context) => {
    getListJobInformation(page, types, searchValue, context);

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
