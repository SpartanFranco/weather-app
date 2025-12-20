import { SearchBar } from '@/components/ui/search-bar/search-bar';
import { images } from '@/consts';
import {
	CardPlace,
	DailyForecast,
	HourlyForecast,
	Indicators,
} from '@/components/home';

import { useWeatherStore } from '@/stores/weather-store';
import { HomeSkeleton } from '@/components/home/skeleton';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useEffect } from 'react';
import { reverseGeocode } from '@/api/getLocations';
import { useCompareStore } from '@/stores/compare-store';

import { Plus } from 'lucide-react';
import { useWeather } from '@/hooks';
import { Title } from '@/components/title';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function HomePage() {
	const {
		location,
		weatherData,
		isLoading,
		hasRequestedGeolocation,
		setLocation,
		setHasRequestedGeolocation,
	} = useWeatherStore();

	const { addCompareLocation, compareLocations } = useCompareStore();

	useWeather();

	const {
		latitude,
		longitude,
		error: geoError,
		isLoading: geoLoading,
		requestLocation,
	} = useGeolocation();

	useEffect(() => {
		if (!hasRequestedGeolocation && !location) {
			requestLocation();
			setHasRequestedGeolocation(true);
		}
	}, [
		hasRequestedGeolocation,
		location,
		requestLocation,
		setHasRequestedGeolocation,
	]);

	useEffect(() => {
		if (latitude && longitude && !location) {
			reverseGeocode(latitude, longitude)
				.then((loc) => {
					if (loc) {
						setLocation(loc);
					}
				})
				.catch((err) => {
					console.error('Error getting location from coordinates:', err);
				});
		}
	}, [latitude, longitude, location, setLocation]);

	const dailyData = weatherData?.daily ?? [];
	const locationTitle = location
		? `${location.name}, ${location.country}`
		: 'Select a location';

	const handleAddToCompare = () => {
		if (location && compareLocations.length < 4) {
			addCompareLocation(location);
		}
	};

	const canAddToCompare =
		location &&
		compareLocations.length < 4 &&
		!compareLocations.some(
			(loc) =>
				loc.latitude === location.latitude &&
				loc.longitude === location.longitude,
		);

	return (
		<div className='animate-in fade-in-15 flex h-full w-full flex-col items-center gap-10'>
			<Title>How's the sky looking today?</Title>
			<SearchBar />

			{geoError && !location && (
				<div className='text-sm text-neutral-400'>
					{geoError}. Please search for a location manually.
				</div>
			)}

			{(isLoading || geoLoading) && <HomeSkeleton />}

			{!isLoading && weatherData && (
				<div className='relative size-full'>
					{canAddToCompare && (
						<Button
							onClick={handleAddToCompare}
							color='primary'
							className='absolute top-0 left-0 z-10 mb-4 flex items-center gap-2 md:-top-12'
						>
							<Plus size={18} />
							Add to Compare
						</Button>
					)}
					<main
						className={cn(
							'h-full w-full',
							'grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6',
							'lg:grid-cols-3 lg:grid-rows-[20rem_8rem_auto] lg:gap-8',
						)}
					>
						<CardPlace
							className='bg-violet-600 md:col-span-2 lg:col-span-2'
							title={locationTitle}
							temperature={Math.round(weatherData.current.temperature)}
							backgroundImage={images.bgTodayLarge}
						/>

						<Indicators className='md:col-span-2 lg:col-span-2 lg:row-start-2' />

						<HourlyForecast className='row-start-4 bg-neutral-800 md:col-span-2 lg:col-start-3 lg:row-[1/4]' />

						<DailyForecast
							className='md:col-span-2 lg:col-span-2 lg:row-start-3'
							dailyData={dailyData}
						/>
					</main>
				</div>
			)}

			{!isLoading && !weatherData && location && (
				<div className='text-neutral-400) text-xl'>
					No weather data available for this location
				</div>
			)}

			{!location && (
				<div className='text-neutral-400) text-xl'>
					Search for a location to see weather information
				</div>
			)}
		</div>
	);
}
