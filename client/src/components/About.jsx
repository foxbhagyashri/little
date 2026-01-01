import { Card } from "@/components/ui/card";
import { Users, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-12 md:py-20 bg-white overflow-hidden">
      <svg className="absolute top-0 left-0 right-0 w-full h-20 text-white" viewBox="0 0 1440 320" fill="currentColor">
        <path d="M0,224L48,192C96,160,192,96,288,96C384,96,480,160,576,170.7C672,181,768,139,864,138.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128V0H0Z"></path>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top grid: Image + Intro */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative">
            <img
              src="/aboutt.jpeg"
              alt="Teacher reading with children"
              className="relative rounded-[1.25rem] md:rounded-[2rem] shadow-xl border-4 border-white w-full"
            />
          </div>
          <div>
            <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Little Learningss</span>
            </h2>
            <p className="text-lg text-gray-700 mb-4 font-serif leading-relaxed">
              Where every child is encouraged to <span className="text-pink-600 font-semibold">wonder, explore and shine</span>.
            </p>
            <p className="text-lg text-gray-700 mb-4 font-serif leading-relaxed">
              We blend international early-years learning with the richness of Indian culture, values and traditions, nurturing confident, kind and curious individuals.
            </p>
            <p className="text-lg text-gray-700 mb-4 font-serif leading-relaxed">
              Our loving educators and joyful environment make every day an adventure in learning and growing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
