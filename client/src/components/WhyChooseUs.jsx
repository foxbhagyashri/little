import { Card } from "@/components/ui/card";

export default function WhyChooseUs() {
  const features = [
    {
      title: "International Curriculum",
      description: "International curriculum blended with Indian culture, heritage & values",
      gradient: "from-pink-400 to-red-400",
    },
    {
      title: "NEP-Aligned Learning",
      description: "NEP-aligned learning for holistic development",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      title: "Seamless Transition",
      description: "Tie-ups with reputed primary schools for seamless transition",
      gradient: "from-blue-400 to-purple-400",
    },
    {
      title: "Wellness & Fun",
      description: "Daily yoga, exercises, mindful practices & fun activities",
      gradient: "from-green-400 to-lime-400",
    },
    {
      title: "Creative Environment",
      description: "Art, creativity and celebration-filled learning environment",
      gradient: "from-fuchsia-400 to-pink-400",
    },
    {
      title: "Safe & Nurturing",
      description: "Safe, nurturing and child-centered preschool space",
      gradient: "from-cyan-400 to-blue-400",
    },
  ];

  return (
    <section
      id="why"
      className="relative py-20 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Why{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Choose Us?
            </span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="
                p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all
                hover:scale-[1.05] duration-300 text-center
                border-4 border-blue-400
              "
            >
              <div
                className={`
                  w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center 
                  text-white shadow-md bg-gradient-to-br ${feature.gradient}
                `}
              >
                {/* Optionally, add an icon here if desired */}
                <span className="text-2xl font-bold">{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-serif leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
