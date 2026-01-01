import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

const AdminGalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [, setLocation] = useLocation();

  const apiUrl =
    import.meta.env.VITE_API_URL || `${window.location.origin}/php-backend/api`;

  const apiBase = apiUrl.replace(/\/api(\/index\.php)?\/?$/, "");
  const apiOrigin = (() => {
    try {
      return new URL(apiUrl).origin;
    } catch {
      return window.location.origin;
    }
  })();

  const makeFullUrl = (imgPath) => {
    if (!imgPath) return "";
    if (/^https?:\/\//i.test(imgPath)) return imgPath;
    if (imgPath.startsWith("/")) return apiOrigin.replace(/\/$/, "") + imgPath;
    return apiBase.replace(/\/$/, "") + "/" + imgPath.replace(/^\//, "");
  };

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuthenticated");
    if (!isAuth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  /* ================= FETCH GALLERY ================= */
  const fetchImages = async () => {
    try {
      const response = await fetch(`${apiUrl}/gallery`);
      const data = await response.json();
      setImages(data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= FILE CHANGE ================= */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  /* ================= UPLOAD ================= */
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      setMessage("Please enter title and select an image.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/gallery/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Image uploaded successfully!");
        setTitle("");
        setFile(null);
        setPreview(null);
        fetchImages();
      } else {
        setMessage("Upload failed.");
      }
    } catch (err) {
      setMessage("Server error while uploading.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`${apiUrl}/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Image deleted successfully!");
        fetchImages();
      } else {
        setMessage("Delete failed.");
      }
    } catch (err) {
      setMessage("Error deleting image.");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600">
            Gallery Management
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* UPLOAD FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-600">
            Upload New Image
          </h2>

          {message && (
            <p
              className={`text-center font-bold mb-4 ${
                message.includes("success")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="font-semibold">Image Title</label>
              <input
                type="text"
                value={title}
                className="w-full p-3 border rounded-xl"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold">Select Image</label>
              <input
                type="file"
                className="w-full p-3 border rounded-xl"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl shadow"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white rounded-xl text-lg font-bold hover:bg-purple-700 disabled:bg-gray-400"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>

        {/* GALLERY GRID */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-purple-600">
            All Gallery Images ({images.length})
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={makeFullUrl(img.image_url)}
                  alt={img.title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />

                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-2 font-semibold text-gray-700">
                  {img.title}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminGalleryManagement;
