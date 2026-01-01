import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Baby, School, MessageSquare, ShieldCheck } from "lucide-react";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="
        relative py-24 
        bg-gradient-to-b from-yellow-50 via-pink-50 to-blue-50
        overflow-hidden
      "
    >
      {/* Wavy Top Border */}
      <svg
        className="absolute top-0 left-0 w-full h-24 text-white"
        viewBox="0 0 1440 320"
        fill="currentColor"
      >
        <path d="M0,128L80,133.3C160,139,320,149,480,160C640,171,800,181,960,176C1120,171,1280,149,1360,138.7L1440,128L1440,0H0Z"></path>
      </svg>

      {/* Floating Blobs */}
      <div className="absolute top-12 right-20 w-44 h-44 bg-pink-300/40 blur-3xl rounded-full animate-float"></div>
      <div className="absolute bottom-12 left-20 w-40 h-40 bg-blue-300/40 blur-3xl rounded-full animate-float-delayed"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Frequently Asked Questions ❓
        </h2>

        <p className="text-gray-700 text-xl font-serif mb-14">
          Answers to help you understand how Little Learningss helps your child grow 🌈
        </p>

        {/* Accordion */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">

            {/* Q1 */}
            <AccordionItem
              value="q1"
              className="bg-white shadow rounded-2xl p-3 border border-purple-100"
            >
              <AccordionTrigger className="text-lg flex items-center gap-2 font-medium text-purple-700">
                <School className="w-5 h-5 text-pink-500" />
                What curriculum does Little Learningss follow?
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 text-left font-serif pl-8 pr-3 pt-1 text-sm">
                We follow an international early-years curriculum blended with
                Indian culture, heritage and values, fully aligned with the NEP.
                Our approach focuses on holistic development, creativity,
                language skills, and experiential learning.
              </AccordionContent>
            </AccordionItem>

            {/* Q2 */}
            <AccordionItem
              value="q2"
              className="bg-white shadow rounded-2xl p-3 border border-purple-100"
            >
              <AccordionTrigger className="text-lg flex items-center gap-2 font-medium text-purple-700">
                <Baby className="w-5 h-5 text-blue-500" />
                What age groups do you admit?
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 text-left font-serif pl-8 pr-3 pt-1 text-sm">
                We offer programs for children <strong>2 to 5 years</strong> (Playgroup to Sr. KG)
                along with <strong>Day Care for ages 1 + years</strong>.
                Admission is open throughout the year based on seat availability.
              </AccordionContent>
            </AccordionItem>

            {/* Q3 */}
            <AccordionItem
              value="q3"
              className="bg-white shadow rounded-2xl p-3 border border-purple-100"
            >
              <AccordionTrigger className="text-lg flex items-center gap-2 font-medium text-purple-700">
                <ShieldCheck className="w-5 h-5 text-yellow-500" />
                Is the school environment safe for children?
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 text-left font-serif pl-8 pr-3 pt-1 text-sm">
                Yes. Our campus is <strong>CCTV-monitored</strong>, child-safe, hygienic, and
                managed by trained staff. We maintain a
                <strong> low student–teacher ratio</strong> to ensure personal care,
                attention and safety.
              </AccordionContent>
            </AccordionItem>

            {/* Q4 */}
            <AccordionItem
              value="q4"
              className="bg-white shadow rounded-2xl p-3 border border-purple-100"
            >
              <AccordionTrigger className="text-lg flex items-center gap-2 font-medium text-purple-700">
                <School className="w-5 h-5 text-green-500" />
                Do you help children transition to primary school?
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 text-left font-serif pl-8 pr-3 pt-1 text-sm">
                Yes. We have tie-ups with reputed primary schools to ensure a
                smooth and comfortable transition.
                Our <strong>UKG program</strong> includes school-readiness training,
                early academics, and confidence-building skills.
              </AccordionContent>
            </AccordionItem>

            {/* Q5 */}
            <AccordionItem
              value="q5"
              className="bg-white shadow rounded-2xl p-3 border border-purple-100"
            >
              <AccordionTrigger className="text-lg flex items-center gap-2 font-medium text-purple-700">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                How do parents stay updated about their child’s progress?
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 text-left font-serif pl-8 pr-3 pt-1 text-sm">
                We provide a <strong>Parent Communication App</strong> that allows parents
                to receive daily updates, photos, activity reports, attendance, and
                important announcements—keeping you connected with your child’s
                learning journey.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </section>
  );
}
