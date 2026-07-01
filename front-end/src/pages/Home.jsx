import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServiceSection";
import HowItWorks from "../components/HowItWorks";
import LocationSection from "../components/LocationSection";
import WhyChooseUsSection from "../components/whyChooseUs";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      
      {/* <ServicesSection/> */}
      <WhyChooseUsSection/>
      <HowItWorks/>
      <LocationSection/>
      <Footer />

      

      <h1>Од авто засвар</h1>
      <div>
        
      </div>

    </div>
  );
}

export default Home;
