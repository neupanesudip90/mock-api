// hooks/useSavedApiKeys.ts
"use client";

import { useState, useEffect, useCallback } from "react";

interface SavedApiKey {
  keyId: string;
  name: string;
  fullKey: string;
  savedAt: string;
}

const STORAGE_KEY = "mockapi_saved_keys";

export function useSavedApiKeys(projectId: string) {
  const [savedKeys, setSavedKeys] = useState<SavedApiKey[]>([]);

  // Load saved keys from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${projectId}`);
      if (stored) {
        setSavedKeys(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load saved keys:", error);
    }
  }, [projectId]);

  // Save a key
  const saveKey = useCallback(
    (keyId: string, name: string, fullKey: string) => {
      const newKey: SavedApiKey = {
        keyId,
        name,
        fullKey,
        savedAt: new Date().toISOString(),
      };

      setSavedKeys((prev) => {
        // Replace if exists, otherwise add
        const filtered = prev.filter((k) => k.keyId !== keyId);
        const updated = [...filtered, newKey];

        // Persist to localStorage
        try {
          localStorage.setItem(
            `${STORAGE_KEY}_${projectId}`,
            JSON.stringify(updated),
          );
        } catch (error) {
          console.error("Failed to save key:", error);
        }

        return updated;
      });
    },
    [projectId],
  );

  // Remove a saved key
  const removeKey = useCallback(
    (keyId: string) => {
      setSavedKeys((prev) => {
        const updated = prev.filter((k) => k.keyId !== keyId);

        try {
          localStorage.setItem(
            `${STORAGE_KEY}_${projectId}`,
            JSON.stringify(updated),
          );
        } catch (error) {
          console.error("Failed to remove key:", error);
        }

        return updated;
      });
    },
    [projectId],
  );

  // Get full key by keyId
  const getFullKey = useCallback(
    (keyId: string): string | null => {
      const found = savedKeys.find((k) => k.keyId === keyId);
      return found?.fullKey ?? null;
    },
    [savedKeys],
  );

  // Check if key is saved
  const isKeySaved = useCallback(
    (keyId: string): boolean => {
      return savedKeys.some((k) => k.keyId === keyId);
    },
    [savedKeys],
  );

  // Clear all saved keys for this project
  const clearAllKeys = useCallback(() => {
    setSavedKeys([]);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_${projectId}`);
    } catch (error) {
      console.error("Failed to clear keys:", error);
    }
  }, [projectId]);

  return {
    savedKeys,
    saveKey,
    removeKey,
    getFullKey,
    isKeySaved,
    clearAllKeys,
  };
}
