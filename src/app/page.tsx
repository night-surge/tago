import BackgroundGrid from "../components/BackgroundGrid";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PhotoCarousel from "../components/Carousel";
import Home from "../components/themes/LightMode";
import DashMode from "@/components/themes/DashMode";
// import CandyMode from "@/components/themes/CandyMode";

export default function home() {
  return (
    <>
    <BackgroundGrid>
      <Navbar />
      <PhotoCarousel scrollSpeed={1} />
      <Hero />
    </BackgroundGrid>
    </>
  );
}