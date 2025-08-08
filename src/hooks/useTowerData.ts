import { useState, useEffect, useCallback } from "react";
import { mockTowers } from "../data/mockData";
import type { CellTower } from "../types";

// Simulated delay time in milliseconds (2 seconds)
const DELAY_TIME = 2000;

// Simulated error rate (10% chance of error)
const ERROR_RATE = 0.1;

/**
 * Custom hook for managing tower data with loading, error states, and retry functionality
 */
export const useTowerData = () => {
  const [towers, setTowers] = useState<CellTower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches tower data with simulated delay and potential error
   */
  const fetchTowerData = useCallback((): Promise<CellTower[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly determine if we should simulate an error
        if (Math.random() < ERROR_RATE) {
          reject(new Error("Something went wrong while fetching tower data"));
        } else {
          resolve([...mockTowers]);
        }
      }, DELAY_TIME);
    });
  }, []);

  /**
   * Loads tower data and manages loading/error states
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTowerData();
      setTowers(data);
    } catch (err) {
      console.error("Failed to load tower data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [fetchTowerData]);

  /**
   * Retry function for manual retry attempts
   */
  const retry = useCallback(() => {
    loadData();
  }, [loadData]);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    towers,
    loading,
    error,
    retry,
    refetch: loadData,
  };
};
