import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Supriya Manwar",
      role: "Parent",
      image: "/attached_assets/asset/parent1.png",
      quote:
        "The teachers at Little Learningss are pure magic! Patient, caring, and so dedicated to making learning fun. Best preschool ever! My little one bloom into a happy learner.",
      rating: 5,
      color: "from-pink-400 to-red-400",
    },
    {
      name: "Vaishali Patil",
      role: "Parent",
      image: "/attached_assets/asset/parent2.png",
      quote:
        "This school has played a major role in my child's development. The staff is professional, caring, and very understanding. The daily activities are well planned and help in language development, creativity and social skills. We have seen noticeable improvement in his confidence and manners. I highly recommend this school for every child. Thank you!",
      rating: 5,
      color: "from-purple-400 to-blue-400",
    },
    {
      name: "Dr Suvarna Sharma",
      role: "Parent",
      image: "/attached_assets/asset/parent3.png",
      quote:
        "This school provides a safe, nurturing, and well-managed environment for kids. The staff maintains excellent communication and gives personal attention to every child. We’ve seen wonderful improvement in our child’s confidence and social skills.",
      rating: 5,
      color: "from-yellow-400 to-orange-400",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
            What Parents{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-serif max-w-2xl mx-auto">
            Real experiences from families who trust their little ones with us
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="
                p-7 rounded-3xl bg-white shadow-lg hover:shadow-2xl 
                hover:scale-[1.03] transition-all duration-300 relative
              "
            >
              {/* plain card, no colored ribbon */}

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 font-serif italic leading-relaxed mb-6">
                “{t.quote}”
              </p>

              {/* Avatar + Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 shadow">
                  <AvatarImage src={t.image} alt={t.name} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>

                <div>
                  <div className="font-bold text-gray-800 text-lg">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
