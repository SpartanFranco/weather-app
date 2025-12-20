import { Card, CardContent } from '@/components/ui/card';
import { useWeatherStore } from '@/stores/weather-store';
import { useWeather } from '@/hooks/use-weather';
import type { DailyItem } from '@/interafces/daily.interface';
import { cn } from '@/lib/utils';

export const DailyCard = ({
	day,
	weatherCode,
	maxTemp,
	minTemp,
	className,
}: DailyItem & { className?: string }) => {
	const { temperatureUnit } = useWeatherStore();
	const { getWeatherIcon } = useWeather();
	const icon = getWeatherIcon(weatherCode);
	const tempSymbol = temperatureUnit === 'celsius' ? '°C' : '°F';

	return (
		<Card
			className={cn(
				'flex cursor-pointer flex-col items-center justify-between rounded-2xl p-4 shadow-md',
				'text-neutral-0 bg-neutral-700 transition-colors duration-200 hover:bg-neutral-600',
				'border-0',
				className,
			)}
		>
			<CardContent className='flex w-full flex-col items-center justify-between space-y-3 p-0'>
				<span className='font-medium'>{day.substring(0, 3)}</span>

				<div className='my-2'>
					<img
						src={icon}
						alt={day}
						width={56}
						height={56}
						className='h-14 w-14 object-contain'
					/>
				</div>

				<div className='flex w-full justify-between text-sm'>
					<span className='text-neutral-200'>
						{Math.round(minTemp)}
						<span className='text-xs'>{tempSymbol}</span>
					</span>
					<span className='font-medium text-orange-500'>
						{Math.round(maxTemp)}
						<span className='text-xs'>{tempSymbol}</span>
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
