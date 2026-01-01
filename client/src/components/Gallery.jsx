import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch gallery images from database
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/gallery`);
        const data = await response.json();

        console.log("Gallery API response:", data); 
        const rotations = [
          "-rotate-2",
          "rotate-2",
          "-rotate-1",
          "rotate-1",
          "-rotate-3",
          "rotate-3",
        ];

        // limit results to first 6 images
        const limitedData = (Array.isArray(data) ? data : []).slice(0, 6);

        const mappedPhotos = limitedData.map((img, index) => {
          const fullUrl = makeFullUrl(img.image_url);
          console.log("Image URL:", fullUrl); // Debug log

          return {
            id: img.id,
            src: fullUrl,
            title: img.title,
            rotation: rotations[index % rotations.length],
          };
        });

        setPhotos(mappedPhotos);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <section
      id="gallery"
      className="relative py-20 bg-gradient-to-b from-pink-50 via-yellow-50 to-blue-50 overflow-hidden"
    >
      {/* Floating Shapes */}
      <div className="absolute top-16 left-20 w-36 h-36 bg-yellow-300/40 blur-3xl rounded-full animate-float"></div>
      <div className="absolute bottom-16 right-20 w-40 h-40 bg-pink-300/40 blur-3xl rounded-full animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-serif max-w-2xl mx-auto">
            A glimpse into the colorful, joyful world of our little learners
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center text-gray-600">Loading gallery...</div>
        ) : photos.length === 0 ? (
          <div className="text-center text-gray-600">
            No images yet. Upload some photos!
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {photos.map((photo) => (
              <Card
                key={photo.id}
                className={`
                  p-4 bg-white shadow-lg rounded-3xl 
                  hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 cursor-pointer
                  relative ${photo.rotation}
                `}
              >
                {/* Cute Sticker Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-300 rounded-full shadow-md border-2 border-white z-10"></div>

                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-64 object-cover rounded-2xl"
                    onError={(e) => {
                      console.error("Image failed to load:", photo.src);
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                </div>

                {/* Decorative tape */}
                <div className="absolute bottom-2 right-4 w-16 h-4 bg-blue-300/70 rotate-6 rounded-sm"></div>
                <div className="absolute top-4 left-2 w-14 h-4 bg-pink-300/70 -rotate-6 rounded-sm"></div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
