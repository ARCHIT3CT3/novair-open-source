"use client";

import { useCallback } from "react";

interface UseSmoothScrollOptions {
  offset?: number;
  duration?: number;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { offset = 80, duration = 800 } = options;

  const scrollToSection = useCallback(
    (sectionId: string) => {
      // Si c'est juste "#" ou vide, scroll vers le top
      if (!sectionId || sectionId === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const element = document.querySelector(sectionId);
      if (!element) {
        console.warn(`Element with selector "${sectionId}" not found`);
        return;
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    [offset]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToElement = useCallback(
    (element: HTMLElement) => {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    [offset]
  );

  return {
    scrollToSection,
    scrollToTop,
    scrollToElement,
  };
}

// Hook pour détecter si une section est visible
export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.querySelector(sectionIds[i]);
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

// Import React for useScrollSpy
import React from "react";
