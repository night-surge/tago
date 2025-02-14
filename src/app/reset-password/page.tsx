import BackgroundGrid from "@/components/BackgroundGrid";
import Navbar from "@/components/Navbar";
import ResetPassword from "@/components/ResetPassword";
import { Suspense } from "react";

export default function Home() { 
    return(
        <>
        <Suspense>
            <BackgroundGrid>
                <Navbar />
                <ResetPassword />
            </BackgroundGrid>
        </Suspense>    
        </>
    )
}