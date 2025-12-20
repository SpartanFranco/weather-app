/**
 * Busca ubicaciones que coincidan con un nombre dado usando la API de geocoding de Open-Meteo.
 * @param query Nombre de la ciudad o localidad a buscar
 * @param limit Número máximo de resultados a devolver (por defecto 5)
 * @returns Array de resultados con { name, country, latitude, longitude, timezone }
 */

import type { Country, Location } from '@/interafces/location.interface';

export type { Location };

export async function searchLocations(
	query: string,
	limit: number = 5,
): Promise<Location[]> {
	if (!query) return [];

	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${limit}`;

	const res = await fetch(url);
	if (!res.ok) throw new Error('Error al buscar localidades');

	const data: { results: Country[] } = await res.json();
	if (!data.results) return [];

	const seenNames = new Set<string>();
	const uniqueLocations: Location[] = [];

	for (const loc of data.results) {
		const normalizedName = loc.name.trim().toLowerCase();
		if (seenNames.has(normalizedName)) continue;
		seenNames.add(normalizedName);

		uniqueLocations.push({
			name: loc.name,
			country: loc.country,
			latitude: loc.latitude,
			longitude: loc.longitude,
			timezone: loc.timezone,
		});

		if (uniqueLocations.length >= limit) break;
	}

	return uniqueLocations;
}

/**
 * Obtiene información de ubicación usando coordenadas geográficas (geocoding inverso)
 * @param latitude Latitud
 * @param longitude Longitud
 * @returns Información de la ubicación más cercana
 */
export async function reverseGeocode(
	latitude: number,
	longitude: number,
): Promise<Location | null> {
	const url = `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1`;

	const res = await fetch(url);
	if (!res.ok) throw new Error('Error al obtener ubicación por coordenadas');

	const data: { results: Country[] } = await res.json();
	if (!data.results || data.results.length === 0) return null;

	const loc = data.results[0];
	return {
		name: loc.name,
		country: loc.country,
		latitude: loc.latitude,
		longitude: loc.longitude,
		timezone: loc.timezone,
	};
}
