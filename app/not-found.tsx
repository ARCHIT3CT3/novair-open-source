"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        {/* Animated particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/5 blur-3xl"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number with Phone Icon */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="text-8xl md:text-9xl font-bold text-primary/20 select-none"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(76, 175, 80, 0.3)",
                    "0 0 40px rgba(76, 175, 80, 0.5)",
                    "0 0 20px rgba(76, 175, 80, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                4
              </motion.span>
              <motion.div
                className="mx-4 w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Phone className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </motion.div>
              <motion.span
                className="text-8xl md:text-9xl font-bold text-primary/20 select-none"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(76, 175, 80, 0.3)",
                    "0 0 40px rgba(76, 175, 80, 0.5)",
                    "0 0 20px rgba(76, 175, 80, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                4
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Page introuvable
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto"
          >
            Désolé, la page que vous recherchez semble avoir été déconnectée.
            Peut-être a-t-elle besoin d'une seconde vie ? 📱
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => router.push("/")}
                className="group"
              >
                <Home className="mr-2 w-5 h-5" />
                Retour à l'accueil
                <ArrowLeft className="ml-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.back()}
                className="group"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Page précédente
              </Button>
            </motion.div>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Peut-être cherchez-vous :
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { label: "Notre mission", href: "#mission" },
                { label: "Comment ça marche", href: "#comment" },
                { label: "Contact", href: "#contact" },
              ].map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => {
                    router.push("/");
                    setTimeout(() => {
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                  }}
                  className="text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Search suggestion */}
          <motion.div
            variants={itemVariants}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/30 backdrop-blur-sm text-sm text-muted-foreground"
          >
            <Search className="w-4 h-4" />
            <span>Code erreur : 404 - Not Found</span>
          </motion.div>

          {/* Technologies */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <p className="text-xs text-muted-foreground/70 text-center mb-4">
              Site développé avec
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "React 19",
                "Next.js 16",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-card/50 border border-border/50 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
