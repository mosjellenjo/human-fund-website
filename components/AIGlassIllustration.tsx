"use client";
import React from "react";

/**
 * Brand‑styled SVG illustration: glass orb with inner grid, rotating ring,
 * and three orbiting mint badges. Animations respect reduced‑motion.
 */
export default function AIGlassIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-64 md:h-72 ${className}`} aria-hidden>
      <svg viewBox="0 0 420 200" className="w-full h-full">
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(140,255,218,0.35)" />
            <stop offset="60%" stopColor="rgba(140,255,218,0.12)" />
            <stop offset="100%" stopColor="rgba(140,255,218,0.04)" />
          </radialGradient>
          <linearGradient id="orbSheen" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Orbit paths (tilted ellipses) */}
          <path id="orbit0" d="M 210,100 m -92,0 a 92,36 0 1,0 184,0 a 92,36 0 1,0 -184,0" fill="none" />
          <path id="orbit15" d="M 210,100 m -92,0 a 92,36 15 1,0 184,0 a 92,36 15 1,0 -184,0" fill="none" />
          <path id="orbit30" d="M 210,100 m -92,0 a 92,36 30 1,0 184,0 a 92,36 30 1,0 -184,0" fill="none" />
          <path id="orbit45" d="M 210,100 m -92,0 a 92,36 45 1,0 184,0 a 92,36 45 1,0 -184,0" fill="none" />
          <path id="orbit-15" d="M 210,100 m -92,0 a 92,36 -15 1,0 184,0 a 92,36 -15 1,0 -184,0" fill="none" />
          <path id="orbit-30" d="M 210,100 m -92,0 a 92,36 -30 1,0 184,0 a 92,36 -30 1,0 -184,0" fill="none" />
          <path id="orbit-45" d="M 210,100 m -92,0 a 92,36 -45 1,0 184,0 a 92,36 -45 1,0 -184,0" fill="none" />
          {/* front/back halves for occlusion */}
          <clipPath id="frontArc" clipPathUnits="userSpaceOnUse">
            <ellipse cx="210" cy="100" rx="70" ry="28" />
            <rect x="0" y="100" width="420" height="100" />
          </clipPath>
          <clipPath id="backArc" clipPathUnits="userSpaceOnUse">
            <ellipse cx="210" cy="100" rx="70" ry="28" />
            <rect x="0" y="0" width="420" height="100" />
          </clipPath>
          {/* Icon symbols */}
          <g id="ic-analytics">
            <circle r="14" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <rect x="-6" y="-3" width="3" height="8" fill="hsl(var(--brand-accent))" />
            <rect x="-1" y="-6" width="3" height="11" fill="hsl(var(--brand-accent))" />
            <rect x="4" y="-1" width="3" height="6" fill="hsl(var(--brand-accent))" />
          </g>
          <g id="ic-dollar">
            <circle r="14" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <text x="0" y="4" text-anchor="middle" font-size="12" font-family="Inter, sans-serif" fill="hsl(var(--brand-accent))">$</text>
          </g>
          <g id="ic-euro">
            <circle r="14" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <text x="0" y="4" text-anchor="middle" font-size="12" font-family="Inter, sans-serif" fill="hsl(var(--brand-accent))">€</text>
          </g>
          <g id="ic-bitcoin">
            <circle r="14" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <text x="0" y="4" text-anchor="middle" font-size="11" font-family="Inter, sans-serif" fill="hsl(var(--brand-accent))">₿</text>
          </g>
          <g id="ic-pound">
            <circle r="14" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <text x="0" y="4" text-anchor="middle" font-size="12" font-family="Inter, sans-serif" fill="hsl(var(--brand-accent))">£</text>
          </g>
          <g id="ic-yen">
            <circle r="14" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <text x="0" y="4" text-anchor="middle" font-size="12" font-family="Inter, sans-serif" fill="hsl(var(--brand-accent))">¥</text>
          </g>
          <g id="ic-chip">
            <circle r="14" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="hsl(var(--brand-accent))" />
            <line x1="-8" y1="-2" x2="-8" y2="2" stroke="hsl(var(--brand-accent))" />
            <line x1="8" y1="-2" x2="8" y2="2" stroke="hsl(var(--brand-accent))" />
            <line x1="-2" y1="-8" x2="2" y2="-8" stroke="hsl(var(--brand-accent))" />
            <line x1="-2" y1="8" x2="2" y2="8" stroke="hsl(var(--brand-accent))" />
          </g>
          <g id="ic-exchange">
            <circle r="12" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <path d="M -7 -2 L 0 -6 L 7 -2" fill="none" stroke="hsl(var(--brand-accent))" />
            <rect x="-6" y="-2" width="3" height="8" fill="hsl(var(--brand-accent))" />
            <rect x="-1.5" y="-2" width="3" height="8" fill="hsl(var(--brand-accent))" />
            <rect x="3" y="-2" width="3" height="8" fill="hsl(var(--brand-accent))" />
          </g>
          <g id="ic-case">
            <circle r="12" fill="rgba(140,255,218,0.12)" stroke="hsl(var(--brand-accent))" />
            <rect x="-6" y="-2" width="12" height="8" fill="none" stroke="hsl(var(--brand-accent))" />
            <rect x="-2" y="-5" width="4" height="3" fill="none" stroke="hsl(var(--brand-accent))" />
          </g>
        </defs>

        {/* Orb base (globe) */}
        <g id="globe" transform="translate(210,100)">
          <circle r="90" fill="url(#orbGlow)" filter="url(#softGlow)" />
          {/* Parallels (latitude) */}
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={`lat-${i}`} r={10 + i * 12} fill="none" stroke="#35504a" strokeOpacity="0.55" strokeDasharray="3 4" />
          ))}
          {/* Meridians (static thin ellipses) */}
          <g className="globe-meridians">
          {[-60,-30,0,30,60].map((a,i)=> (
            <g key={`mer-${i}`} transform={`rotate(${a})`}>
              <ellipse rx="80" ry="34" fill="none" stroke="#35504a" strokeOpacity="0.5" strokeDasharray="3 4" />
            </g>
          ))}
          </g>
          {/* Rotating ring (kept within frame) */}
          <g className="ai-rotate" style={{ transformOrigin: "center" }}>
            <ellipse rx="96" ry="40" fill="none" stroke="hsl(var(--brand-accent))" strokeOpacity="0.35" />
          </g>
          {/* Sheen */}
          <path d="M -54 -58 C -10 -74, 10 -74, 54 -58" fill="none" stroke="url(#orbSheen)" strokeWidth="7" strokeLinecap="round" />
          {/* Continent shapes (Americas, Africa/Eurasia, Asia/Australia) rotate to show spin */}
          <g className="globe-land" opacity="0.9">
            <path d="M -30 -8 q 12 -10 26 -6 q 10 2 10 12 q -2 10 -12 14 q -14 6 -28 -2 q -10 -6 4 -18 z" fill="rgba(140,255,218,0.12)" />
            <path d="M 6 -2 q 10 -4 18 4 q 12 10 2 20 q -10 10 -22 6 q -12 -4 -8 -14 q 4 -10 10 -16 z" fill="rgba(140,255,218,0.10)" />
            <path d="M 24 10 q 8 -2 14 6 q 6 8 -6 12 q -10 4 -16 -2 q -6 -6 8 -16 z" fill="rgba(140,255,218,0.08)" />
          </g>
        </g>

        {/* Independent tilted orbits with fade when behind */}
        {[
          {sym:'#ic-analytics', angle:0,    begin:'-0s'},
          {sym:'#ic-dollar',    angle:15,   begin:'-2s'},
          {sym:'#ic-euro',      angle:30,   begin:'-4s'},
          {sym:'#ic-yen',       angle:-15,  begin:'-6s'},
          {sym:'#ic-pound',     angle:-30,  begin:'-8s'},
          {sym:'#ic-bitcoin',   angle:45,   begin:'-10s'},
          {sym:'#ic-chip',      angle:-45,  begin:'-12s'},
          {sym:'#ic-exchange',  angle:20,   begin:'-14s'},
          {sym:'#ic-case',      angle:-20,  begin:'-16s'}
        ].map((it,i)=> (
          <g key={`orb-${i}`} transform={`rotate(${it.angle} 210 100)`}>
            <use href={it.sym} opacity="1">
              <animateMotion dur="26s" begin={it.begin} repeatCount="indefinite" rotate="auto">
                <mpath href="#orbit0" />
              </animateMotion>
              <animate attributeName="opacity" values="1;0.25;1" keyTimes="0;0.5;1" dur="26s" begin={it.begin} repeatCount="indefinite" />
            </use>
          </g>
        ))}
        
        {/* (Hand illustration removed per request to focus on globe) */}
      </svg>

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .ai-rotate { animation: airot 18s linear infinite; }
          .ai-orbit { animation: aiorbit 22s linear infinite; transform-origin: 0 0; }
          .ai-follow { }
          .globe-meridians { opacity: 0.6; }
          .globe-land { animation: airot 32s linear infinite; transform-origin: center; transform-box: fill-box; }
        }
        @keyframes airot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes aiorbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
