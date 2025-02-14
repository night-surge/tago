import BackgroundGrid from "@/components/BackgroundGrid";
import Navbar from "@/components/Navbar";
import ResetPassword from "@/components/ResetPassword";

export default function Home() { 
    return(
        <>
        <BackgroundGrid>
            <Navbar />
            <ResetPassword />
        </BackgroundGrid>    
        </>
    )
}