import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const apiBase = apiUrl.replace(/\/api(\/index\.php)?\/?$/, '');
      const apiOrigin = (() => {
        try { return new URL(apiUrl).origin; } catch { return window.location.origin; }
      })();
      const makeFullUrl = (imgPath) => {
        if (!imgPath) return "";
        if (/^https?:\/\//i.test(imgPath)) return imgPath;
        if (imgPath.startsWith("/")) return apiOrigin.replace(/\/$/, "") + imgPath;
        return apiBase.replace(/\/$/, "") + "/" + imgPath.replace(/^\//, "");
      };
      const response = await fetch(`${apiUrl}/gallery`);
      const data = await response.json();

      console.log("Gallery API Response:", data); // Debug log

      const fullPaths = data.map((img) => {
        const fullUrl = makeFullUrl(img.image_url);
        console.log("Image URL:", fullUrl); // Debug log
        return fullUrl;
      });
      
      setImages(fullPaths);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <div className="min-h-screen bg-white text-sm sm:text-base md:text-lg">
      <Navigation />

      {/* Hero Section - Matching CareerPage */}
      <section className="relative min-h-[18vh] sm:min-h-[22vh] md:min-h-[28vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/attached_assets/asset/breadcrum.png)`,
            filter: "brightness(1.05) contrast(1.05) saturate(1.05)",
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(30, 27, 75, 0.10), rgba(255,255,255,0.10) 80%, transparent 100%)",
          }}
        />
        {/* Title */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg py-6">
            Our Gallery
          </h1>
          <nav className="mt-2 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm sm:text-lg md:text-xl text-gray-500 font-medium bg-white/60 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
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
              <li className="text-purple-700 font-bold">Gallery</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Page Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-12 pb-20">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Moments That Matter
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Explore the wonderful moments captured at Little Learningss
          </p>
        </div>

        {/* Gallery Grid - Free on Page */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            <p className="text-lg font-semibold">{error}</p>
            <button
              onClick={fetchGalleryImages}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {images.map((src, idx) => {
              // Rotation classes like Gallery.jsx
              const rotations = [
                "-rotate-2",
                "rotate-2",
                "-rotate-1",
                "rotate-1",
                "-rotate-3",
                "rotate-3",
              ];
              const rotation = rotations[idx % rotations.length];

              return (
                <div
                  key={idx}
                  className={`
                    group relative p-4 bg-white shadow-lg rounded-3xl 
                    hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 cursor-pointer
                    ${rotation}
                  `}
                >
                  {/* Cute Sticker Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-300 rounded-full shadow-md border-2 border-white z-10"></div>

                  {/* Image Container */}
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={src}
                      alt={`Gallery image ${idx + 1}`}
                      className="w-full h-64 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Decorative tape */}
                  <div className="absolute bottom-2 right-4 w-16 h-4 bg-blue-300/70 rotate-6 rounded-sm"></div>
                  <div className="absolute top-4 left-2 w-14 h-4 bg-pink-300/70 -rotate-6 rounded-sm"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No images available yet.</p>
            <p className="text-sm mt-2">Check back soon for updates!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
