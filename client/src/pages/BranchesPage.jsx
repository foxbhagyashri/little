import React from "react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const BranchesPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const branches = [
    {
      name: "Warje",
      address: 'Sr. No. 138/2A/2/3 "Kalpataru" Near Awale Petrol Pump, NDA Road, Warje, Pune - 411058',
      phone: "+91 84463 90854",
      email: "warje@Littlelearningss.com",
      timing: "8.30AM to 7.30PM",
      map: "https://maps.app.goo.gl/kUrXEi1rWErfZqzU6?g_st=aw",
    },
    {
      name: "Kothrud",
      address: "Aviraj Hostel, Near, No. 133/26,27, Ishan Building Prabha CHS, DP Rd, Mayur Colony, Kothrud, Pune, Maharashtra 411038",
      phone: "+91 99755 18504",
      email: "kothrud@Littlelearningss.com",
      timing: "8.30AM to 7.30PM",
      map: "https://share.google/KhBzaPMBm2kBHuhCD",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(30, 27, 75, 0.10), rgba(255,255,255,0.10) 80%, transparent 100%)"
          }}
        />
        {/* Decorative blurred shapes (mobile only) */}
        {/* Removed blurred shapes for a cleaner, brighter look */}
        {/* Title and Breadcrumb */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg py-8">
            Our Branches
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
              <li className="text-purple-700 font-bold">Branches</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Decorative Shapes */}
      {/* Removed decorative shapes for a clean white background */}

      {/* Page Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-8 md:pt-12 pb-20">
        {/* Branch Cards  */}
        <div className="mt-0 flex flex-wrap justify-center gap-6 md:gap-8">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl md:rounded-3xl border-2 border-gray-100 p-4 md:p-6 hover:scale-105 transition-transform
                hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50
                relative
                before:content-[''] before:absolute before:inset-0 before:rounded-2xl md:before:rounded-3xl
                before:bg-gradient-to-r before:from-pink-200 before:via-purple-200 before:to-blue-200
                before:opacity-10 before:-z-10
                "
              style={{ zIndex: 1, overflow: "hidden" }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-3">
                {branch.name}
              </h3>

              <p className="text-gray-700 mb-2">
                <strong>📍 Address:</strong> <br />
                {branch.address}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>📞 Call:</strong> <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="text-pink-600 hover:underline">{branch.phone}</a>
              </p>

              <p className="text-gray-700 mb-2">
                <strong>✉ Email:</strong> <a href={`mailto:${branch.email}`} className="text-pink-600 hover:underline">{branch.email}</a>
              </p>

              <p className="text-gray-700 mb-4">
                <strong>⏰ Timings:</strong> {branch.timing}
              </p>

              <a
                href={branch.map}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition"
              >
                View on Map
              </a>
            </div>
          ))}
        </div>

        {/* Add New Branch CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Want Little Learningss in Your City?
          </h2>
          <p className="text-gray-700 mt-2">
            We’re expanding! Partner with us to bring quality early education to more children.
          </p>

          { /* changed: use Link from react-router-dom for client-side navigation */}
          <Link
            to="/franchise"
            className="inline-block mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-2xl text-lg shadow-lg hover:opacity-90 transition"
          >
            Explore Franchise Opportunities
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
