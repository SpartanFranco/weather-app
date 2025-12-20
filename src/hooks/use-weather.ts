import { useQuery } from '@tanstack/react-query';
import { useWeatherStore } from '@/stores/weather-store';
import { fetchWeatherData, getWeatherIcon } from '@/api/weather';
import { images } from '@/consts';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const iconMap: Record<string, string> = {
	sunny: images.iconSunny,
	'partly-cloudy': images.iconPartyCloud,
	fog: images.iconFog,
	rain: images.iconRain,
	snow: images.iconSnow,
	storm: images.iconStorm,
	overcast: images.iconOverCast,
};

export const useWeather = () => {
	const location = useWeatherStore((state) => state.location);
	const temperatureUnit = useWeatherStore((state) => state.temperatureUnit);
	const windSpeedUnit = useWeatherStore((state) => state.windSpeedUnit);
	const precipitationUnit = useWeatherStore((state) => state.precipitationUnit);
	const setWeatherData = useWeatherStore((state) => state.setWeatherData);
	const setIsLoading = useWeatherStore((state) => state.setIsLoading);
	const setError = useWeatherStore((state) => state.setError);

	const isFirstRender = useRef(true);
	const hasNavigatedToError = useRef(false);
	const navigate = useNavigate();

	const { data, isLoading, error } = useQuery({
		queryKey: [
			'weather',
			location,
			location?.latitude,
			location?.longitude,
			temperatureUnit,
			windSpeedUnit,
			precipitationUnit,
		],
		queryFn: async () => {
			if (!location) return null;

			const data = await fetchWeatherData(
				location.latitude,
				location.longitude,
				temperatureUnit,
				windSpeedUnit,
				precipitationUnit === 'inch' ? 'mm' : precipitationUnit,
			);

			return {
				current: {
					temperature: data.current.temperature_2m,
					weatherCode: data.current.weather_code,
					windSpeed: data.current.wind_speed_10m,
					windDirection: data.current.wind_direction_10m,
					feelsLike: data.current.apparent_temperature,
					humidity: data.current.relative_humidity_2m,
					precipitation: data.current.precipitation,
					uvIndex: data.current.uv_index,
					visibility: data.current.visibility,
					pressure: data.current.surface_pressure,
				},
				hourly: data.hourly.time.map((time, index) => ({
					time: new Date(time).toLocaleTimeString('en-US', {
						hour: 'numeric',
						hour12: true,
					}),
					temperature: data.hourly.temperature_2m[index],
					weatherCode: data.hourly.weather_code[index],
					precipitation: data.hourly.precipitation[index],
				})),
				daily: data.daily.time.map((date, index) => ({
					date,
					day: new Date(date).toLocaleDateString('en-US', {
						weekday: 'long',
					}),
					weatherCode: data.daily.weather_code[index],
					minTemp: data.daily.temperature_2m_min[index],
					maxTemp: data.daily.temperature_2m_max[index],
					sunrise: data.daily.sunrise[index],
					sunset: data.daily.sunset[index],
					uvIndexMax: data.daily.uv_index_max[index],
				})),
			};
		},
		enabled: !!location,
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 10 * 60 * 1000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	useEffect(() => {
		setIsLoading(isLoading);
	}, [isLoading]);

	useEffect(() => {
		if (data) {
			setWeatherData(data);
			isFirstRender.current = false;
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			setError(error.message);
			// Redirigir a la ruta de error ante fallos de conexión o 5xx
			if (!hasNavigatedToError.current && location) {
				hasNavigatedToError.current = true;
				navigate('/error');
			}
		} else if (!isLoading && !data && location) {
			setError(null);
		}
	}, [error, isLoading, data, location]);

	return { getWeatherIcon: (code: number) => iconMap[getWeatherIcon(code)] };
};
