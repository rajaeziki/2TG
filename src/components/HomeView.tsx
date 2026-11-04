"use client";

import Header from "@/components/Header";
import Splash from "@/components/Splash";
import SceneLoader from "@/components/SceneLoader";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Why from "@/components/Why";
import HowItWorks from "@/components/HowItWorks";
import QuoteBuilder from "@/components/QuoteBuilder";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import SiteFooter from "@/components/SiteFooter";
import ChatWidget from "@/components/ChatWidget";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomeView() {
  return (
    <main className="relative">
      <Splash />
      <SceneLoader />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <Why />
        <HowItWorks />
        <QuoteBuilder />
        <Testimonials />
        <Gallery />
        <Faq />
        <SiteFooter />
        <ChatWidget />
        <FloatingWhatsApp />
      </div>
    </main>
  );
}
