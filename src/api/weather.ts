import type { WeatherApiResponse } from '@/interafces/weather.interface';

export async function fetchWeatherData(
	latitude: number,
	longitude: number,
	temperatureUnit: 'celsius' | 'fahrenheit' = 'celsius',
	windSpeedUnit: 'kmh' | 'mph' = 'kmh',
	precipitationUnit: 'mm' | 'inch' = 'mm',
): Promise<WeatherApiResponse> {
	const params = new URLSearchParams({
		latitude: latitude.toString(),
		longitude: longitude.toString(),
		current: [
			'temperature_2m',
			'relative_humidity_2m',
			'apparent_temperature',
			'precipitation',
			'weather_code',
			'wind_speed_10m',
			'wind_direction_10m',
			'uv_index',
			'visibility',
			'surface_pressure',
		].join(','),
		hourly: ['temperature_2m', 'weather_code', 'precipitation'].join(','),
		daily: [
			'weather_code',
			'temperature_2m_max',
			'temperature_2m_min',
			'sunrise',
			'sunset',
			'uv_index_max',
		].join(','),
		temperature_unit: temperatureUnit,
		wind_speed_unit: windSpeedUnit,
		precipitation_unit: precipitationUnit,
		timezone: 'auto',
		forecast_days: '7',
	});

	const url = `https://api.open-meteo.com/v1/forecast?${params}`;

	const res = await fetch(url);

	if (!res.ok) throw new Error('Error al obtener datos meteorológicos');

	return await res.json();
}

/**
 * Mapea el código meteorológico de Open-Meteo a un nombre de ícono
 */
export function getWeatherIcon(code: number): string {
	// Códigos WMO Weather interpretation codes (WW)
	// 0: Clear sky
	// 1, 2, 3: Mainly clear, partly cloudy, and overcast
	// 45, 48: Fog
	// 51, 53, 55: Drizzle
	// 61, 63, 65: Rain
	// 71, 73, 75, 77: Snow
	// 80, 81, 82: Rain showers
	// 85, 86: Snow showers
	// 95, 96, 99: Thunderstorm

	if (code === 0) return 'sunny';
	if (code >= 1 && code <= 3) return 'partly-cloudy';
	if (code >= 45 && code <= 48) return 'fog';
	if ((code >= 51 && code <= 55) || (code >= 80 && code <= 82)) return 'rain';
	if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
	if (code >= 95) return 'storm';
	if (code >= 61 && code <= 65) return 'rain';

	return 'overcast';
}

/**
 * Obtiene datos meteorológicos por coordenadas y devuelve en formato WeatherData
 */
export async function getWeatherByCoordinates(
	latitude: number,
	longitude: number,
	temperatureUnit: 'celsius' | 'fahrenheit' = 'celsius',
	windSpeedUnit: 'kmh' | 'mph' = 'kmh',
	precipitationUnit: 'mm' | 'inch' = 'mm',
) {
	const data = await fetchWeatherData(
		latitude,
		longitude,
		temperatureUnit,
		windSpeedUnit,
		precipitationUnit,
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
}
