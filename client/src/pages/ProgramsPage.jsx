import React from "react";
import Navigation from "@/components/Navigation";
import { Baby, BookOpen, School, GraduationCap, Sun, Music } from "lucide-react";
import { Link } from "react-router-dom";

const ProgramsPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const programs = [
    {
      title: "Playgroup (2+ Years)",
      icon: <Baby size={40} className="text-pink-500" />,
      points: [
        "Sensory play & motor skills",
        "Social development through guided play",
        "Introduction to routines & independence",
      ],
    },
    {
      title: "Nursery (3+ Years)",
      icon: <BookOpen size={40} className="text-purple-500" />,
      points: [
        "Early literacy & numeracy",
        "Phonics, storytelling & creativity",
        "Hands-on exploration & concept learning",
      ],
    },
    {
      title: "Jr. KG (4+ Years)",
      icon: <School size={40} className="text-blue-500" />,
      points: [
        "Foundational language & math",
        "Cognitive development activities",
        "Communication & confidence building",
      ],
    },
    {
      title: "Sr. KG (5+ Years)",
      icon: <GraduationCap size={40} className="text-green-500" />,
      points: [
        "School readiness curriculum",
        "Reading, writing & problem-solving",
        "STEM concepts & leadership skills",
      ],
    },
    {
      title: "Day Care (1+ Year)",
      icon: <Sun size={40} className="text-yellow-500" />,
      points: [
        "Safe, caring & homely environment",
        "Rest time, play time & nutritious routines",
        "Homework support & evening enrichment",
      ],
    },
    {
      title: "After-School Activities",
      icon: <Music size={40} className="text-red-500" />,
      points: [
        "Dance & music for creativity",
        "Phonics & Reading Club",
        "Sanskar Warg & tuition support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[18vh] sm:min-h-[22vh] md:min-h-[28vh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/attached_assets/asset/breadcrum.png)`,
            filter: "brightness(1.05) contrast(1.05) saturate(1.05)",
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(30, 27, 75, 0.10), rgba(255,255,255,0.10) 80%, transparent 100%)",
          }}
        />
        <div className="relative z-20 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg py-8">
            Our Programs
          </h1>
          <nav className="mt-2 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-lg md:text-xl text-gray-500 font-medium bg-white/60 rounded-full px-4 py-1 shadow-sm backdrop-blur-sm">
              <li>
                <a
                  href="/"
                  className="hover:underline text-pink-600 font-semibold"
                >
                  Home
                </a>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li className="text-purple-700 font-bold">Programs</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Page Container */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-8 md:pt-2 pb-20">
        {/* Program Cards */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl 
                border-[3px] border-purple-200 transition-transform hover:scale-105
                hover:bg-gradient-to-br hover:from-pink-100 hover:to-purple-100
                relative
                before:content-[''] before:absolute before:inset-0 before:rounded-3xl
                before:bg-gradient-to-r before:from-pink-400 before:via-purple-400 before:to-blue-400
                before:opacity-20 before:-z-10"
              style={{ zIndex: 1, overflow: "hidden" }}
            >
              <div className="mb-4 flex justify-center">{program.icon}</div>

              <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-4">
                {program.title}
              </h3>

              <ul className="space-y-2 text-gray-700 text-left">
                {program.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-pink-500 mr-2 mt-1">•</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Not Sure Which Program is Right for Your Child?
          </h2>
          <p className="text-gray-700 mt-2">
            Talk to our educators and find the perfect learning path.
          </p>

          <Link
            to="/contact"
            className="inline-block mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-2xl text-lg shadow-lg hover:opacity-90 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
