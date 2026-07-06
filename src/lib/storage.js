import { STORAGE_KEY } from "./constants";

// localStorage persistence for Step 1. Isolated here so Step 2 can drop it
// cleanly once tweets live on the server.

export function loadTweets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTweets(tweets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tweets));
  } catch {
    // Ignore write errors (e.g. storage full or unavailable).
  }
}
