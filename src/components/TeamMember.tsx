import React from "react";
import { Instagram, Linkedin } from "lucide-react";

// --- Configuration ---

const TEAM_DATA = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Creative Director",
    image: "/img1.png", // Ensure these files exist in your public folder (e.g., .png or .jpg)
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "Lead Producer",
    image: "/img2.png",
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "Audio Engineer",
    image: "/img3.png",
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Content Strategist",
    image: "/img4.png",
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 5,
    name: "Vikram Das",
    role: "Videographer",
    image: "/img5.png",
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 6,
    name: "Ananya Roy",
    role: "Social Media Manager",
    image: "/img6.png",
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 7,
    name: "Karan Malhotra",
    role: "Editor",
    image: "/img7.png",
    socials: { instagram: "#", linkedin: "#" },
  },
];

// --- Sub-Components ---

const SocialLink = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: React.ElementType;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300 border border-slate-700 hover:border-purple-500"
  >
    <Icon className="w-4 h-4" />
  </a>
);

// --- Main Component ---

const TeamMember = () => {
  return (
    <section className="relative w-full py-20 bg-slate-950 overflow-hidden">
      {/* Background Decor: Subtle Purple Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Meet The Crew
          </h2>
          <p className="text-slate-400 text-sm md:text-lg">
            The creative minds and technical wizards behind the scenes bringing
            stories to life.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {TEAM_DATA.map((member) => (
            <div
              key={member.id}
              className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Mobile: Always visible socials at bottom right */}
                {/* Desktop: Slide up on hover */}
                <div className="absolute bottom-3 right-3 z-20 flex gap-2 md:translate-y-12 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-10">
                  <SocialLink
                    href={member.socials.instagram}
                    icon={Instagram}
                  />
                  <SocialLink href={member.socials.linkedin} icon={Linkedin} />
                </div>
              </div>

              {/* Text Content */}
              <div className="p-4 relative z-20 -mt-12">
                <div className="backdrop-blur-md bg-slate-950/60 border border-slate-800 p-3 rounded-xl shadow-lg group-hover:bg-slate-900/80 transition-colors duration-300">
                  <h3 className="text-white font-semibold text-base md:text-lg truncate">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 text-xs md:text-sm font-medium truncate">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
