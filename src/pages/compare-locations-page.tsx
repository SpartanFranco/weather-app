import { X, Plus } from 'lucide-react';
import { useCompareStore } from '@/stores/compare-store';
import { useCompareWeather } from '@/hooks/use-compare-weather';
import { useWeather } from '@/hooks/use-weather';
import { useWeatherStore } from '@/stores/weather-store';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const CompareLocationsPage = () => {
	const { compareLocations, removeCompareLocation, clearCompareLocations } =
		useCompareStore();
	const { temperatureUnit } = useWeatherStore();
	const { getWeatherIcon } = useWeather();
	const compareData = useCompareWeather(compareLocations);
	const navigate = useNavigate();

	const tempSymbol = temperatureUnit === 'celsius' ? '°C' : '°F';

	if (compareLocations.length === 0) {
		return (
			<div className='animate-in fade-in-35 flex min-h-[40vh] flex-col items-center justify-center gap-4'>
				<Plus className='size-16 text-neutral-500' />
				<p className='text-xl text-neutral-400'>
					Add locations to compare weather
				</p>
				<Button
					onClick={() => navigate('/')}
					variant='orange'
					className='text-neutral-0 text-md'
				>
					Back to main view
				</Button>
			</div>
		);
	}

	return (
		<div className='animate-in fade-in-15 w-full'>
			<div className='mb-6 flex items-center justify-between'>
				<h2 className='text-neutral-0 text-3xl font-bold'>
					Compare Locations ({compareLocations.length}/4)
				</h2>
				<div className='flex gap-2'>
					<Button
						onClick={clearCompareLocations}
						color='danger'
						variant='secondary'
						className='text-md text-red-500'
					>
						Clear All
					</Button>
					<Button
						onClick={() => navigate('/')}
						variant='outline'
						className='text-neutral-0 text-md'
					>
						Back
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
				{compareData.map((data, index) => {
					const weatherCode = data.weather?.current.weatherCode || 0;
					const weatherIcon = getWeatherIcon(weatherCode);

					return (
						<Card
							key={compareLocations[index].id}
							className='relative bg-neutral-800 p-6'
						>
							<Button
								size='icon'
								variant='default'
								onClick={() =>
									removeCompareLocation(compareLocations[index].id)
								}
								className='absolute top-2 right-2 text-neutral-400 hover:text-red-500'
							>
								<X className='size-4' />
							</Button>

							<div className='mb-4'>
								<h3 className='text-neutral-0 text-xl font-bold'>
									{data.location.name}
								</h3>
								<p className='text-sm text-neutral-400'>
									{data.location.country}
								</p>
							</div>

							{data.isLoading && (
								<div className='flex h-40 items-center justify-center'>
									<p className='text-neutral-400'>Loading...</p>
								</div>
							)}

							{data.error && (
								<div className='flex h-40 items-center justify-center'>
									<p className='text-red-400'>Error loading weather</p>
								</div>
							)}

							{data.weather && (
								<div className='space-y-4'>
									<div className='flex items-center justify-center'>
										<img
											src={weatherIcon}
											className='size-20'
											alt='Weather icon'
										/>
										<p className='text-neutral-0 text-4xl font-bold'>
											{Math.round(data.weather.current.temperature)}
											{tempSymbol}
										</p>
									</div>

									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-neutral-400'>Feels like:</span>
											<span className='text-neutral-0'>
												{Math.round(data.weather.current.feelsLike)}
												{tempSymbol}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-neutral-400'>Humidity:</span>
											<span className='text-neutral-0'>
												{Math.round(data.weather.current.humidity)}%
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-neutral-400'>Wind:</span>
											<span className='text-neutral-0'>
												{Math.round(data.weather.current.windSpeed)} km/h
											</span>
										</div>
									</div>
								</div>
							)}
						</Card>
					);
				})}
			</div>
		</div>
	);
};
