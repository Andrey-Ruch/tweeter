import { STORAGE_KEY } from "./constants";

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
    console.error("Failed to save tweets to localStorage");
  }
}
