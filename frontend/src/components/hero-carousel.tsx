"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85", alt: "Team collaborating around a table", label: "Team review", detail: "Solve the hard parts together." },
  { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85", alt: "Developer working at a desk", label: "Focused work", detail: "Keep context close to the conversation." },
  { image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85", alt: "Team meeting in a bright workspace", label: "Better together", detail: "Turn meetings into momentum." },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto h-[520px] w-full py-2">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />
      <div className="relative flex h-full items-center justify-center overflow-hidden">
        <div className="relative h-full w-full">
          {[-1, 0, 1].map((offset) => {
            const index = (active + offset + slides.length) % slides.length;
            const isActive = offset === 0;
            const position = isActive ? "left-[calc(14%+8px)] w-[calc(72%_-_16px)] rounded-2xl" : offset < 0 ? "left-0 w-[14%] rounded-r-2xl" : "right-0 w-[14%] rounded-l-2xl";
            return <div key={`${slides[index].image}-${offset}`} className={`absolute top-0 h-full overflow-hidden bg-secondary transition-all duration-700 ${position} ${isActive ? "animate-carousel-enter z-10" : "z-0 opacity-60 blur-[1px]"}`}><Image src={slides[index].image} alt={slides[index].alt} fill priority={isActive} className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" /></div>;
          })}
        </div>
        <button type="button" onClick={() => setActive((active - 1 + slides.length) % slides.length)} className="absolute left-[calc(14%+4px)] top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-110 hover:bg-primary/90" aria-label="Previous image"><ChevronLeft className="h-4 w-4" /></button>
        <button type="button" onClick={() => setActive((active + 1) % slides.length)} className="absolute right-[calc(14%+4px)] top-1/2 z-20 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-110 hover:bg-primary/90" aria-label="Next image"><ChevronRight className="h-4 w-4" /></button>
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">{slides.map((item, index) => <button key={item.image} type="button" onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${index === active ? "w-5 bg-primary" : "w-2 bg-primary-foreground/70"}`} aria-label={`Show slide ${index + 1}`} />)}</div>
      </div>
    </div>
  );
}
