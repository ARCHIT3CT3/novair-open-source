"use client"

import { motion, animate } from "framer-motion"
import { useSiteConfig } from "@/lib/site-config"
import { Quote, TrendingUp, Heart, Phone, Users, Activity } from "lucide-react"
import { useEffect, useState } from "react"

const testimonials = [
  {
    quote: "Grâce à Novair, j'ai pu avoir un ordinateur pour suivre mes cours en ligne. Ça a changé ma vie.",
    author: "Jean-Pierre",
    role: "Bénéficiaire",
    avatar: "JP"
  },
  {
    quote: "Un projet solidaire qui fait vraiment la différence. Simple, efficace et humain.",
    author: "Marie L.",
    role: "Donatrice",
    avatar: "ML"
  },
  {
    quote: "Novair nous permet de mieux accompagner les personnes en difficulté avec du matériel adapté. Un outil précieux.",
    author: "Sophie Martin",
    role: "Association Solidarité",
    avatar: "SM"
  },
]

function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0
  const suffix = value.replace(/[0-9]/g, "")
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest))
      }
    })
    return controls.stop
  }, [numericValue, duration])

  return (
    <span>{displayValue}{suffix}</span>
  )
}

function StatCard({ stat, index, icon: Icon }: { 
  stat: { value: string; label: string; description: string }
  index: number
  icon: React.ElementType 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-primary/10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
        >
          <Icon className="w-7 h-7 text-primary" />
        </motion.div>
        
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent mb-3">
          <AnimatedCounter value={stat.value} />
        </div>
        
        <div className="text-lg font-semibold mb-2 text-foreground">{stat.label}</div>
        <div className="text-sm text-muted-foreground">{stat.description}</div>
        
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

function TestimonialCard({ testimonial, index }: { 
  testimonial: typeof testimonials[0]
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
      <div className="relative p-8 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 h-full flex flex-col">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
          className="absolute -top-4 -left-2"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Quote className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
        
        <p className="text-foreground/90 leading-relaxed mb-6 flex-grow text-lg italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold shadow-lg">
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-semibold text-foreground">{testimonial.author}</div>
            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Impact() {
  const { config } = useSiteConfig()

  const stats = [
    { value: config.stats.phonesDistributed, label: "Appareils distribués", description: "Des vies changées" },
    { value: config.stats.partnerAssociations, label: "Associations partenaires", description: "À travers la France" },
    { value: config.stats.emergencyCalls, label: "Vies améliorées", description: "Grâce à nos appareils" },
    { value: config.stats.activeVolunteers, label: "Bénévoles actifs", description: "Qui donnent de leur temps" },
  ]

  const statIcons = [Phone, Heart, Activity, Users]

  return (
    <section id="impact" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nos réalisations</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Notre <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Chaque chiffre représente une histoire, une vie potentiellement sauvée. 
            Ensemble, nous faisons la différence.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} icon={statIcons[index]} />
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ils témoignent
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des mots qui nous inspirent et nous poussent à aller plus loin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
