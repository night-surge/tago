import BackgroundGrid from "@/components/BackgroundGrid";
import ForgotPassword from "@/components/ForgotPassword";
import Navbar from "@/components/Navbar";

export default function Home() {
    return(
        <>
        <BackgroundGrid>
            <Navbar />
            <ForgotPassword />
        </BackgroundGrid>
        </>
    )
}