import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";

export const CertificationsSection = () => {
  const certifications = [
    {
      title: "PW Skills DSA with Python Course Certificate",
      issuer: "PW Skills",
      date: "2024",
      credentialId: "PW-DSA-PYTHON-2024",
      description: "Completed comprehensive Data Structures and Algorithms course with Python programming, covering fundamental and advanced algorithms, data structures, and problem-solving techniques.",
      skills: ["Data Structures", "Algorithms", "Python", "Problem Solving"],
      verificationUrl: "#",
      badgeColor: "from-blue-500 to-cyan-600"
    },
    {
      title: "Python Course Completion",
      issuer: "Infosys",
      date: "2024",
      credentialId: "INFOSYS-PYTHON-2024",
      description: "Successfully completed Python programming course offered by Infosys, gaining proficiency in Python fundamentals, object-oriented programming, and practical applications.",
      skills: ["Python", "OOP", "Programming Fundamentals", "Software Development"],
      verificationUrl: "#",
      badgeColor: "from-green-500 to-emerald-600"
    },
    {
      title: "Full Stack Course Completion",
      issuer: "PW Skills",
      date: "2024",
      credentialId: "PW-FULLSTACK-2024",
      description: "Completed comprehensive full-stack development course covering both frontend and backend technologies, including modern web development frameworks and databases.",
      skills: ["Full Stack Development", "Frontend", "Backend", "Web Development"],
      verificationUrl: "#",
      badgeColor: "from-purple-500 to-pink-600"
    },
    {
      title: "Full Stack Intern",
      issuer: "PW Skills",
      date: "2024",
      credentialId: "PW-FS-INTERN-2024",
      description: "Completed full-stack development internship program, gaining hands-on experience in building complete web applications from concept to deployment.",
      skills: ["Full Stack Development", "Internship", "Web Applications", "Deployment"],
      verificationUrl: "#",
      badgeColor: "from-orange-500 to-yellow-600"
    },
    {
      title: "Introduction to Generative AI Studio",
      issuer: "Google",
      date: "2024",
      credentialId: "GOOGLE-GENAI-2024",
      description: "Completed Google's Introduction to Generative AI Studio course, learning about generative AI concepts, tools, and practical applications in modern AI development.",
      skills: ["Generative AI", "AI Tools", "Machine Learning", "Google AI"],
      verificationUrl: "#",
      badgeColor: "from-red-500 to-pink-600"
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-background/10 dark:bg-gray-900/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Award className="h-4 w-4" />
          My Certifications
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span>Certifications</span>
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Professional certifications that validate my expertise in cloud computing, programming, and development technologies.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              className="group relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <div className={`absolute -top-3 left-6 w-12 h-12 rounded-full bg-gradient-to-r ${cert.badgeColor} flex items-center justify-center shadow-lg`}>
                <Award className="w-6 h-6 text-white" />
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">{cert.issuer}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    ID: {cert.credentialId}
                  </span>
                  <button className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};