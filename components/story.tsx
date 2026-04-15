"use client"

import { motion } from "framer-motion"
import { Lightbulb, Users, Rocket, Heart } from "lucide-react"

const timeline = [
  {
    icon: Lightbulb,
    title: "L'idée originale",
    description: "Ethan Hanquart observe un constat alarmant : des milliers de téléphones sont jetés chaque année alors que des personnes sans-abri n'ont aucun moyen d'appeler les secours en cas d'urgence.",
  },
  {
    icon: Heart,
    title: "Une vision solidaire",
    description: "Et si on pouvait donner une seconde vie à ces téléphones tout en sauvant des vies ? L'idée de Novair commence à prendre forme dans l'esprit d'Ethan.",
  },
  {
    icon: Users,
    title: "Une équipe se forme",
    description: "Convaincu par cette cause, Ethan rassemble une équipe de passionnés prêts à s'investir : Samuel, Mohammed, Evan, Raphael et Maxime rejoignent l'aventure.",
  },
  {
    icon: Rocket,
    title: "Novair est né",
    description: "Le projet prend officiellement vie. Novair signifie 'Nouvelle Air' - un souffle d'espoir pour ceux qui en ont le plus besoin.",
  },
]

export function Story() {
  return (
    <section id="histoire" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Notre Histoire
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-4 mb-6 text-balance">
            Comment est né Novair
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Tout a commencé par une simple observation et une volonté de faire la différence.
          </p>
        </motion.div>

        {/* Founder highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-serif font-bold text-primary">EH</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Ethan Hanquart</h3>
                <p className="text-primary font-medium mb-4">Fondateur de Novair</p>
                <blockquote className="text-muted-foreground italic text-lg">
                  "J'ai toujours cru qu'on pouvait faire quelque chose de concret pour aider les plus vulnérables. Novair, c'est la preuve qu'avec de la volonté et une équipe soudée, on peut vraiment changer les choses."
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 -translate-x-1/2 bg-card border-2 border-primary rounded-full flex items-center justify-center z-10">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                }`}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                    <span className="text-xs text-primary font-medium">Etape {index + 1}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-4rem)]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Aujourd'hui, Novair continue de grandir grâce à vous.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Rejoindre l'aventure
          </a>
        </motion.div>
      </div>
    </section>
  )
}
