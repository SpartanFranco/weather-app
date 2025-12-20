import { useEffect, useState } from 'react';
import { useWeatherStore } from '@/stores/weather-store';

export type WeatherCondition =
	| 'clear'
	| 'cloudy'
	| 'rainy'
	| 'snowy'
	| 'stormy'
	| 'foggy';

export function useWeatherBackground(): WeatherCondition {
	const { weatherData } = useWeatherStore();
	const [condition, setCondition] = useState<WeatherCondition>('clear');

	useEffect(() => {
		if (!weatherData) return;

		const code = weatherData.current.weatherCode;

		if (code === 0) {
			setCondition('clear');
		} else if (code >= 1 && code <= 3) {
			setCondition('cloudy');
		} else if (code >= 45 && code <= 48) {
			setCondition('foggy');
		} else if (
			(code >= 51 && code <= 55) ||
			(code >= 61 && code <= 65) ||
			(code >= 80 && code <= 82)
		) {
			setCondition('rainy');
		} else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
			setCondition('snowy');
		} else if (code >= 95) {
			setCondition('stormy');
		}
	}, [weatherData]);

	return condition;
}
