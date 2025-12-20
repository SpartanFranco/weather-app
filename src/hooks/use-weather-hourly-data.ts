import { useWeatherStore } from '@/stores/weather-store';
import { useMemo } from 'react';

export function useWeatherHourlyData() {
	const { weatherData, selectedDay } = useWeatherStore();

	return useMemo(() => {
		if (!weatherData) return [];
		const startIndex = selectedDay * 24;
		return weatherData.hourly.slice(startIndex, startIndex + 8);
	}, [weatherData, selectedDay]);
}
