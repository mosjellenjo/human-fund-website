"use client";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import AIGlassIllustration from "@/components/AIGlassIllustration";

export function AICallout() {
  return (
    <section className="w-full bg-dark-green text-light-green-text py-12 md:py-16">
      <div className="hf-container">
        <Reveal className="hf-glass-strong p-5 md:p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white">The Human Fund AI</h3>
              <p className="mt-2 text-gray-300">
                A people‑first research platform from The Human Fund. We combine AI‑driven insights with practical,
                trustworthy tools to help investors discover ideas, analyze opportunities, and act with confidence.
              </p>
              <ul className="mt-3 grid gap-2 text-gray-300 text-sm md:text-base list-disc list-inside">
                <li>Daily signals and market summaries</li>
                <li>Transparent rating accuracy and methodology</li>
                <li>Clean dashboards designed for clarity and speed</li>
              </ul>
              <div className="mt-4">
                <Button variant="brand" asChild>
                  <a href="https://thehumanfund.no/" target="_blank" rel="noopener">Explore the Platform</a>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-[28rem]">
              <AIGlassIllustration />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
