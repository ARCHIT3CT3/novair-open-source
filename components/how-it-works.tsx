"use client"

import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    title: "Vous donnez votre appareil",
    description: "Déposez votre téléphone, ordinateur, console ou tout appareil électronique dans l'un de nos points de collecte ou envoyez-le nous directement.",
  },
  {
    step: "02",
    title: "Nous le réparons",
    description: "Notre équipe de bénévoles techniciens diagnostic et remet l'appareil en état de fonctionnement optimal.",
  },
  {
    step: "03",
    title: "L'association le distribue",
    description: "Nos partenaires associatifs identifient les personnes qui en ont le plus besoin selon le type d'appareil.",
  },
  {
    step: "04",
    title: "Une vie transformée",
    description: "Avec cet appareil, une personne dans le besoin peut accéder à l'éducation, à l'emploi, aux soins ou rester connectée.",
  },
]

export function HowItWorks() {
  return (
    <section id="comment" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-balance">
            Comment <span className="text-primary">ça marche</span> ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un processus simple et transparent pour transformer un geste en impact réel.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Line connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 w-px h-[calc(100%-4rem)] bg-gradient-to-b from-primary to-border" />
              )}
              
              {/* Step number */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-semibold text-sm">
                {item.step}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
