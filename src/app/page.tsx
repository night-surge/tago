import BackgroundGrid from "../components/BackgroundGrid";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PhotoCarousel from "../components/Carousel";

export default function Home() {
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


