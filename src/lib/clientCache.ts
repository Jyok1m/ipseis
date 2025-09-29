// Hook personnalisé pour la gestion du cache côté client
import { useState, useEffect } from "react";

interface CacheItem<T> {
	data: T;
	timestamp: number;
	ttl: number; // Time to live en millisecondes
}

class ClientCache {
	private cache = new Map<string, CacheItem<any>>();

	set<T>(key: string, data: T, ttl: number = 300000): void {
		// TTL par défaut : 5 minutes
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl,
		});
	}

	get<T>(key: string): T | null {
		const item = this.cache.get(key);
		if (!item) return null;

		// Vérifier si l'élément a expiré
		if (Date.now() - item.timestamp > item.ttl) {
			this.cache.delete(key);
			return null;
		}

		return item.data;
	}

	clear(): void {
		this.cache.clear();
	}

	delete(key: string): boolean {
		return this.cache.delete(key);
	}

	// Nettoyer les éléments expirés
	cleanup(): void {
		const now = Date.now();
		this.cache.forEach((item, key) => {
			if (now - item.timestamp > item.ttl) {
				this.cache.delete(key);
			}
		});
	}
}

// Instance globale du cache
export const clientCache = new ClientCache();

// Hook pour utiliser le cache côté client
export function useClientCache<T>(
	key: string,
	fetcher: () => Promise<T>,
	ttl: number = 300000 // 5 minutes par défaut
) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchData() {
			// Vérifier le cache d'abord
			const cached = clientCache.get<T>(key);
			if (cached) {
				setData(cached);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const result = await fetcher();
				clientCache.set(key, result, ttl);
				setData(result);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Unknown error"));
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [key, ttl]);

	// Fonction pour forcer un refresh
	const refresh = async () => {
		clientCache.delete(key);
		setLoading(true);
		setError(null);

		try {
			const result = await fetcher();
			clientCache.set(key, result, ttl);
			setData(result);
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Unknown error"));
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, refresh };
}

// Nettoyer le cache régulièrement (toutes les 10 minutes)
if (typeof window !== "undefined") {
	setInterval(() => {
		clientCache.cleanup();
	}, 600000);
}
