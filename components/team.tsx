"use client"

import { motion } from "framer-motion"
import { Users, Heart, Target, Sparkles } from "lucide-react"
import { useSiteConfig } from "@/lib/site-config"

// Role-based icons
const roleIcons: Record<string, React.ElementType> = {
  "Fondateur": Sparkles,
  "Co-fondatrice": Heart,
  "Responsable Technique": Target,
}

function TeamMemberCard({ member, index }: { member: { id: string; name: string; role: string; description: string }; index: number }) {
  const Icon = roleIcons[member.role] || Users
  
  // Generate initials from name
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  
  // Generate a consistent gradient based on name
  const gradients = [
    "from-primary to-accent",
    "from-accent to-chart-3",
    "from-chart-3 to-primary",
    "from-primary via-accent to-chart-3",
  ]
  const gradient = gradients[index % gradients.length]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10, 
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur`} />
      
      <div className="relative p-8 rounded-2xl border border-border/50 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
        {/* Background decoration */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
        
        <div className="relative z-10">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
          >
            <span className="text-2xl font-bold text-white">{initials}</span>
          </motion.div>
          
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 text-xs font-medium mb-4`}
          >
            <Icon className="w-3 h-3" />
            {member.role}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {member.name}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {member.description}
          </p>
        </div>
        
        {/* Bottom decoration line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} origin-left`}
        />
      </div>
    </motion.div>
  )
}

export function Team() {
  const { config } = useSiteConfig()
  const teamMembers = config.team

  return (
    <section id="equipe" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Notre équipe</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Les <span className="bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-transparent">visages</span> de Novair
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Une équipe engagée et passionnée, unie par la volonté de faire la différence 
            dans la vie des personnes les plus vulnérables.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Team stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {teamMembers.length}
                </div>
                <div className="text-sm text-muted-foreground">Membres actifs</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-chart-3 bg-clip-text text-transparent mb-2">
                  3
                </div>
                <div className="text-sm text-muted-foreground">Pôles d&apos;activité</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-chart-3 to-primary bg-clip-text text-transparent mb-2">
                  1
                </div>
                <div className="text-sm text-muted-foreground">Mission commune</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
