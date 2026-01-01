import React, { useState } from "react";
import { useLocation } from "wouter";

const AdminGalleryUpload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [, setLocation] = useLocation();

  const apiUrl =
    import.meta.env.VITE_API_URL || `${window.location.origin}/php-backend/api`;

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("adminAuthenticated");
    setLocation("/admin/login");
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // UPLOAD
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
      } else {
        setMessage("Upload failed. Try again.");
      }
    } catch (err) {
      setMessage("Server error while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">
          Gallery Management
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* UPLOAD CARD */}
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
          Upload Gallery Image
        </h2>

        {message && (
          <p
            className={`text-center font-bold mb-4 ${
              message.includes("success") ? "text-green-600" : "text-red-500"
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
            className="w-full py-3 bg-purple-600 text-white rounded-xl text-lg font-bold hover:bg-purple-700"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminGalleryUpload;
