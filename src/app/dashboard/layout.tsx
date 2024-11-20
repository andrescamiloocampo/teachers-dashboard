import  "bootstrap/dist/css/bootstrap.min.css"
import { Metadata } from "next"
import { NavBar } from "../components/NavBar"
import { FingerprintJSPro, FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react"

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
            <FpjsProvider 
                loadOptions={
                    {
                        apiKey: 'Qken9bAfR7MMMeaGxl8z',
                        endpoint: [
                            FingerprintJSPro.defaultEndpoint
                        ],                        
                        region: 'us'
                    }
                }
            >
            <NavBar/>
            {children}                
            </FpjsProvider>       
        </section>
    )
}