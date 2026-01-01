import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function FloatingContactButtons() {
  const whatsappNumber = "919975518504";
  const callNumber = "+919975518504";

  return (
    <>
      {/* Bottom-left social buttons */}
      <div className="fixed bottom-5 left-6 flex flex-col gap-3 z-50">
        <a
          href="https://www.facebook.com/littlelearningss"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-blue-600 shadow-xl flex items-center justify-center hover:scale-110 transition"
          aria-label="Facebook"
        >
          <FaFacebookF className="text-white text-2xl" />
        </a>

        <a
          href="https://www.instagram.com/littlelearningss"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-600 shadow-xl flex items-center justify-center hover:scale-110 transition"
          aria-label="Instagram"
        >
          <FaInstagram className="text-white text-2xl" />
        </a>
      </div>

      {/* Bottom-right contact buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-green-500 shadow-xl flex items-center justify-center hover:scale-110 transition"
        >
          <FaWhatsapp className="text-white text-3xl" />
        </a>

        <a
          href={`tel:${callNumber}`}
          className="w-12 h-12 rounded-full bg-blue-600 shadow-xl flex items-center justify-center hover:scale-110 transition"
        >
          <FaPhoneAlt className="text-white text-2xl" />
        </a>
      </div>
    </>
  );
}
