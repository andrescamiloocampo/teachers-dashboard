import type { Teacher } from "@/app/models/teacher.model"

export const getTeachers = async ():Promise<Teacher[] | undefined> => {
    try {
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/teachers`,{
            method: 'GET',
            headers
        })

        if(!response.ok){
            throw new Error(`Couldn't resolve data`);            
        }

        const data = await response.json();
        return data as Teacher[];

    } catch (error) {
        console.log(error);
        return undefined;
    }
}