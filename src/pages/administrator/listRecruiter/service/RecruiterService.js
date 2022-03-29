import { client } from "../../../../http-client/Client";

const RecruiterService = () =>{
    async function getListRecruiter(header){ 
        const response =  await client.get(`/administrator/recruiter`, header)
        return response;
    }
    async function getRecruiterbyId(id){
        const response =  await client.get(`/administrator/recruiter?id=${id}`)
        return response;
    }
    async function updateRecruiter(params, header){
        const response = await client.put("/administrator/update/recruiter",params,header)
        return response
    }
    async function deleteRecruiter(id){
        const response = await client.delete(`/administrator/delete/recruiter?id=${id}`)
        return response
    }

    return {
        getListRecruiter,
        getRecruiterbyId,
        updateRecruiter,
        deleteRecruiter
    }
}

export default RecruiterService;