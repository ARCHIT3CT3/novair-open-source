"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useState, useRef } from "react";
import { useSiteConfig } from "@/lib/site-config";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const { config } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Utilisation de Web3Forms (gratuit et simple)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "02db7be6-b73e-4508-9a99-78b6840fa28c",
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: "contact@novair-project.fr",
          subject: `Nouveau message de ${formData.name} via Novair`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", message: "" });
          setStatus("idle");
        }, 3000);
      } else {
        throw new Error(data.message || "Erreur lors de l'envoi");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer.",
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
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
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
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
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Nous sommes à votre écoute
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-balance">
            <span className="text-primary">Contactez</span>-nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Une question ? Envie de nous rejoindre ou de donner un téléphone ?
            N'hésitez pas à nous contacter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6">
                Restons en contact
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Que vous soyez particulier, entreprise ou association, nous
                serions ravis d'échanger avec vous sur notre projet et comment
                vous pouvez contribuer.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Adresse",
                  content: config.contact.address,
                  color: "text-primary",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: config.contact.email,
                  color: "text-accent",
                  link: `mailto:${config.contact.email}`,
                },
                {
                  icon: Phone,
                  title: "Téléphone",
                  content: config.contact.phone,
                  color: "text-chart-3",
                  link: `tel:+33${config.contact.phone.replace(/\s/g, "").replace(/^0/, "")}`,
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 group cursor-pointer"
                  onClick={() => item.link && window.open(item.link, "_self")}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </motion.div>
                  <div>
                    <div className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </div>
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mt-12 p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold">
                  +500 personnes nous font confiance
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Rejoignez notre communauté et participez à un projet solidaire
                qui change des vies.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card border border-border space-y-6 relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nom complet <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    disabled={status === "loading"}
                    className="transition-all focus:scale-[1.02]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={status === "loading"}
                    className="transition-all focus:scale-[1.02]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={status === "loading"}
                    className="transition-all focus:scale-[1.02]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Parlez-nous de votre projet, vos questions ou comment vous souhaitez contribuer..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none transition-all focus:scale-[1.02] disabled:opacity-50"
                  />
                </motion.div>
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-primary/10 border border-primary/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm text-primary font-medium">
                      Message envoyé avec succès ! Nous vous répondrons dans les
                      plus brefs délais.
                    </p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                  >
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                    <div>
                      <p className="text-sm text-destructive font-medium">
                        Erreur lors de l'envoi
                      </p>
                      <p className="text-xs text-destructive/80 mt-1">
                        {errorMessage ||
                          "Veuillez réessayer ou nous contacter directement."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full group relative overflow-hidden"
                  disabled={status === "loading"}
                  size="lg"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Envoyer le message</span>
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground text-center">
                En envoyant ce formulaire, vous acceptez que vos données soient
                utilisées pour vous recontacter.
              </p>
            </form>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Réponse sous 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>100% sécurisé</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
