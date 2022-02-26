import { client } from "../../../../http-client/Client";

const VacancyService = () =>{
    async function getInformationProgram(data){
        const response =  await client.get('/vacancy', {params:data})
        return response;
    }
    async function getDetailInformationProgram(id){
        const response =  await client.get(`/vacancy/${id}`)
        return response;
    }
    async function applyProgram(params, header){
        const response = await client.post(`/apply`, params, header)
        return response
    }
    return {
        getInformationProgram,
        getDetailInformationProgram,
        applyProgram
    }
}

export default VacancyService;