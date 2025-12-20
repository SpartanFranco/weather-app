import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';
import { useWeatherStore } from '@/stores/weather-store';
import { useWeather } from '@/hooks/use-weather';
import { Star } from 'lucide-react';
import { useFavoritesStore } from '@/stores/favorites-store';
import { isFavorite } from '@/utils/favorites';

interface CardPlaceProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle?: string;
	temperature: number;
	backgroundImage?: string;
}

export const CardPlace: React.FC<CardPlaceProps> = ({
	title,
	temperature,
	backgroundImage,
	className,
}) => {
	const { temperatureUnit, weatherData, location } = useWeatherStore();
	const { getWeatherIcon } = useWeather();
	const { favorites, toggleFavorite } = useFavoritesStore();

	const weatherCode = weatherData?.current.weatherCode || 0;
	const weatherIcon = getWeatherIcon(weatherCode);
	const tempSymbol = temperatureUnit === 'celsius' ? '°' : '°F';
	const currentDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		year: 'numeric',
	});

	const handleToggleFavorite = () => {
		if (location) {
			toggleFavorite(location);
		}
	};

	const isLocationFavorite = React.useMemo(() => {
		if (!location) return false;
		return isFavorite(favorites, location);
	}, [favorites, location]);

	return (
		<Card
			className={cn(
				'relative w-full overflow-hidden rounded-2xl text-white shadow-md',
				'flex items-center justify-between px-6',
				'bg-cover bg-center p-9',
				className,
			)}
			style={{
				backgroundImage: backgroundImage
					? `url(${backgroundImage})`
					: "url('/images/default-bg.jpg')",
			}}
		>
			<div className='absolute inset-0 bg-black/40' />

			{location && (
				<Button
					variant='ghost'
					size='icon'
					onClick={handleToggleFavorite}
					className='absolute top-4 right-4 z-20 h-12 w-12 text-white transition-transform hover:scale-110'
				>
					<Star
						className='size-6'
						fill={isLocationFavorite ? 'currentColor' : 'none'}
					/>
				</Button>
			)}

			<div
				className={cn(
					'relative z-10 flex size-full flex-col items-center justify-between text-center',
					'md:flex-row lg:items-center lg:justify-between lg:text-left',
				)}
			>
				<div>
					<h2 className='text-3xl font-bold sm:text-4xl'>{title}</h2>
					<p className='mt-1 text-lg opacity-80 sm:mt-2 sm:text-xl'>
						{currentDate}
					</p>
				</div>

				<div className='mt-4 lg:mt-0'>
					<section className='flex items-center md:gap-2'>
						<img
							src={weatherIcon}
							className='size-30 xl:size-36'
							alt='Weather icon'
						/>
						<p className='flex items-start gap-1 text-7xl font-bold italic xl:text-9xl'>
							{temperature}
							<span className='mt-1'>{tempSymbol}</span>
						</p>
					</section>
				</div>
			</div>
		</Card>
	);
};
