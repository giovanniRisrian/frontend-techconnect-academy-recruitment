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
    return {
        getInformationProgram,
        getDetailInformationProgram
    }
}

export default VacancyService;