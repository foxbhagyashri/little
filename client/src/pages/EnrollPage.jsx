import React from "react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const EnrollPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    program: "",
    message: "",
    branch: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          program: form.program,
          message: form.message,
          branch: form.branch,
          formType: "Enrollment",
        }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      alert("Enrollment submitted successfully!");
      setForm({ name: "", phone: "", email: "", program: "", message: "", branch: "" });
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[20vh] sm:min-h-[25vh] md:min-h-[30vh] flex flex-col items-center justify-center overflow-hidden">
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
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(30, 27, 75, 0.10), rgba(255,255,255,0.10) 80%, transparent 100%)",
          }}
        />

        {/* Title and Breadcrumb */}
        <div className="relative z-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg py-8">
            Enroll Your Child
          </h1>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-lg md:text-xl text-gray-500 font-medium bg-white/60 px-4 py-1 rounded-full shadow-sm backdrop-blur-sm">
              <li>
                <a href="/" className="text-pink-600 font-semibold hover:underline">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-purple-700 font-bold">Enroll</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Page Container */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pt-12 md:pt-16 pb-20">
        {/* Intro Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Begin Your Child’s Learning Journey With Us
          </h2>
          <p className="text-gray-700 mt-4">
            Little Learningss provides a warm, nurturing, value-driven environment where children develop confidence, curiosity and lifelong learning habits.
            Fill out the enrollment form to begin the admission process.
          </p>
        </div>

        {/* Enrollment Form */}
        <div
          className="mt-14 bg-white/90 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-xl border border-transparent relative max-w-2xl mx-auto
            before:content-[''] before:absolute before:inset-0 before:rounded-3xl
            before:bg-gradient-to-r before:from-pink-400 before:via-purple-400 before:to-blue-400 before:opacity-15 before:-z-10"
          style={{ zIndex: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enrollment Form
          </h2>

          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Enter child's name"
              />
            </div>
            {/* Phone */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Phone Number</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            {/* Email */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Enter your email"
              />
            </div>
            {/* Program */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Select Program</label>
              <select
                required
                value={form.program}
                onChange={(e) => setForm({ ...form, program: e.target.value })}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
              >
                <option value="">Choose a program</option>
                <option>Playgroup (2+ Years)</option>
                <option>Nursery (3+ Years)</option>
                <option>Jr. KG (4+ Years)</option>
                <option>Sr. KG (5+ Years)</option>
                <option>Day Care (1+ Years)</option>
                <option>After-School Activities</option>
              </select>
            </div>
            {/* Branch */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Select Branch</label>
              <select
                required
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
              >
                <option value="">Choose a branch</option>
                <option value="kothrud">Kothrud</option>
                <option value="warje">Warje</option>
              </select>
            </div>
            {/* Message */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Message</label>
              <textarea
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Tell us anything we should know..."
              ></textarea>
            </div>
            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Need Help With the Admission Process?
          </h2>
          <p className="text-gray-700 mt-2">
            Our counselors are here to guide you every step of the way.
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

export default EnrollPage;
