import React from 'react'
import heroImage from "../../../attached_assets/generated_images/hero_classroom_learning_scene.png";

const WhyChooseUsPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[18vh] sm:min-h-[22vh] md:min-h-[28vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.10), rgba(255,255,255,0.10)), url(${heroImage})`,
            filter: "brightness(1.18) contrast(1.10) saturate(1.15)",
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(30, 27, 75, 0.55), rgba(255,255,255,0.20) 80%, transparent 100%)"
          }}
        />
        {/* Decorative blurred shapes (mobile only) */}
        <div className="md:hidden absolute inset-0 pointer-events-none z-10">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-300 opacity-30 rounded-full filter blur-2xl translate-x-4"></div>
          <div className="absolute top-14 left-4 w-16 h-16 bg-yellow-300 opacity-25 rounded-full filter blur-2xl"></div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-300 opacity-20 rounded-full filter blur-3xl"></div>
        </div>
        {/* Title and Breadcrumb */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg py-8">
            Why Choose Us
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
              <li className="text-purple-700 font-bold">Why Choose Us</li>
            </ol>
          </nav>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-12 md:pt-16 pb-20 relative">
        {/* Breadcrumb - right aligned and larger */}
        {/* Removed duplicate breadcrumb for consistency */}
        <div>
          why choose us page
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUsPage
