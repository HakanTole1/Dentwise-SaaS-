import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import WhatToAsk from "@/components/landing/WhatToAsk";
import { syncUser } from "@/lib/actions/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home() {

  const user = await currentUser() //get currentUser from Clerk 

  // the best way of syncing => webhooks
  await syncUser() // once user in db 

  if(user) redirect("/dashboard")  //if user authenticated redirect user to dashboard
  
  return (
   <div className="min-h-screen bg-background"> {/*Landing Page */}
    <Header />
    <Hero/>

    <section id="#how-it-works" className="scroll-mt-24">
      <HowItWorks />
    </section>
    
    <section id="#what-to-ask" className="scroll-mt-24">
      <WhatToAsk />
    </section>
    
    <section id="#pricing" className="scroll-mt-24">
      <PricingSection />
    </section>
    
    <section id="#cta" className="scroll-mt-24">
      <CallToAction />
    </section>
    

    <Footer />
    

   </div>
  );
}