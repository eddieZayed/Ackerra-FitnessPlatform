import React from "react";
import Navbar from "../components/HomePageComponents/Navbar";
import HeroSection from "../components/HomePageComponents/HeroSection";
import AboutUs from "../components/HomePageComponents/AboutUs";
import OurServices from "../components/HomePageComponents/OurServices";
import WhyChooseUs from "../components/HomePageComponents/WhyChooseUs";
import TestimonialSection from "../components/HomePageComponents/Testimonials";
import CallToAction from "../components/HomePageComponents/CallToActionSection";
import Footer from "../components/HomePageComponents/Footer";



const Home: React.FC = () => {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <AboutUs />
      <OurServices />
      <WhyChooseUs />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Home;
