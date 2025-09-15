"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = ["mission", "impact", "team", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        {
          root: null,
          // Trigger when section is near the middle of viewport
          rootMargin: "-45% 0px -45% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navClass = (id: string) =>
    `text-sm font-medium transition-colors rounded-md px-2 py-1 ${
      active === id
        ? "bg-white text-black"
        : "text-light-green-text hover:bg-white hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b-0 bg-dark-green text-light-green-text">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <span className="text-xl font-bold tracking-tight">The Human Fund</span>
          </Link>
          <span className="text-xs text-light-green-text hidden sm:inline-block">Money for People</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#mission" className={navClass("mission")} aria-current={active === "mission" ? "page" : undefined}>
            Mission
          </Link>
          <Link href="#impact" className={navClass("impact")} aria-current={active === "impact" ? "page" : undefined}>
            Impact
          </Link>
          <Link href="#team" className={navClass("team")} aria-current={active === "team" ? "page" : undefined}>
            Team
          </Link>
          <Link href="#contact" className={navClass("contact")} aria-current={active === "contact" ? "page" : undefined}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex bg-button-yellow text-black border-button-yellow hover:bg-white hover:text-black">
            Sign In
          </Button>
          <Button size="sm" asChild className="bg-button-yellow text-black hover:bg-white hover:text-black">
            <a href="#contact">Donate Now</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
