import Navbar from "../components/shared/Navbar";
import HeroSection from "../components/sections/HeroSection";
import BiographySection from "../components/sections/BiographySection";
import AchievementsSection from "../components/sections/AchievementsSection";
import MusicSection from "../components/sections/MusicSection";
import YouTubeSection from "../components/sections/YouTubeSection";
import GallerySection from "../components/sections/GallerySection";
import SocialSection from "../components/sections/SocialSection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/shared/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BiographySection />
      <AchievementsSection />
      <MusicSection />
      <YouTubeSection />
      <GallerySection />
      <SocialSection />
      <ContactSection />
      <Footer />
    </>
  );
}
