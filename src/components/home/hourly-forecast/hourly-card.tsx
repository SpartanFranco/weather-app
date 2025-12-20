import { useWeatherStore } from '@/stores/weather-store';
import { useWeather } from '@/hooks/use-weather';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HourlyCardProps {
	time: string;
	temperature: number;
	weatherCode: number;
	precipitation: number;
}

export const HourlyCard = ({
	temperature,
	time,
	weatherCode,
}: HourlyCardProps) => {
	const temperatureUnit = useWeatherStore((state) => state.temperatureUnit);
	const { getWeatherIcon } = useWeather();
	const icon = getWeatherIcon(weatherCode);
	const tempSymbol = temperatureUnit === 'celsius' ? '°C' : '°F';

	return (
		<Card
			className={cn(
				'text-neutral-0 w-full rounded-lg p-3 transition',
				'cursor-pointer bg-neutral-700 hover:bg-neutral-600',
				'flex items-center',
			)}
		>
			<CardContent className='w-full p-0'>
				<div className='flex w-full items-center justify-between'>
					<div className='flex items-center gap-3'>
						<img
							src={icon}
							className='size-8'
							alt={time}
							width={32}
							height={32}
						/>
						<span className='font-medium'>{time}</span>
					</div>
					<span className='font-medium'>
						{Math.round(temperature)}
						{tempSymbol}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
