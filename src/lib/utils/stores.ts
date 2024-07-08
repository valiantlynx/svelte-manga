// stores.js
import { writable } from 'svelte/store';

// Current page
export const currentPage = writable(1);

// Search query
export const searchQuery = writable('');

// Meta keywords
export const metaKeywords = writable('');

// Log initialization
const log: any[] = [
    { log: 'log', time: new Date(), progress: 0, total: 0 }
];

// Reading progress
export const addedReadingProgress = writable(log);
