"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  saveSiteConfigToFirestore,
  subscribeToSiteConfig,
  getSiteConfigFromFirestore,
} from "./firebase";

export interface SiteStats {
  phonesDistributed: string;
  partnerAssociations: string;
  emergencyCalls: string;
  activeVolunteers: string;
}

export interface SiteContact {
  phone: string;
  email: string;
  address: string;
  emergencyNumber: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: number;
}

export interface SiteConfig {
  stats: SiteStats;
  contact: SiteContact;
  testimonials: Testimonial[];
  team: TeamMember[];
  maintenanceMode: boolean;
  activityLog: ActivityLog[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Grâce à Novair, j'ai pu avoir un ordinateur pour suivre mes cours en ligne. Ça a changé ma vie.",
    author: "Jean-Pierre",
    role: "Bénéficiaire",
  },
  {
    id: "2",
    quote:
      "Un projet solidaire qui fait vraiment la différence. Simple, efficace et humain.",
    author: "Marie L.",
    role: "Donatrice",
  },
  {
    id: "3",
    quote:
      "Novair nous permet de mieux accompagner les personnes en difficulté avec du matériel adapté. Un outil précieux pour notre mission.",
    author: "Sophie Martin",
    role: "Association Solidarité",
  },
];

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Alexandre Dubois",
    role: "Fondateur & Président",
    description: "Élève de terminale au lycée Élisa Lemonnier",
  },
  {
    id: "2",
    name: "Sarah Benali",
    role: "Responsable Communication",
    description: "Élève de première",
  },
  {
    id: "3",
    name: "Lucas Petit",
    role: "Responsable Technique",
    description: "Élève de terminale",
  },
];

const defaultConfig: SiteConfig = {
  stats: {
    phonesDistributed: "500+",
    partnerAssociations: "15",
    emergencyCalls: "127",
    activeVolunteers: "50+",
  },
  contact: {
    phone: "06 60 64 10 33",
    email: "contact@novair-project.fr",
    address: "Lycée polyvalent Élisa Lemonnier, 59500 Douai",
    emergencyNumber: "112",
  },
  testimonials: defaultTestimonials,
  team: defaultTeam,
  maintenanceMode: false,
  activityLog: [],
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateStats: (stats: Partial<SiteStats>) => void;
  updateContact: (contact: Partial<SiteContact>) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateTeam: (team: TeamMember[]) => void;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  removeTestimonial: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  removeTeamMember: (id: string) => void;
  toggleMaintenanceMode: () => void;
  addActivityLog: (action: string, details: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  resetConfig: () => void;
  isLoaded: boolean;
  syncStatus: "synced" | "syncing" | "offline" | "error";
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "novair-site-config";
const ADMIN_AUTH_KEY = "novair-admin-auth";

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<
    "synced" | "syncing" | "offline" | "error"
  >("syncing");
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    setIsAdmin(adminAuth.isAuthenticated());
  }, []);

  // Load initial config from Firebase (or localStorage as fallback)
  useEffect(() => {
    const loadConfig = async () => {
      setSyncStatus("syncing");

      // Try Firebase first
      try {
        const firebaseConfig = await getSiteConfigFromFirestore();
        if (firebaseConfig) {
          // Merge carefully: if team/testimonials are empty, use defaults
          const mergedConfig = {
            ...defaultConfig,
            ...firebaseConfig,
            // Ensure arrays are not empty by falling back to defaults
            team:
              firebaseConfig.team?.length > 0
                ? firebaseConfig.team
                : defaultConfig.team,
            testimonials:
              firebaseConfig.testimonials?.length > 0
                ? firebaseConfig.testimonials
                : defaultConfig.testimonials,
          };
          setConfig(mergedConfig);
          // Also save to localStorage as cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedConfig));
          setSyncStatus("synced");
          setIsLoaded(true);
          return;
        }
      } catch (error) {
        console.error("Firebase load error:", error);
      }

      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setConfig({ ...defaultConfig, ...parsed });
          setSyncStatus("offline");
        } catch (e) {
          console.error("Failed to parse local config", e);
          setConfig(defaultConfig);
        }
      } else {
        // No local storage, use defaults and try to save to Firebase
        setConfig(defaultConfig);
        // Only save if admin
        if (adminAuth.isAuthenticated()) {
          await saveSiteConfigToFirestore(defaultConfig);
        }
      }

      setIsLoaded(true);
    };

    loadConfig();
  }, []);

  // Subscribe to real-time Firebase updates (for non-admin users)
  useEffect(() => {
    if (!isLoaded) return;

    // Only subscribe to real-time updates if not admin (admin saves, others listen)
    if (!isAdmin) {
      const unsubscribe = subscribeToSiteConfig((firebaseData) => {
        if (firebaseData) {
          // Merge carefully: if team/testimonials are empty, use defaults
          const mergedConfig = {
            ...defaultConfig,
            ...firebaseData,
            team:
              firebaseData.team?.length > 0
                ? firebaseData.team
                : defaultConfig.team,
            testimonials:
              firebaseData.testimonials?.length > 0
                ? firebaseData.testimonials
                : defaultConfig.testimonials,
          };
          setConfig((prev) => mergedConfig);
          // Update cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedConfig));
          setSyncStatus("synced");
        }
      });

      return () => unsubscribe();
    }
  }, [isLoaded, isAdmin]);

  // Sync to Firebase when config changes (only for admin)
  const syncToFirebase = useCallback(
    async (newConfig: SiteConfig) => {
      if (isAdmin && adminAuth.isAuthenticated()) {
        setSyncStatus("syncing");
        const success = await saveSiteConfigToFirestore(newConfig);
        setSyncStatus(success ? "synced" : "error");
      }
    },
    [isAdmin],
  );

  const updateStats = (stats: Partial<SiteStats>) => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        stats: { ...prev.stats, ...stats },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const updateContact = (contact: Partial<SiteContact>) => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        contact: { ...prev.contact, ...contact },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const updateTestimonials = (testimonials: Testimonial[]) => {
    setConfig((prev) => {
      const newConfig = { ...prev, testimonials };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const updateTeam = (team: TeamMember[]) => {
    setConfig((prev) => {
      const newConfig = { ...prev, team };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const addTestimonial = (testimonial: Omit<Testimonial, "id">) => {
    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString(),
    };
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        testimonials: [...prev.testimonials, newTestimonial],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const removeTestimonial = (id: string) => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        testimonials: prev.testimonials.filter((t) => t.id !== id),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const newMember = {
      ...member,
      id: Date.now().toString(),
    };
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        team: [...prev.team, newMember],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const removeTeamMember = (id: string) => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        team: prev.team.filter((m) => m.id !== id),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const toggleMaintenanceMode = () => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        maintenanceMode: !prev.maintenanceMode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const addActivityLog = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      details,
      timestamp: Date.now(),
    };
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        activityLog: [newLog, ...prev.activityLog.slice(0, 49)], // Keep last 50 logs
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return newConfig;
    });
  };

  const exportData = () => {
    return JSON.stringify(config, null, 2);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      const newConfig = { ...defaultConfig, ...parsed };
      setConfig(newConfig);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      syncToFirebase(newConfig);
      return true;
    } catch (e) {
      console.error("Failed to import data", e);
      return false;
    }
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    syncToFirebase(defaultConfig);
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateStats,
        updateContact,
        updateTestimonials,
        updateTeam,
        addTestimonial,
        removeTestimonial,
        addTeamMember,
        removeTeamMember,
        toggleMaintenanceMode,
        addActivityLog,
        exportData,
        importData,
        resetConfig,
        isLoaded,
        syncStatus,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}

// Admin authentication utilities
export const adminAuth = {
  login: (username: string, password: string): boolean => {
    if (username === "YOUR-USERNAME" && password === "YOUR-PASSWORD") {
      const session = {
        isAuthenticated: true,
        timestamp: Date.now(),
      };
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!stored) return false;

    try {
      const session = JSON.parse(stored);
      const isValid =
        session.isAuthenticated &&
        Date.now() - session.timestamp < 24 * 60 * 60 * 1000;

      if (!isValid) {
        localStorage.removeItem(ADMIN_AUTH_KEY);
      }
      return isValid;
    } catch {
      return false;
    }
  },
};
