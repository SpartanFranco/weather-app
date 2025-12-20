import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { HourlyCard } from './hourly-card';
import { DataGrid } from '@/components/data-grid';
import { DailySelect } from './daily-select';
import { useWeatherHourlyData } from '@/hooks';

export const HourlyForecast: React.FC<{ className?: string }> = ({
	className,
}) => {
	const hourlyData = useWeatherHourlyData();

	return (
		<Card
			className={cn(
				'relative w-full rounded-2xl shadow-md',
				'text-neutral-0 flex flex-col gap-4 bg-neutral-800 p-6 md:gap-8 md:p-8',
				className,
			)}
		>
			<CardContent className='p-0'>
				<div className='mb-4 flex items-center justify-between gap-3 tracking-wide'>
					<h3 className='text-neutral-0 text-lg font-normal'>
						Hourly Forecast
					</h3>
					<DailySelect />
				</div>

				<ScrollArea className='h-full'>
					<DataGrid
						data={hourlyData}
						direction='rows'
						renderValue={(item) => (
							<HourlyCard
								key={item.time}
								{...item}
							/>
						)}
					/>
				</ScrollArea>
			</CardContent>
		</Card>
	);
};
