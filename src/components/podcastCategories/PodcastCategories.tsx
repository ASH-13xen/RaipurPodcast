import { Lightbulb, Rocket, Users, Sparkles, Globe, Heart } from "lucide-react";

const categories = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Breakthrough ideas and technologies",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship",
    description: "Building and scaling businesses",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Managing teams and culture",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Creativity",
    description: "Art, design, and creative thinking",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Globe,
    title: "Society",
    description: "Culture, trends, and social impact",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    title: "Wellness",
    description: "Mental and physical health",
    color: "from-red-500 to-pink-500",
  },
];

export function PodcastCategories() {
  return (
    <section className="bg-[#0a0d20] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Explore Topics
          </h2>
          <p className="text-slate-400 text-lg">
            Discover episodes by category
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="group relative bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}
                >
                  <Icon className="size-6 text-white" />
                </div>

                <h3 className="text-xl text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-400 text-sm">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
