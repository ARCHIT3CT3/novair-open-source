"use client";

import { Heart, ArrowUp, Mail, Phone, MapPin, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteConfig } from "@/lib/site-config";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { config } = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      },
    },
  };

  const navigationLinks = [
    { href: "#histoire", label: "Notre histoire" },
    { href: "#mission", label: "Notre mission" },
    { href: "#comment", label: "Comment ça marche" },
    { href: "#equipe", label: "L'équipe" },
    { href: "#impact", label: "Notre impact" },
    { href: "#contact", label: "Contact" },
  ];

  const actionLinks = [
    { href: "#contact", label: "Donner un téléphone" },
    { href: "#contact", label: "Devenir bénévole" },
    { href: "#contact", label: "Nous soutenir" },
    { href: "#contact", label: "Partenariats" },
  ];

  return (
    <footer className="relative py-16 border-t border-border overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-3 mb-4 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-lg font-bold text-background">N</span>
              </motion.div>
              <span className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                Novair
              </span>
            </motion.button>

            <p className="text-muted-foreground leading-relaxed max-w-md mb-6">
              Donner une seconde vie aux téléphones pour permettre aux personnes
              sans-abri d'appeler les secours en cas d'urgence.
            </p>

            <div className="space-y-3 text-sm">
              <motion.a
                href={`https://maps.google.com/?q=${encodeURIComponent(config.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="group-hover:underline">
                  {config.contact.address}
                </span>
              </motion.a>

              <motion.a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="group-hover:underline">
                  {config.contact.email}
                </span>
              </motion.a>

              <motion.a
                href={`tel:+33${config.contact.phone.replace(/\s/g, "").replace(/^0/, "")}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="group-hover:underline">{config.contact.phone}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Action Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-foreground">Agir</h4>
            <ul className="space-y-2">
              {actionLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Novair. Tous droits r&eacute;serv&eacute;s. •{" "}
              <span className="text-xs">Lyc&eacute;e &Eacute;lisa Lemonnier</span>
            </p>

            <div className="flex items-center gap-4">
              <motion.p
                className="text-sm text-muted-foreground flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                Fait avec{" "}
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-4 h-4 text-accent fill-accent" />
                </motion.span>{" "}
                pour ceux qui en ont besoin
              </motion.p>

              {/* Admin Settings Link */}
              <Link href="/admin/login">
                <motion.button
                  className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Espace Administrateur"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-background shadow-lg hover:shadow-xl flex items-center justify-center group z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
