import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Reveal } from "@/components/reveal"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark-green text-light-green-text">
      <div className="hf-aurora" aria-hidden />
      <Reveal className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8 py-24">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-black">Established 1997</div>
        <h1 className="hf-hero-title max-w-3xl">
          Money for People
        </h1>
        <p className="hf-hero-sub">
          The Human Fund is dedicated to making a difference in the lives of people everywhere, especially during the
          Festivus season.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" variant="brand" className="px-8" asChild>
            <a href="#contact">Donate Now</a>
          </Button>
          <Button size="lg" variant="brand" className="px-8" asChild>
            <a href="#mission">Learn More</a>
          </Button>
          <Button size="lg" variant="brand" className="px-8" asChild>
            <a href="https://thehumanfund.no/" target="_blank" rel="noopener">Explore The Human Fund AI</a>
          </Button>
        </div>
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">45K+</span>
            <span className="text-light-green-text">Festivus Celebrators</span>
          </div>
          <div className="h-12 w-px bg-light-green-text hidden sm:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">23</span>
            <span className="text-light-green-text">Countries</span>
          </div>
          <div className="h-12 w-px bg-light-green-text hidden sm:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">12K+</span>
            <span className="text-light-green-text">Lives Improved</span>
          </div>
        </div>
      </Reveal>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,31,30,0.0) 0%, rgba(4,31,30,0.25) 30%, rgba(4,31,30,0.5) 50%, rgba(4,31,30,0.25) 70%, rgba(4,31,30,0.0) 100%)",
        }}
        aria-hidden
      />
    </section>
  )
}
