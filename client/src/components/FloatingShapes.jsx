import { Star, Heart, Cloud, PartyPopper, Sparkles, Circle } from "lucide-react";

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ⭐ Super Bright Stars */}
      <Star className="absolute top-24 left-10 shape-xl text-yellow-400 drop-shadow-2xl animate-float" />
      <Star className="absolute top-56 right-16 shape-lg text-yellow-500 drop-shadow-xl animate-float-delayed" />
      <Sparkles className="absolute top-40 left-1/4 shape-xl text-orange-400 animate-bright-spin opacity-90" />

      {/* ☁️ Puffy-looking Clouds */}
      <Cloud className="absolute top-10 right-10 shape-xxl text-white animate-cloud opacity-90 drop-shadow-lg" />
      <Cloud className="absolute bottom-24 left-10 shape-xl text-white animate-cloud-delayed opacity-75 drop-shadow-md" />

      {/* 🎉 Party Poppers */}
      <PartyPopper className="absolute bottom-36 left-1/3 shape-lg text-pink-500 animate-bounce-slow drop-shadow-xl" />
      <PartyPopper className="absolute top-20 right-1/4 shape-lg text-purple-500 animate-bounce-slower drop-shadow-xl" />

      {/* ❤️ Cute Bright Hearts */}
      <Heart className="absolute bottom-20 right-40 shape-xl text-red-500 animate-float drop-shadow-lg" />
      <Heart className="absolute top-[65%] left-[15%] shape-lg text-pink-600 animate-float-delayed drop-shadow-md" />
    </div>
  );
}
