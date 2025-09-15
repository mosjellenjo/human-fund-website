import Chatbot from '@/components/Chatbot';
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { AICallout } from "@/components/ai-callout"
import { ImpactSection } from "@/components/impact-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SEOSection } from "@/components/seo-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <MissionSection />
        <Chatbot />
        <AICallout />
        <ImpactSection />
        <TeamSection />
        <ContactSection />
        <SEOSection />
      </main>
      <SiteFooter />
    </div>
  )
}
