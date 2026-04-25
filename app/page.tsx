// bookmark-manager/app/page.tsx

'use client';

import CTA from '@/components/home/CTA';
import Hero from '@/components/home/Hero';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import Pricing from '@/components/home/Pricing';
import Features from '@/components/home/Features';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#06060E] text-[#E8E4D9] overflow-x-hidden font-sans">
      <div className="noise" />
      <Navbar />
      <Hero />
      <Features />
      {/* ══════════════ DEMO SNAP — SEARCH & AI TAGS══════════════ */}
      <Pricing />
      <CTA />
      <Footer />{' '}
    </div>
  );
}
