"use client"

import { motion } from "framer-motion"
import { Phone, Wrench, Heart, AlertCircle } from "lucide-react"

const features = [
  {
    icon: Phone,
    title: "Collecte",
    description: "Nous récupérons vos téléphones, ordinateurs, consoles et appareils électroniques, peu importe leur état.",
  },
  {
    icon: Wrench,
    title: "Réparation",
    description: "Nos bénévoles réparent et remettent en état chaque appareil avec soin et expertise.",
  },
  {
    icon: Heart,
    title: "Distribution",
    description: "Les appareils réparés sont confiés à nos associations partenaires pour être redistribués.",
  },
  {
    icon: AlertCircle,
    title: "Inclusion",
    description: "Chaque appareil offre une nouvelle chance d'accéder à la technologie et aux services essentiels.",
  },
]

export function Mission() {
  return (
    <section id="mission" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-balance">
            Notre <span className="text-primary">mission</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Chaque appareil donné est une chance supplémentaire pour une personne dans le besoin 
            d'accéder à la technologie et aux opportunités qu'elle offre.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              <div className="absolute top-4 right-4 text-4xl font-bold text-border group-hover:text-primary/20 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
