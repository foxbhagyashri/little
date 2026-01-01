import { useEffect, useState } from "react";

export default function WelcomePage({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Even faster auto redirect (0.9s)
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete(), 250);
    }, 500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => onComplete(), 250);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        fixed inset-0 z-50 
        flex items-center justify-center
        bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100
        cursor-pointer
        transition-opacity duration-250
        ${fadeOut ? "opacity-0" : "opacity-100"}
        animate-fade-in
      `}
      style={{
        background:
          "linear-gradient(120deg, #f3e8ff 0%, #ffe4fa 50%, #e0f2fe 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Animated Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, #fbc2eb55 0%, transparent 70%), radial-gradient(circle at 20% 80%, #a6c1ee44 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center animate-fade-in transition-all duration-300">
        {/* Heading wrapped in its own div (reduced bottom margin) */}


        {/* Logo wrapped in its own div (reduced gap and lifted slightly) */}

        <div className="mt-0  animate-float" >
          {/* <div className="mb-1 animate-slide-down">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mt-5">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              Welcome to
            </span>
          </h1>
        </div> */}
          <img
            src="/Artboard 7.png"
            alt="Little Learnings Logo"
            className="w-80 h-80 md:w-[30rem]  object-contain drop-shadow-2xl"
            loading="eager"
          />
        </div>

        {/* Sparkle Effect in its own wrapper (moved up, tightened spacing) */}
        <div className="relative mb-0 pointer-events-none">

          <span className="text-3xl animate-bounce">✨</span>
        </div>

        {/* Subtitle in its own div (reduced spacing) */}
        <div className="mb-1 animate-slide-up">
          <p className="mt-1 text-xl md:text-2xl font-serif text-gray-700 drop-shadow-sm">
            Where Little Minds{" "}
            <span className="font-bold text-pink-500">Grow Big Dreams</span>{" "}
            <span role="img" aria-label="rainbow">
              🌈
            </span>
          </p>
        </div>

        {/* Click hint in its own div (smaller top margin) */}
        <div className="mt-1">
          <p className="mt-1 text-xs text-gray-500 animate-pulse">
            Click anywhere to continue...
          </p>
        </div>
      </div>
    </div>
  );
}
