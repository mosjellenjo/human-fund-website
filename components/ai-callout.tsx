"use client";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function AICallout() {
  return (
    <section className="w-full hf-section bg-dark-green text-light-green-text">
      <div className="hf-container">
        <Reveal className="hf-glass-strong p-6 md:p-8">
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
            <div className="w-full md:w-80 h-28 md:h-32 rounded-xl bg-dark-green/70 backdrop-blur border border-brand-accent/25 p-3">
              <svg viewBox="0 0 240 80" className="w-full h-full" aria-hidden>
                <defs>
                  <linearGradient id="sparkFill" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(140,255,218,0.15)" />
                    <stop offset="100%" stopColor="rgba(140,255,218,0.5)" />
                  </linearGradient>
                </defs>
                <g>
                  <polyline stroke="#35504a" strokeDasharray="3 4" fill="none" points="0,70 240,70" />
                  <polyline stroke="#35504a" strokeDasharray="3 4" fill="none" points="0,50 240,50" />
                  <polyline stroke="#35504a" strokeDasharray="3 4" fill="none" points="0,30 240,30" />
                </g>
                <polyline fill="url(#sparkFill)" stroke="none" points="0,70 20,66 40,62 60,58 80,50 100,45 120,48 140,40 160,34 180,28 200,24 220,20 240,18 240,80 0,80"/>
                <polyline fill="none" stroke="hsl(var(--brand-accent))" strokeWidth="2.2" points="0,70 20,66 40,62 60,58 80,50 100,45 120,48 140,40 160,34 180,28 200,24 220,20 240,18"/>
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
