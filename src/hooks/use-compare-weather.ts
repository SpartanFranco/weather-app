import { useQueries } from '@tanstack/react-query';
import { getWeatherByCoordinates } from '@/api/weather';
import type { WeatherData } from '@/stores/weather-store';
import { useWeatherStore } from '@/stores/weather-store';

interface Location {
	name: string;
	country: string;
	latitude: number;
	longitude: number;
	timezone: string;
}

interface CompareWeatherData {
	location: {
		name: string;
		country: string;
		latitude: number;
		longitude: number;
	};
	weather: WeatherData | null;
	isLoading: boolean;
	error: Error | null;
}

export function useCompareWeather(locations: Location[]): CompareWeatherData[] {
	const { temperatureUnit, windSpeedUnit, precipitationUnit } =
		useWeatherStore();

	const queries = useQueries({
		queries: locations.map((location) => ({
			queryKey: [
				'compare-weather',
				location.latitude,
				location.longitude,
				temperatureUnit,
				windSpeedUnit,
				precipitationUnit,
			],
			queryFn: () =>
				getWeatherByCoordinates(
					location.latitude,
					location.longitude,
					temperatureUnit,
					windSpeedUnit,
					precipitationUnit,
				),
			staleTime: 5 * 60 * 1000,
			enabled: true,
		})),
	});

	return queries.map((query, index) => {
		const location = locations[index];

		return {
			location: {
				name: location.name,
				country: location.country,
				latitude: location.latitude,
				longitude: location.longitude,
			},
			weather: query.data ?? null,
			isLoading: query.isLoading,
			error: query.error as Error | null,
		};
	});
}
