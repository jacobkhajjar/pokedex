export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(number: number) {
        this.#interval = number;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, {createdAt: Date.now(), val: val});
    }

    get<T>(key: string): T | undefined {
        if (this.#cache.has(key)) {
            return this.#cache.get(key)?.val;
        }
        return undefined;
    }

    #reap() {
        for (const [url, cache] of this.#cache) {
            if (cache.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(url);
            }
        }
    }
        
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}