import React from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";



function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
}

function Philosophy() {
  return (
    <div className="mt-0 flex flex-wrap justify-center gap-6 md:gap-8">
    <Card className="p-6 md:p-8 bg-gradient-to-br from-yellow-50 to-pink-50 mb-8 shadow-lg">
      <h3 className="text-2xl font-bold text-pink-700 mb-2 font-serif">
        Our Philosophy
      </h3>
      <p className="text-gray-700 leading-relaxed font-serif">
        At{" "}
        <span className="font-bold text-pink-600">Little Learningss</span>, we
        believe childhood is a time to wonder, explore and shine. Our preschool
        blends the best of international early-years learning with the richness
        of Indian culture, values and traditions, creating an environment where
        children grow into confident, kind and curious individuals.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4 font-serif">
        Every day at Little Learningss is thoughtfully designed to nurture the
        mind, heart and character of each child. Through play-based learning,
        hands-on activities and joyful celebrations, we help children discover
        their abilities while staying deeply connected to their roots.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4 font-serif">
        With trained, loving educators and a warm, safe environment, Little
        Learningss feels like a second home — where children are encouraged to
        try, enjoy, learn and grow at their own pace.
      </p>
      <p className="text-pink-700 font-semibold mt-4 font-serif">
        At Little Learningss, we don’t just prepare children for school…
        <br />
        <span className="text-xl">We prepare them for life.</span>
      </p>
    </Card>
    </div>
  );
}

function Curriculum() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow">
        <h4 className="text-xl font-semibold text-purple-700 mb-2">
          Our International Curriculum Focuses On:
        </h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Holistic development — physical, emotional, social and cognitive</li>
          <li>Critical thinking &amp; creativity</li>
          <li>Communication &amp; early literacy skills</li>
          <li>STEAM-based exploration</li>
          <li>Global awareness with Indian grounding</li>
        </ul>
      </Card>
      <Card className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 shadow">
        <h4 className="text-xl font-semibold text-green-700 mb-2">
          We Proudly Introduce Children To:
        </h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Indian festivals, stories and music</li>
          <li>Respect, empathy and gratitude</li>
          <li>Family and cultural values</li>
          <li>Yogic practices, mindfulness &amp; healthy habits</li>
        </ul>
      </Card>
    </div>
  );
}

function VisionMission() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-4">
      <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-start gap-3">
          <div className="text-2xl"><img src="/Cuba Vision.png"></img></div>
          <div>
            {/* <div className="font-semibold text-gray-800">Vision</div> */}
            <div className="text-gray-600 mt-1">
              To shape children who think independently, embrace their heritage
              and are ready for the world ahead. We envision Little Learningss as
              a warm, inspiring space where lifelong learning begins.
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-r from-yellow-50 to-green-50">
        <div className="flex items-start gap-3">
          <div className="text-2xl"><img src="/Cuba Mission.png"></img></div>
          <div>
            {/* <div className="font-semibold text-gray-800">Mission</div> */}
            <div className="text-gray-600 mt-1">
              To nurture confident, curious and compassionate young learners
              through a global curriculum enriched with Indian culture and values.
              We aim to make learning joyful, holistic and rooted in strong
              character-building.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

const AboutPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-white text-base md:text-lg">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[18vh] sm:min-h-[22vh] md:min-h-[28vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/attached_assets/asset/breadcrum.png)`,
            filter: "brightness(1.05) contrast(1.05) saturate(1.05)",
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        />
        {/* Overlay for better text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(30, 27, 75, 0.10), rgba(255,255,255,0.10) 80%, transparent 100%)",
          }}
        />
        {/* Title and Breadcrumb */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg py-8">
            About Little Learningss
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
              <li className="text-purple-700 font-bold">About</li>
            </ol>
          </nav>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-8 md:pt-12 pb-20 relative">
        {/* Decorative Shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl"></div>
        <div className="absolute top-20 -right-10 w-52 h-52 bg-purple-300/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>

        {/* Philosophy Section - moved up */}
        <Philosophy />

        {/* Curriculum & Indian Values Section */}
        <Curriculum />

        {/* Vision & Mission Section */}
        <div className="mt-12">
          <SectionHeader
            title="Vision & Mission"
            subtitle="Our guiding light and purpose"
          />
          <VisionMission />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
