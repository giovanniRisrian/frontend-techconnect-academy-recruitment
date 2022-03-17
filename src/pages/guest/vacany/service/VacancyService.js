import { client } from "../../../../http-client/Client";

const VacancyService = () =>{
    async function getInformationProgram(page){ 
        const response =  await client.get(`/program?page=${page}&limit=6&sort_by=created_at&order_by=desc`)
        return response;
    }
    async function getSearchProgram(search){ 
        const response =  await client.get(`/program?name=${search}&sort_by=created_at&order_by=desc`)
        return response;
    }
    async function getDetailInformationProgram(id){
        const response =  await client.get(`/program?id=${id}`)
        return response;
    }
    async function applyProgram(params, header){
        const response = await client.post(`/program_applicant/apply`, params, header)
        return response
    }

    const getDataApplicantbyId = async(header) =>{
        const response = await client.get("/user",header)
        return response 
      }
    return {
        getInformationProgram,
        getDetailInformationProgram,
        applyProgram,
        getDataApplicantbyId,
        getSearchProgram,
    }
}

export default VacancyService;