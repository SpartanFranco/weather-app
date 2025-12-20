import { CardPlaceSkeleton } from './card-place-skeleton';
import { IndicatorsSkeleton } from './indicators-skeleton';
import { HourlyForecastSkeleton } from './hourly-forecast-skeleton';
import { DailyForecastSkeleton } from './daily-forecast-skeleton';
import { cn } from '@/lib/utils';

export const HomeSkeleton = () => {
	return (
		<main
			className={cn(
				'h-full w-full auto-rows-auto',
				'grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6',
				'lg:grid-cols-3 lg:grid-rows-[20rem_8rem_12rem] lg:gap-8',
			)}
		>
			<CardPlaceSkeleton className='md:col-span-2 lg:col-span-2' />

			<IndicatorsSkeleton className='md:col-span-2 lg:col-span-2 lg:row-start-2' />

			<HourlyForecastSkeleton className='row-start-4 md:col-span-2 lg:col-start-3 lg:row-[1/4]' />

			<DailyForecastSkeleton className='md:col-span-2 lg:col-span-2' />
		</main>
	);
};
