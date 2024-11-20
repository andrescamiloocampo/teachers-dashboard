import { Schedule } from "@/app/models/schedule.model";

export interface TeacherM{
    id: string;
    nit: string;
    name: string;
    lastName: string;
    area: string;    
    schedules?: Schedule[];
}

export const createTeacher = async(body:TeacherM):Promise<undefined> => {
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    const raw = JSON.stringify(body);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/createTeacher`,{
            method: 'POST',
            headers,
            body: raw
        });

        if(!response.ok)
            throw new Error('Fallo creando el profesor')

        return await response.json();
    } catch (error) {
        console.log(error)
    }
}