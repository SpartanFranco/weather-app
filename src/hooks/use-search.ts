import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useWeatherStore } from '@/stores/weather-store';
import type { Location } from '@/interafces/location.interface';

export const useSearch = () => {
	const [query, setQuery] = useState('');
	const [debounceQuery] = useDebounce(query, 600);

	const [showSuggestions, setShowSuggestions] = useState(false);
	const setLocation = useWeatherStore((state) => state.setLocation);

	const handleSelect = (location: Location) => {
		setQuery(location.name);
		setShowSuggestions(false);

		setLocation({
			name: location.name,
			country: location.country,
			latitude: location.latitude,
			longitude: location.longitude,
			timezone: location.timezone,
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setShowSuggestions(true);
	};

	const hanldeFocus = () => query && setShowSuggestions(true);

	return {
		query,
		debounceQuery,
		showSuggestions,
		setQuery,
		setShowSuggestions,
		handleSelect,
		handleChange,
		hanldeFocus,
	};
};
