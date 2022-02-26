import { client } from "../../../../http-client/Client";


const ProgramService = () => {
  const createProgram = async (program, header) => {
    const response = await client.post("/programs", program, header);
    return response;
  };

  const getSkills = async (data) => {
    const response = await client.get("/programs", { params: data });
    return response;
  };

  return { createProgram, getSkills };
};

export default ProgramService;
