import { motion } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";

export const AchievementsSection = () => {
  const achievements = [
    {
      title: "Won Hackathon",
      description: "Secured first place in a college-level hackathon.",
      year: "2023",
      icon: <Trophy className="w-8 h-8 text-primary" />,
    },
    {
      title: "Google Student Brand Ambassador",
      description: "Selected as a Google Student Brand Ambassador program participant.",
      year: "2024",
      icon: <Star className="w-8 h-8 text-yellow-400" />,
    },
    {
      title: "Selected for SIH",
      description: "Shortlisted for Smart India Hackathon conducted at our college.",
      year: "2024",
      icon: <Award className="w-8 h-8 text-green-400" />,
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-background/10 dark:bg-gray-900/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Star className="h-4 w-4" />
          My Achievements
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span>Achievements</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center bg-background/60 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="mb-4">{ach.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{ach.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                {ach.description}
              </p>
              <span className="text-xs text-gray-400">{ach.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
