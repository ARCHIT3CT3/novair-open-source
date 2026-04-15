"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, Zap } from "lucide-react";

export function Technologies() {
  const technologies = [
    {
      name: "React 19",
      description: "Bibliothèque UI moderne",
      color: "from-[#61DAFB]/20 to-[#61DAFB]/5",
      borderColor: "border-[#61DAFB]/30",
      textColor: "text-[#61DAFB]",
    },
    {
      name: "Next.js 16",
      description: "Framework React performant",
      color: "from-white/10 to-white/5",
      borderColor: "border-white/30",
      textColor: "text-white",
    },
    {
      name: "TypeScript",
      description: "Typage statique sécurisé",
      color: "from-[#3178C6]/20 to-[#3178C6]/5",
      borderColor: "border-[#3178C6]/30",
      textColor: "text-[#3178C6]",
    },
    {
      name: "Tailwind CSS",
      description: "Framework CSS utility-first",
      color: "from-[#06B6D4]/20 to-[#06B6D4]/5",
      borderColor: "border-[#06B6D4]/30",
      textColor: "text-[#06B6D4]",
    },
    {
      name: "Framer Motion",
      description: "Animations fluides",
      color: "from-[#FF0055]/20 to-[#FF0055]/5",
      borderColor: "border-[#FF0055]/30",
      textColor: "text-[#FF0055]",
    },
    {
      name: "Web3Forms",
      description: "Envoi d'emails sans serveur",
      color: "from-[#10B981]/20 to-[#10B981]/5",
      borderColor: "border-[#10B981]/30",
      textColor: "text-[#10B981]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden border-t border-border">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6"
          >
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Stack Technologique
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Développé avec les{" "}
            <span className="text-primary">Meilleures Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Une stack moderne et performante pour offrir la meilleure expérience
            utilisateur
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${tech.color} border ${tech.borderColor} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl`}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-xl bg-card/50 border ${tech.borderColor} flex items-center justify-center`}
                    >
                      {index === 0 && <Zap className={`w-6 h-6 ${tech.textColor}`} />}
                      {index === 1 && <Sparkles className={`w-6 h-6 ${tech.textColor}`} />}
                      {index === 2 && <Code2 className={`w-6 h-6 ${tech.textColor}`} />}
                      {index === 3 && <Sparkles className={`w-6 h-6 ${tech.textColor}`} />}
                      {index === 4 && <Zap className={`w-6 h-6 ${tech.textColor}`} />}
                      {index === 5 && <Code2 className={`w-6 h-6 ${tech.textColor}`} />}
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                      className={`px-3 py-1 rounded-full bg-card/50 border ${tech.borderColor}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xs font-medium text-foreground">
                        v{index === 0 ? "19" : index === 1 ? "16" : index === 2 ? "5" : index === 3 ? "4" : index === 4 ? "12" : "3"}
                      </span>
                    </motion.div>
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-2 ${tech.textColor} group-hover:scale-105 transition-transform`}
                  >
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>

                {/* Corner decoration */}
                <motion.div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${tech.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "100%", label: "TypeScript" },
            { value: "<2s", label: "Chargement" },
            { value: "1.75MB", label: "Bundle size" },
            { value: "90+", label: "PageSpeed" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Code open-source développé avec ❤️ par les élèves du{" "}
            <span className="text-primary font-medium">
              Lycée Élisa Lemonnier
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
