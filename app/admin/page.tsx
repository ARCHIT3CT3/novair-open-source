"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Settings,
  LogOut,
  Save,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Eye,
  Users,
  Quote,
  Download,
  Upload,
  History,
  Wrench,
  Plus,
  Trash2,
  X,
  FileJson,
  Calendar,
  TrendingUp,
  Package,
  HeartHandshake,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSiteConfig, adminAuth, Testimonial, TeamMember, ActivityLog } from "@/lib/site-config";

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    config,
    updateStats,
    updateContact,
    addTestimonial,
    removeTestimonial,
    addTeamMember,
    removeTeamMember,
    toggleMaintenanceMode,
    exportData,
    importData,
    resetConfig,
    isLoaded,
    syncStatus,
  } = useSiteConfig();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "stats" | "contact" | "testimonials" | "team" | "activity" | "settings">("dashboard");
  const [savedMessage, setSavedMessage] = useState(false);

  // Form states
  const [stats, setStats] = useState(config.stats);
  const [contact, setContact] = useState(config.contact);
  const [newTestimonial, setNewTestimonial] = useState({ quote: "", author: "", role: "" });
  const [newTeamMember, setNewTeamMember] = useState({ name: "", role: "", description: "" });
  const [importJson, setImportJson] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    if (!adminAuth.isAuthenticated()) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    if (isLoaded) {
      setStats(config.stats);
      setContact(config.contact);
    }
  }, [config, isLoaded]);

  const handleLogout = () => {
    adminAuth.logout();
    router.push("/admin/login");
  };

  const handleSaveStats = () => {
    updateStats(stats);
    showSuccess("Statistiques mises à jour");
  };

  const handleSaveContact = () => {
    updateContact(contact);
    showSuccess("Contact mis à jour");
  };

  const showSuccess = (message: string) => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.quote && newTestimonial.author && newTestimonial.role) {
      addTestimonial(newTestimonial);
      setNewTestimonial({ quote: "", author: "", role: "" });
      showSuccess("Témoignage ajouté");
    }
  };

  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      addTeamMember(newTeamMember);
      setNewTeamMember({ name: "", role: "", description: "" });
      showSuccess("Membre ajouté à l'équipe");
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `novair-config-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSuccess("Données exportées");
  };

  const handleImport = () => {
    if (importJson.trim()) {
      const success = importData(importJson);
      if (success) {
        setImportJson("");
        setShowImportModal(false);
        showSuccess("Données importées avec succès");
      } else {
        alert("Erreur lors de l'import. Vérifiez le format JSON.");
      }
    }
  };

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.")) {
      resetConfig();
      showSuccess("Configuration réinitialisée");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated || !isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Settings className="w-5 h-5 text-background" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Admin Novair</h1>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">Gestion du contenu</p>
                  {/* Sync Status Indicator */}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    syncStatus === "synced" ? "bg-green-100 text-green-700" :
                    syncStatus === "syncing" ? "bg-yellow-100 text-yellow-700" :
                    syncStatus === "offline" ? "bg-gray-100 text-gray-600" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {syncStatus === "synced" ? "✓ Sync" :
                     syncStatus === "syncing" ? "⟳ Sync..." :
                     syncStatus === "offline" ? "⚠ Offline" :
                     "✗ Error"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("/", "_blank")}
              >
                <Eye className="w-4 h-4 mr-2" />
                Voir le site
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-80px)] border-r border-border bg-card/30 p-4">
          <nav className="space-y-1">
            <SidebarButton
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              icon={<BarChart3 className="w-4 h-4" />}
              label="Tableau de bord"
            />
            <SidebarButton
              active={activeTab === "stats"}
              onClick={() => setActiveTab("stats")}
              icon={<TrendingUp className="w-4 h-4" />}
              label="Statistiques"
            />
            <SidebarButton
              active={activeTab === "contact"}
              onClick={() => setActiveTab("contact")}
              icon={<Phone className="w-4 h-4" />}
              label="Contact"
            />
            <SidebarButton
              active={activeTab === "testimonials"}
              onClick={() => setActiveTab("testimonials")}
              icon={<Quote className="w-4 h-4" />}
              label="Témoignages"
              badge={config.testimonials.length}
            />
            <SidebarButton
              active={activeTab === "team"}
              onClick={() => setActiveTab("team")}
              icon={<Users className="w-4 h-4" />}
              label="Équipe"
              badge={config.team.length}
            />
            <SidebarButton
              active={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
              icon={<History className="w-4 h-4" />}
              label="Journal"
              badge={config.activityLog.length}
            />
            <SidebarButton
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              icon={<Settings className="w-4 h-4" />}
              label="Paramètres"
            />
          </nav>

          {/* Maintenance Mode Card */}
          <div className="mt-8 p-4 rounded-lg bg-muted">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Maintenance</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {config.maintenanceMode ? "Activé" : "Désactivé"}
              </span>
              <button
                onClick={() => {
                  toggleMaintenanceMode();
                  showSuccess(config.maintenanceMode ? "Mode maintenance désactivé" : "Mode maintenance activé");
                }}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  config.maintenanceMode ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${
                    config.maintenanceMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Success Message */}
          {savedMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Modifications enregistrées !</span>
            </motion.div>
          )}

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6">Tableau de bord</h2>
              
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <DashboardCard
                  icon={<Package className="w-5 h-5" />}
                  label="Téléphones distribués"
                  value={config.stats.phonesDistributed}
                  color="bg-blue-500/10 text-blue-600"
                />
                <DashboardCard
                  icon={<HeartHandshake className="w-5 h-5" />}
                  label="Associations"
                  value={config.stats.partnerAssociations}
                  color="bg-green-500/10 text-green-600"
                />
                <DashboardCard
                  icon={<Activity className="w-5 h-5" />}
                  label="Appels d'urgence"
                  value={config.stats.emergencyCalls}
                  color="bg-red-500/10 text-red-600"
                />
                <DashboardCard
                  icon={<Users className="w-5 h-5" />}
                  label="Bénévoles"
                  value={config.stats.activeVolunteers}
                  color="bg-purple-500/10 text-purple-600"
                />
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Quote className="w-5 h-5 text-primary" />
                    Derniers témoignages
                  </h3>
                  <div className="space-y-3">
                    {config.testimonials.slice(0, 3).map((t) => (
                      <div key={t.id} className="p-3 rounded-lg bg-muted text-sm">
                        <p className="line-clamp-2 text-muted-foreground">"{t.quote}"</p>
                        <p className="text-xs mt-1 font-medium">{t.author}, {t.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Activité récente
                  </h3>
                  <div className="space-y-3">
                    {config.activityLog.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Aucune activité enregistrée</p>
                    ) : (
                      config.activityLog.slice(0, 5).map((log) => (
                        <div key={log.id} className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div>
                            <p className="font-medium">{log.action}</p>
                            <p className="text-xs text-muted-foreground">{log.details}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(log.timestamp)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATS TAB */}
          {activeTab === "stats" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Statistiques du site
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modifiez les chiffres affichés sur le site
                  </p>
                </div>
                <Button size="sm" onClick={handleSaveStats}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Téléphones distribués</label>
                  <Input
                    value={stats.phonesDistributed}
                    onChange={(e) => setStats({ ...stats, phonesDistributed: e.target.value })}
                    placeholder="500+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Associations partenaires</label>
                  <Input
                    value={stats.partnerAssociations}
                    onChange={(e) => setStats({ ...stats, partnerAssociations: e.target.value })}
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Appels d'urgence passés</label>
                  <Input
                    value={stats.emergencyCalls}
                    onChange={(e) => setStats({ ...stats, emergencyCalls: e.target.value })}
                    placeholder="127"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bénévoles actifs</label>
                  <Input
                    value={stats.activeVolunteers}
                    onChange={(e) => setStats({ ...stats, activeVolunteers: e.target.value })}
                    placeholder="50+"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Informations de contact
                  </h2>
                </div>
                <Button size="sm" onClick={handleSaveContact}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <Input
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Adresse</label>
                  <Input
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Numéro d'urgence</label>
                  <Input
                    value={contact.emergencyNumber}
                    onChange={(e) => setContact({ ...contact, emergencyNumber: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === "testimonials" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />
                  Ajouter un témoignage
                </h2>
                <div className="grid gap-4">
                  <textarea
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                    placeholder="Citation du témoignage..."
                    value={newTestimonial.quote}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Nom de l'auteur"
                      value={newTestimonial.author}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
                    />
                    <Input
                      placeholder="Rôle (ex: Bénéficiaire, Donateur...)"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddTestimonial} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Témoignages existants ({config.testimonials.length})</h3>
                <div className="space-y-4">
                  {config.testimonials.map((t) => (
                    <div key={t.id} className="p-4 rounded-lg bg-muted flex justify-between items-start">
                      <div>
                        <p className="text-sm italic">"{t.quote}"</p>
                        <p className="text-xs mt-2 font-medium">{t.author}, <span className="text-muted-foreground">{t.role}</span></p>
                      </div>
                      <button
                        onClick={() => removeTestimonial(t.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TEAM TAB */}
          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Ajouter un membre
                </h2>
                <div className="grid gap-4">
                  <Input
                    placeholder="Nom complet"
                    value={newTeamMember.name}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                  />
                  <Input
                    placeholder="Rôle dans l'équipe"
                    value={newTeamMember.role}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                  />
                  <Input
                    placeholder="Description (ex: Élève de terminale...)"
                    value={newTeamMember.description}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, description: e.target.value })}
                  />
                  <Button onClick={handleAddTeamMember} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Membres de l'équipe ({config.team.length})</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {config.team.map((member) => (
                    <div key={member.id} className="p-4 rounded-lg bg-muted flex justify-between items-start">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-primary">{member.role}</p>
                        <p className="text-xs text-muted-foreground">{member.description}</p>
                      </div>
                      <button
                        onClick={() => removeTeamMember(member.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === "activity" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Journal d'activité
              </h2>
              {config.activityLog.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Aucune activité enregistrée</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {config.activityLog.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{log.action}</p>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(log.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-primary" />
                  Import / Export des données
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleExport} className="h-auto py-4">
                    <Download className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Exporter</p>
                      <p className="text-xs text-muted-foreground">Télécharger toutes les données en JSON</p>
                    </div>
                  </Button>
                  <Button variant="outline" onClick={() => setShowImportModal(true)} className="h-auto py-4">
                    <Upload className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Importer</p>
                      <p className="text-xs text-muted-foreground">Restaurer depuis un fichier JSON</p>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-destructive">
                  <RotateCcw className="w-5 h-5" />
                  Zone de danger
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div>
                      <p className="font-medium">Réinitialiser tout</p>
                      <p className="text-sm text-muted-foreground">Toutes les données seront perdues</p>
                    </div>
                    <Button variant="destructive" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-lg w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Importer des données</h3>
              <button onClick={() => setShowImportModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              className="w-full h-40 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-xs"
              placeholder="Collez votre JSON ici..."
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowImportModal(false)} className="flex-1">
                Annuler
              </Button>
              <Button onClick={handleImport} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SidebarButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-muted"}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function DashboardCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
