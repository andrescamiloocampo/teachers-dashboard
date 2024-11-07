import { redirect } from "next/navigation";

export default async function dashboardPage(){
    redirect('/dashboard/teachers')
}
