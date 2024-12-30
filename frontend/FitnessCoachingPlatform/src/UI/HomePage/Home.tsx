import React from "react";
import HeroSection from "./HeroSection";
import AboutUs from "./AboutUs";
import OurServices from "./OurServices";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import CallToActionSection from "./CallToActionSection";
import Footer from "./Footer";
import Navbar from "./Navbar";


const Home: React.FC = () => {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <AboutUs />
      <OurServices />
      <WhyChooseUs />
      <Testimonials />
      <CallToActionSection />
      <Footer />
    </>
  );
};

export default Home;
