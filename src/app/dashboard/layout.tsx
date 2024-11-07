import  "bootstrap/dist/css/bootstrap.min.css"
import { Metadata } from "next"
import { NavBar } from "../components/NavBar"

export const metadata:Metadata = {
    title: 'Dashboard',
    description: 'Admin dashboard'
}

export default function DashboardLayout({
    children
}:Readonly<{
    children: React.ReactNode
}>) {
    return(
        <section>            
            <NavBar/>
            {children}
        </section>
    )
}