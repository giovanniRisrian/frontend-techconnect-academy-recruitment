import { client } from "../../../../http-client/Client";


const ProgramService = () => {
  const createProgram = async (program) => {
    const response = await client.post("/programs", program);
    return response;
  };

  const getSkills = async (data) => {
    const response = await client.get("/programs", { params: data });
    return response;
  };

  return { createProgram, getSkills };
};

export default ProgramService;
