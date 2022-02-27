import { client } from "../../../../http-client/Client";

const VacancyService = () =>{
    async function getInformationProgram(params){ 
        const response =  await client.get('/vacancy', {params})
        return response;
    }
    async function getDetailInformationProgram(id){
        const response =  await client.get(`/vacancy/${id}`)
        return response;
    }
    async function applyProgram(params){
        const response = await client.post(`/apply`, params)
        return response
    }
    return {
        getInformationProgram,
        getDetailInformationProgram,
        applyProgram
    }
}

export default VacancyService;