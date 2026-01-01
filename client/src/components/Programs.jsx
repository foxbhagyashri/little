import { Plus } from "lucide-react";

export default function Programs() {
  const programs = [
    {
      title: "Playgroup",
      age: "2 years completed",
      image: "/Artboard 7 copy.png",
      description: (
        <ul className="text-left list-disc list-inside space-y-1">
          <li>Sensory play & motor skills</li>
          <li>Social development through guided play</li>
          <li>Introduction to routines & independence</li>
        </ul>
      ),
      border: "border-[#FFB347]",
    },
    {
      title: "Nursery",
      age: "3 years completed",
      image: "/Artboard 2 copy.png",
      description: (
        <ul className="text-left list-disc list-inside space-y-1">
          <li>Early literacy & numeracy</li>
          <li>Phonics, storytelling & creative activities</li>
          <li>Hands-on exploration & concept learning</li>
        </ul>
      ),
      border: "border-[#A3D977]",
    },
    {
      title: "Jr. KG",
      age: "4 years completed",
      image: "/Artboard 6.png",
      description: (
        <ul className="text-left list-disc list-inside space-y-1">
          <li>Foundational language & math</li>
          <li>Cognitive development through experiential learning</li>
          <li>Communication & confidence-building activities</li>
        </ul>
      ),
      border: "border-[#4DA3FF]",
    },
    {
      title: "Sr. KG",
      age: "5 years completed",
      image: "/Artboard 6 copy.png",
      description: (
        <ul className="text-left list-disc list-inside space-y-1">
          <li>School readiness with NEP-aligned curriculum</li>
          <li>Writing, reading, problem-solving & STEM concepts</li>
          <li>Personality development & leadership skills</li>
        </ul>
      ),
      border: "border-[#F2C94C]",
    },
    {
      title: "Day Care",
      age: "1 Year onwards",
      image: "/Artboard 2.png",
      description: (
        <ul className="text-left list-disc list-inside space-y-1">
          <li>Safe, caring, homely environment</li>
          <li>Engaging activities, rest time & nutritious routines</li>
          <li>Homework support & evening enrichment activities</li>
        </ul>
      ),
      border: "border-[#FF70A6]",
    },
    {
      title: "After-School Activities",
      age: "",
      image: "/Artboard 5.png",
      description: (
        <ul className="text-left list-disc list-inside space-y-1">
          <li>Dance & Music – creativity, rhythm & expression</li>
          <li>Phonics & Reading Club – vocabulary & reading fluency</li>
          <li>Sanskar Warg – value education, moral stories & cultural grounding</li>
          <li>Tuition Classes – homework support & academic improvement</li>
        </ul>
      ),
      border: "border-[#8E44AD]",
    },
  ];

  return (
    <section id="programs" className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-center text-5xl font-extrabold text-gray-800 mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Programs
          </span>
        </h2>

        <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 font-serif mb-14">
          Thoughtfully crafted learning journeys that spark curiosity, joy, and
          strong development.
        </p>

        {/* GRID LAYOUT (3 ON TOP, 2 BELOW) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {programs.map((p, i) => (
            <div
              key={i}
              className={`
                w-full max-w-xs h-[600px] flex flex-col bg-white shadow-2xl rounded-3xl border-[5px] ${p.border}
                p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-3xl
              `}
              style={{ minHeight: 480 }}
            >
              <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
              {p.age && <p className="text-sm text-gray-500">{p.age}</p>}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-auto object-cover rounded-xl mt-3 shadow"
              />
              <div className="text-gray-700 text-sm mt-3 font-serif flex-1">
                {p.description}
              </div>
              <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mt-3 border border-gray-300">
                <Plus className="text-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
