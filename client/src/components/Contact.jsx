import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Schema = {
  validate: (data) => {
    const errors = {};
    if (!data.name || data.name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid email address";
    if (!data.program) errors.program = "Program not selected";
    if (!data.phone || data.phone.length < 10) errors.phone = "Phone must be at least 10 digits";
    if (!data.message || data.message.length < 10) errors.message = "Message must be at least 10 characters";
    if (!data.branch) errors.branch = "Branch not selected";
    return { isValid: Object.keys(errors).length === 0, errors };
  }
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
    branch: "",
  });
  const [errors, setErrors] = useState({});
  const [localToast, setLocalToast] = useState({ visible: false, message: "", type: "info" });

  const showToast = (type, message) => {
    setLocalToast({ visible: true, message, type });
    setTimeout(() => setLocalToast((t) => ({ ...t, visible: false })), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const validation = Schema.validate(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "Contact" }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      showToast("success", "Message Sent! 🎉 Thank you for contacting us. We'll get back to you soon!");
      setForm({ name: "", email: "", phone: "", program: "", message: "", branch: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong. Please make sure the server is running and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Simple fallback toast */}
      {localToast.visible && (
        <div aria-live="polite" className="fixed top-6 right-6 z-50">
          <div
            className={`px-4 py-2 rounded shadow-lg text-white ${
              localToast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {localToast.message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
            Get In <span className="text-purple-600">Touch</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-serif max-w-2xl mx-auto">
            Have questions? We'd love to hear from you! Send us a message and we’ll reply quickly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto">

          {/* Contact Form */}
          <div
            className="bg-white/90 backdrop-blur-lg p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-transparent
            relative before:content-[''] before:absolute before:inset-0 before:rounded-2xl md:before:rounded-3xl
            before:bg-gradient-to-r before:from-pink-400 before:via-purple-400 before:to-blue-400 before:opacity-15 before:-z-10"
          >
            <Card className="bg-transparent">
              <CardContent className="p-0">
                <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">

                  <div>
                    <label className="text-gray-700 font-medium pb-5">Full Name</label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl min-h-[50px] bg-white border-gray-300 border shadow-sm focus:ring-2 focus:ring-pink-400"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium pb-5">Email</label>
                    <Input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-xl min-h-[50px] bg-white border-gray-300 border shadow-sm focus:ring-2 focus:ring-pink-400"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium pb-5">Phone Number</label>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-xl min-h-[50px] bg-white border-gray-300 border shadow-sm focus:ring-2 focus:ring-pink-400"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium pb-5">Select Program</label>
                    <select
                      name="program"
                      value={form.program}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400"
                    >
                      <option value="">Choose a program</option>
                      <option>Playgroup (2+ Years)</option>
                      <option>Nursery (3+ Years)</option>
                      <option>Jr. KG (4+ Years)</option>
                      <option>Sr. KG (5+ Years)</option>
                      <option>Day Care (1+ Years)</option>
                      <option>After-School Activities</option>
                    </select>
                    {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium pb-5">Select Branch</label>
                    <select
                      name="branch"
                      value={form.branch}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-400"
                    >
                      <option value="">Choose a branch</option>
                      <option value="kothrud">Kothrud</option>
                      <option value="warje">Warje</option>
                    </select>
                    {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium pb-5">Message</label>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white border-gray-300 border shadow-sm focus:ring-2 focus:ring-pink-400"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white min-h-[50px] py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4 w-full">

            {/* Warje */}
            <Card className="rounded-2xl shadow-lg bg-white hover:scale-[1.02] transition p-5">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-full bg-white">
                  <MapPin className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Warje</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Sr. No. 138/2A/2/3 "Kalpataru"<br />
                    Near Awale Petrol Pump, NDA Road,<br />
                    Warje, Pune - 411058
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="h-4 w-4 text-purple-700" />
                    <span className="text-gray-600 text-sm"><a href="tel:8446390854">+91 8446390854</a></span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-blue-700" />
                    <span className="text-gray-600 text-sm"><a href="mailto:warje@Littlelearningss.com">warje@Littlelearningss.com</a></span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Kothrud */}
            <Card className="rounded-2xl shadow-lg bg-white hover:scale-[1.02] transition p-5">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-full bg-white">
                  <MapPin className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Kothrud</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aviraj Hostel, Near, No. 133/26,27,<br />
                    Ishan Building Prabha CHS, DP Rd,<br />
                    Mayur Colony, Kothrud, Pune 411038
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="h-4 w-4 text-purple-700" />
                    <span className="text-gray-600 text-sm"><a href="tel:9975518504">+91 9975518504</a></span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-blue-700" />
                    <span className="text-gray-600 text-sm"><a href="mailto:kothrud@Littlelearningss.com">kothrud@Littlelearningss.com</a></span>
                  </div>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
