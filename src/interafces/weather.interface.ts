export interface WeatherApiResponse {
	current: {
		time: string;
		temperature_2m: number;
		relative_humidity_2m: number;
		apparent_temperature: number;
		precipitation: number;
		weather_code: number;
		wind_speed_10m: number;
		wind_direction_10m: number;
		uv_index?: number;
		visibility?: number;
		surface_pressure?: number;
	};
	hourly: {
		time: string[];
		temperature_2m: number[];
		weather_code: number[];
		precipitation: number[];
	};
	daily: {
		time: string[];
		weather_code: number[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		sunrise: string[];
		sunset: string[];
		uv_index_max: number[];
	};
}
