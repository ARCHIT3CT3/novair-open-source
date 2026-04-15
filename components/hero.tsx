"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Heart, Shield, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteConfig } from "@/lib/site-config";

// Pre-generated deterministic values for particles to avoid hydration mismatch
const particles = [
  { size: 2.5, duration: 3.2, delay: 0.5, left: 15, top: 20, colorIndex: 0 },
  { size: 1.8, duration: 4.1, delay: 1.2, left: 85, top: 15, colorIndex: 1 },
  { size: 3.2, duration: 2.8, delay: 0.8, left: 45, top: 80, colorIndex: 2 },
  { size: 2.1, duration: 3.5, delay: 1.5, left: 70, top: 45, colorIndex: 0 },
  { size: 1.5, duration: 4.5, delay: 0.3, left: 25, top: 60, colorIndex: 1 },
  { size: 2.8, duration: 3.0, delay: 1.0, left: 90, top: 70, colorIndex: 2 },
  { size: 1.9, duration: 3.8, delay: 0.7, left: 10, top: 85, colorIndex: 0 },
  { size: 2.6, duration: 2.5, delay: 1.8, left: 55, top: 10, colorIndex: 1 },
  { size: 1.3, duration: 4.2, delay: 0.2, left: 35, top: 40, colorIndex: 2 },
  { size: 3.0, duration: 3.3, delay: 1.3, left: 80, top: 55, colorIndex: 0 },
  { size: 2.2, duration: 2.9, delay: 0.9, left: 5, top: 30, colorIndex: 1 },
  { size: 1.7, duration: 4.0, delay: 1.6, left: 65, top: 25, colorIndex: 2 },
  { size: 2.4, duration: 3.6, delay: 0.4, left: 40, top: 90, colorIndex: 0 },
  { size: 1.6, duration: 3.1, delay: 1.1, left: 95, top: 35, colorIndex: 1 },
  { size: 2.9, duration: 2.7, delay: 0.6, left: 20, top: 50, colorIndex: 2 },
  { size: 1.4, duration: 4.3, delay: 1.4, left: 75, top: 75, colorIndex: 0 },
  { size: 2.7, duration: 3.4, delay: 0.1, left: 50, top: 65, colorIndex: 1 },
  { size: 1.2, duration: 3.9, delay: 1.7, left: 8, top: 5, colorIndex: 2 },
  { size: 3.1, duration: 2.6, delay: 0.9, left: 88, top: 88, colorIndex: 0 },
  { size: 2.0, duration: 3.7, delay: 0.5, left: 30, top: 75, colorIndex: 1 },
];

export function Hero() {
  const { config } = useSiteConfig();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background"
        style={{ opacity }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => {
          const color = particle.colorIndex === 0
            ? "oklch(0.65 0.18 145)"
            : particle.colorIndex === 1
              ? "oklch(0.55 0.12 30)"
              : "rgba(255, 255, 255, 0.5)";

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: color,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
                y: [0, -30, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl"
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, scale }}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Projet solidaire actif
              </span>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-balance"
          >
            Donner une{" "}
            <motion.span
              className="text-primary inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              seconde vie
            </motion.span>
            <br />
            aux appareils pour{" "}
            <motion.span
              className="text-accent inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              sauver des vies
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
          >
            Novair récupère vos téléphones, ordinateurs, consoles et appareils électroniques,
            les répare et les distribue aux personnes dans le besoin pour leur permettre
            d'accéder aux technologies essentielles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onClick={() => scrollToSection("#contact")}
              >
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-primary/0 via-white/20 to-primary/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center">
                  Donner un appareil
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={() => scrollToSection("#mission")}
              >
                Découvrir notre mission
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
          >
            {[
              {
                icon: Phone,
                value: config.stats.phonesDistributed,
                label: "Appareils donnés",
                color: "text-primary",
              },
              {
                icon: Heart,
                value: config.stats.partnerAssociations,
                label: "Associations partenaires",
                color: "text-accent",
              },
              {
                icon: Shield,
                value: "24/7",
                label: "Accès aux urgences",
                color: "text-chart-3",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border mb-3 relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 2 }}
                    transition={{ duration: 0.4 }}
                  />
                  <stat.icon
                    className={`w-5 h-5 ${stat.color} relative z-10`}
                  />
                </motion.div>

                <motion.div
                  className="text-2xl md:text-3xl font-semibold text-foreground"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>

                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => scrollToSection("#histoire")}
            >
              <span className="text-xs text-muted-foreground">Défiler</span>
              <motion.div
                className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
                whileHover={{ borderColor: "oklch(0.65 0.18 145)" }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full bg-primary"
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
