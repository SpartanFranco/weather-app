import type { DailyItem } from '@/interafces/daily.interface';
import type { Hourly } from '@/interafces/hourly.interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';

export interface WeatherData {
	current: {
		temperature: number;
		weatherCode: number;
		windSpeed: number;
		windDirection: number;
		feelsLike: number;
		humidity: number;
		precipitation: number;
		uvIndex?: number;
		visibility?: number;
		pressure?: number;
	};
	hourly: Hourly[];
	daily: DailyItem[];
}

export interface LocationData {
	name: string;
	country: string;
	latitude: number;
	longitude: number;
	timezone: string;
}

interface WeatherStore {
	location: LocationData | null;
	setLocation: (location: LocationData) => void;

	weatherData: WeatherData | null;
	setWeatherData: (data: WeatherData) => void;

	temperatureUnit: TemperatureUnit;
	windSpeedUnit: WindSpeedUnit;
	precipitationUnit: PrecipitationUnit;
	setTemperatureUnit: (unit: TemperatureUnit) => void;
	setWindSpeedUnit: (unit: WindSpeedUnit) => void;
	setPrecipitationUnit: (unit: PrecipitationUnit) => void;

	selectedDay: number;
	setSelectedDay: (day: number) => void;

	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;

	error: string | null;
	setError: (error: string | null) => void;

	hasRequestedGeolocation: boolean;
	setHasRequestedGeolocation: (value: boolean) => void;
}

export const useWeatherStore = create<WeatherStore>()(
	persist(
		(set) => ({
			location: null,
			setLocation: (location) => set({ location }),

			weatherData: null,
			setWeatherData: (data) => set({ weatherData: data }),

			temperatureUnit: 'celsius',
			windSpeedUnit: 'kmh',
			precipitationUnit: 'mm',
			setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
			setWindSpeedUnit: (unit) => set({ windSpeedUnit: unit }),
			setPrecipitationUnit: (unit) => set({ precipitationUnit: unit }),

			selectedDay: 0,
			setSelectedDay: (day) => set({ selectedDay: day }),

			isLoading: false,
			setIsLoading: (loading) => set({ isLoading: loading }),

			error: null,
			setError: (error) => set({ error }),

			hasRequestedGeolocation: false,
			setHasRequestedGeolocation: (value) =>
				set({ hasRequestedGeolocation: value }),
		}),
		{
			name: 'weather-storage',
			partialize: (state) => ({
				location: state.location,
				temperatureUnit: state.temperatureUnit,
				windSpeedUnit: state.windSpeedUnit,
				precipitationUnit: state.precipitationUnit,
				hasRequestedGeolocation: state.hasRequestedGeolocation,
			}),
		},
	),
);
