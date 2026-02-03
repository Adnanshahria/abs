/**
 * Client-side caching utility for reducing database reads.
 * Uses localStorage to cache API responses with TTL.
 * 
 * This helps reduce Turso DB read/write limits when hosting on
 * Cloudflare Pages or Vercel.
 */

interface CacheItem<T> {
    data: T;
    timestamp: number;
    ttl: number; // Time to live in milliseconds
}

const CACHE_PREFIX = 'amar_ballot_cache_';

/**
 * Get item from cache
 */
export function getFromCache<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(CACHE_PREFIX + key);
        if (!item) return null;

        const cached: CacheItem<T> = JSON.parse(item);
        const now = Date.now();

        // Check if cache has expired
        if (now - cached.timestamp > cached.ttl) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }

        return cached.data;
    } catch {
        return null;
    }
}

/**
 * Set item in cache
 * @param key Cache key
 * @param data Data to cache
 * @param ttlMinutes Time to live in minutes (default: 5 minutes)
 */
export function setInCache<T>(key: string, data: T, ttlMinutes: number = 5): void {
    try {
        const item: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            ttl: ttlMinutes * 60 * 1000
        };
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    } catch (error) {
        // localStorage might be full or unavailable
        console.warn('Cache write failed:', error);
    }
}

/**
 * Clear specific cache key
 */
export function clearCache(key: string): void {
    localStorage.removeItem(CACHE_PREFIX + key);
}

/**
 * Clear all cached items
 */
export function clearAllCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
            localStorage.removeItem(key);
        }
    });
}

/**
 * Cache-aware fetch wrapper
 * First checks cache, then fetches from source if needed
 */
export async function cachedFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlMinutes: number = 5
): Promise<T> {
    // Check cache first
    const cached = getFromCache<T>(key);
    if (cached !== null) {
        return cached;
    }

    // Fetch from source
    const data = await fetchFn();

    // Cache the result
    setInCache(key, data, ttlMinutes);

    return data;
}

// Preset cache keys for common data
export const CACHE_KEYS = {
    CANDIDATES: 'candidates',
    VOTE_CENTERS: 'vote_centers',
    PAGE_CONTENT: 'page_content',
    BRANDING: 'branding',
    PAST_ELECTIONS: 'past_elections',
    UPDATES: 'updates',
    RUMORS: 'rumors',
} as const;

// Cache TTL presets (in minutes)
export const CACHE_TTL = {
    SHORT: 2,      // 2 minutes - for frequently changing data
    MEDIUM: 10,    // 10 minutes - for moderately static data
    LONG: 60,      // 1 hour - for rarely changing data
    VERY_LONG: 1440, // 24 hours - for static content
} as const;
