import Hero from "@/components/Hero";
import About from "../components/About.jsx";
import WhyChooseUs from "@/components/WhyChooseUs";
import Programs from "@/components/Programs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen p-0 m-0 top-0">
      <Hero />
      <About />
      <WhyChooseUs />
      <Programs />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
