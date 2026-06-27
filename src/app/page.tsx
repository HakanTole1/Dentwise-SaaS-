import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import WhatToAsk from "@/components/landing/WhatToAsk";


export default function Home() {
  return (
   <div className="min-h-screen bg-background"> {/*Landing Page */}
    <Header />
    <Hero/>
    <HowItWorks />
    <WhatToAsk />
    <PricingSection />
    <CallToAction />
    <Footer />
    

   </div>
  );
}