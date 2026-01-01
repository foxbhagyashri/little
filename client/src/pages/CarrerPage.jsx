import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";

const CareerPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Basic form state and resume upload
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    location: "",
    education: "",
    cover: "",
    branch: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localToast, setLocalToast] = useState({ visible: false, message: "", type: "info" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setResumeFile(null);
      setResumeError("");
      return;
    }
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setResumeError("Only PDF / DOC / DOCX are allowed.");
      setResumeFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File too large. Max 5MB.");
      setResumeFile(null);
      return;
    }
    setResumeError("");
    setResumeFile(file);
  };

  const showToast = (type, message) => {
    setLocalToast({ visible: true, message, type });
    setTimeout(() => setLocalToast((t) => ({ ...t, visible: false })), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (resumeFile) fd.append("resume", resumeFile);

      // Change this for production
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/send-career-application`, {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      showToast("success", "Your application has been submitted successfully!");
      
      // Reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        location: "",
        education: "",
        cover: "",
        branch: "",
      });
      setResumeFile(null);
      // Reset file input
      const fileInput = document.getElementById('resumeInput');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      showToast("error", "Submission failed. Please try again!");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-sm sm:text-base md:text-lg">
      <Navigation />

      {/* Simple fallback toast */}
      {localToast.visible && (
        <div
          aria-live="polite"
          className="fixed top-6 right-6 z-50"
        >
          <div
            className={`px-4 py-2 rounded shadow-lg text-white ${
              localToast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {localToast.message}
          </div>
        </div>
      )}

      {/* Hero Section */}
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
            Careers at Little Learningss
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
              <li className="text-purple-700 font-bold">Careers</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Page Container */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pt-12 pb-20">
        {/* Simple Form Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Apply to Join Our Team
          </h2>
          <p className="text-sm text-gray-500">
            Fill the form below and attach your resume.
          </p>
        </div>

        {/* Application Form (kept simple) */}
        <div className="bg-white/90 backdrop-blur-lg p-4 sm:p-6 md:p-10 rounded-3xl shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Apply Now
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              <p className="text-sm text-gray-500">
                Provide the basic details so we can reach you.
              </p>
            </div>

            {/* Inputs: ensure full width on mobile */}
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl border border-gray-300"
              placeholder="Full Name"
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={handleInputChange}
              type="email"
              className="w-full p-3 rounded-xl border border-gray-300"
              placeholder="Email"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl border border-gray-300"
              placeholder="Phone Number"
            />
            <input
              name="position"
              value={form.position}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl border border-gray-300"
              placeholder="Position Applying For"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl border border-gray-300"
              placeholder="Location (City)"
            />
            <input
              name="education"
              value={form.education}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl border border-gray-300"
              placeholder="Highest Education"
            />
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Select Branch</label>
              <select
                name="branch"
                required
                value={form.branch}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
              >
                <option value="">Choose a branch</option>
                <option value="kothrud">Kothrud</option>
                <option value="warje">Warje</option>
              </select>
            </div>

            {/* Resume Upload (stack on mobile) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF / DOC / DOCX, max 5MB)
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <input
                  id="resumeInput"
                  type="file"
                  accept=".pdf,.doc,.docx,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="w-full sm:w-auto file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-100 file:text-pink-700"
                />
                <div className="text-sm text-gray-600">
                  {resumeFile ? (
                    <div>
                      <div className="font-medium break-words">{resumeFile.name}</div>
                      <div className="text-xs text-gray-500">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400">No file selected</div>
                  )}
                </div>
              </div>
              {resumeError && (
                <div className="text-red-500 text-sm mt-2">{resumeError}</div>
              )}
            </div>

            <textarea
              name="cover"
              value={form.cover}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl border border-gray-300 md:col-span-2"
              rows="4"
              placeholder="Tell us about yourself / Cover letter (optional)"
            />

            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
