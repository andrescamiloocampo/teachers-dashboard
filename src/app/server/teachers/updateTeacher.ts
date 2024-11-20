import { type Schedule } from "@/app/models/schedule.model";

export const updateTeacher = async(body:Schedule,id:string):Promise<undefined> => {
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    const raw = JSON.stringify(body);    

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/teachers/${id}/addSchedule`,{
            method: 'PUT',
            headers,
            body: raw            
        });

        if(!response.ok)
            throw new Error('Fallo creando horario')

        return await response.json();
    } catch (error) {
        console.log(error)
    }
}