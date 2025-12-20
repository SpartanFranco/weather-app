import { useWeatherStore } from '@/stores/weather-store';
import { useMemo } from 'react';

interface Indicator {
	title: string;
	value: string;
}

export function useWeatherIndicators(): Indicator[] {
	const { weatherData, temperatureUnit, windSpeedUnit, precipitationUnit } =
		useWeatherStore();

	return useMemo(() => {
		if (!weatherData) return [];

		const tempSymbol = temperatureUnit === 'celsius' ? '°C' : '°F';
		const windSymbol = windSpeedUnit === 'kmh' ? 'km/h' : 'mph';
		const precSymbol = precipitationUnit === 'mm' ? 'mm' : 'inch';
		const precValue =
			precipitationUnit === 'inch'
				? (weatherData.current.precipitation / 10).toFixed(1)
				: weatherData.current.precipitation.toFixed(1);

		const indicators = [
			{
				title: 'Feels like',
				value: `${Math.round(weatherData.current.feelsLike)}${tempSymbol}`,
			},
			{
				title: 'Humidity',
				value: `${Math.round(weatherData.current.humidity)}%`,
			},
			{
				title: 'Wind',
				value: `${Math.round(weatherData.current.windSpeed)} ${windSymbol}`,
			},
			{ title: 'Precipitation', value: `${precValue} ${precSymbol}` },
		];

		// Add UV Index if available
		if (weatherData.current.uvIndex !== undefined) {
			indicators.push({
				title: 'UV Index',
				value: Math.round(weatherData.current.uvIndex).toString(),
			});
		}

		// Add Visibility if available
		if (weatherData.current.visibility !== undefined) {
			const visibilityKm = (weatherData.current.visibility / 1000).toFixed(1);
			indicators.push({
				title: 'Visibility',
				value: `${visibilityKm} km`,
			});
		}

		// Add Pressure if available
		if (weatherData.current.pressure !== undefined) {
			indicators.push({
				title: 'Pressure',
				value: `${Math.round(weatherData.current.pressure)} hPa`,
			});
		}

		return indicators;
	}, [weatherData, temperatureUnit, windSpeedUnit, precipitationUnit]);
}
