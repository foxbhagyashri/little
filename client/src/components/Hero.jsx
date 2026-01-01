import { useEffect, useState } from "react";
import FloatingShapes from "./FloatingShapes";

export default function Hero() {
  const slides = [
    "/banner_one.jpg",
    "/banner_three.jpg",
    "/banner_two.jpg",
    "/banner_four.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="
    relative
    min-h-[25vh]        /* ✅ better for small phones */
    sm:min-h-[65vh]
    md:min-h-[55vh]
    lg:min-h-[85vh]
    flex items-center justify-center
    overflow-hidden
    pt-4 sm:pt-6 md:pt-10
  "
    >
      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              opacity: i === currentIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Mobile-friendly overlay */}
      <div className="absolute inset-0"></div>

      {/* REMOVE heavy accents on mobile */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-300 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-16 left-10 w-20 h-20 bg-yellow-300 opacity-25 rounded-full blur-3xl"></div>
      </div>

      {/* Slide indicators – mobile safe spacing */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex
              ? "bg-white scale-110"
              : "bg-white/50"
              }`}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-20 w-full max-w-4xl px-4 sm:px-6 text-center">
        {/* Hero text / CTA goes here */}
      </div>
    </section>

  );
}
