"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { href: "#histoire", label: "Histoire" },
    { href: "#mission", label: "Mission" },
    { href: "#comment", label: "Comment ça marche" },
    { href: "#equipe", label: "Équipe" },
    { href: "#impact", label: "Impact" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <motion.button
            onClick={() => scrollToSection("#")}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-lg font-bold text-background">N</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none">
                Novair
              </span>
              <span className="text-[10px] text-muted-foreground leading-none hidden sm:block">
                Lycée Élisa Lemonnier
              </span>
            </div>
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
                <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </nav>

          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="group"
            >
              Donner un téléphone
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="group"
            >
              Nous soutenir
            </Button>
          </motion.div>

          <motion.button
            className="md:hidden p-2 relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <nav className="flex flex-col gap-4 py-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  className="flex flex-col gap-2 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => scrollToSection("#contact")}
                  >
                    Donner un téléphone
                  </Button>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => scrollToSection("#contact")}
                  >
                    Nous soutenir
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
