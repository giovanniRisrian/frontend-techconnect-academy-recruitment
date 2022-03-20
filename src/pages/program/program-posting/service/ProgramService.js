import { client } from "../../../../http-client/Client";

const ProgramService = () => {
  const createProgram = async (program, header) => {
    const response = await client.post("/program", program, header);
    return response;
  };

  // const getSkills = async (data) => {
  //   const response = await client.get("/programs", { params: data });
  //   return response;
  // };

  const getProgramTypes = async (data) => {
    const response = await client.get("/program/programtype", { params: data });
    return response;
  };

  return { createProgram, getProgramTypes };
};

export default ProgramService;
