import { mockTowers } from "./mockData";
import type { CellTower } from "../types";

// Simulated delay time in milliseconds (2 seconds)
const DELAY_TIME = 2000;

// Simulated error rate (20% chance of error)
const ERROR_RATE = 0.2;

/**
 * Fetches tower data with a simulated delay and potential error
 * @returns Promise that resolves to tower data or rejects with an error
 */
export const fetchTowerData = (): Promise<CellTower[]> => {
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
};
