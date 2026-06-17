"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import axios from "axios";

export interface HomeSection {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const STORAGE_KEY = "punotes_home_layout";

const defaultSections: HomeSection[] = [
  { id: "hero", label: "Welcome Hero", description: "Main banner with search and quick actions", enabled: true },
  { id: "quickAccess", label: "Quick Access", description: "Shortcuts to Notes, Syllabus, PYQs", enabled: true },
  { id: "recentNotes", label: "Recent Notes", description: "Latest added study materials", enabled: true },
  { id: "stats", label: "Community Stats", description: "User count, notes count, downloads", enabled: true },
  { id: "contribute", label: "Contribute CTA", description: "Call to action for sharing resources", enabled: true },
  { id: "features", label: "Features Overview", description: "Why use PuNotes section", enabled: false },
  { id: "analytics", label: "Analytics Preview", description: "Quick site stats dashboard", enabled: false },
];

function mergeWithDefaults(saved: HomeSection[]): HomeSection[] {
  return defaultSections.map((def) => {
    const savedSection = saved.find((s: HomeSection) => s.id === def.id);
    return savedSection || def;
  });
}

export function useHomeCustomization() {
  const [sections, setSections] = useState<HomeSection[]>(defaultSections);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const user = useUser();

  // Load initial data
  useEffect(() => {
    const loadLayout = async () => {
      try {
        // For logged-in users, try API first
        if (user) {
          try {
            const res = await axios.get("/api/me/layout");
            if (res.data.data) {
              const merged = mergeWithDefaults(res.data.data);
              setSections(merged);
              // Also cache locally as backup
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              setIsLoaded(true);
              return;
            }
          } catch {
            // API failed, fall through to localStorage
          }
        }

        // Fall back to localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const merged = mergeWithDefaults(parsed);
          setSections(merged);
        }
      } catch {
        // Ignore all errors, use defaults
      }
      setIsLoaded(true);
    };

    loadLayout();
  }, [user]);

  // Save to API (logged-in users) and localStorage
  const saveToBackend = useCallback(async (newSections: HomeSection[]) => {
    // Always save to localStorage as backup
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSections));
    } catch {
      // Ignore
    }

    // If logged in, sync to API
    if (user && !isSyncing) {
      setIsSyncing(true);
      try {
        await axios.put("/api/me/layout", newSections);
      } catch {
        // API failed, but localStorage succeeded
      } finally {
        setIsSyncing(false);
      }
    }
  }, [user, isSyncing]);

  const updateSections = useCallback((newSections: HomeSection[]) => {
    setSections(newSections);
    saveToBackend(newSections);
  }, [saveToBackend]);

  const toggleSection = useCallback((id: string) => {
    setSections((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
      saveToBackend(updated);
      return updated;
    });
  }, [saveToBackend]);

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    setSections((prev) => {
      const newSections = [...prev];
      const [moved] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, moved);
      saveToBackend(newSections);
      return newSections;
    });
  }, [saveToBackend]);

  const resetToDefault = useCallback(() => {
    setSections(defaultSections);
    saveToBackend(defaultSections);
  }, [saveToBackend]);

  const enabledSections = sections.filter((s) => s.enabled);
  const disabledSections = sections.filter((s) => !s.enabled);

  return {
    sections,
    enabledSections,
    disabledSections,
    isLoaded,
    isSyncing,
    toggleSection,
    reorderSections,
    resetToDefault,
    updateSections,
  };
}