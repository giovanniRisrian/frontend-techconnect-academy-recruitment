import { client } from "../../../../http-client/Client";

const VacancyService = () =>{
    async function getInformationProgram(page){ 
        const response =  await client.get(`/program?page=${page}&limit=4`)
        return response;
    }
    async function getDetailInformationProgram(id){
        const response =  await client.get(`/program?id=${id}`)
        return response;
    }
    async function applyProgram(params){
        const response = await client.post(`/program_applicant/apply`, params)
        return response
    }
    return {
        getInformationProgram,
        getDetailInformationProgram,
        applyProgram
    }
}

export default VacancyService;