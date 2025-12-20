import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { DataGrid } from '@/components/data-grid';

export const HourlyForecastSkeleton: React.FC<
	React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
	return (
		<Card
			className={cn(
				'relative w-full rounded-2xl shadow-md',
				'text-neutral-0 flex flex-col bg-neutral-700 p-8',
				className,
			)}
		>
			<div className='mb-4 flex items-center justify-between gap-3 tracking-wide'>
				<div>
					<h3 className='text-neutral-0 text-2xl font-normal'>
						Hourly Forecast
					</h3>
				</div>
				<Button
					className='text-neutral-0 rounded-md bg-neutral-600'
					variant='ghost'
					size='icon'
				>
					<ChevronDown className='size-4' />
				</Button>
			</div>

			<DataGrid
				data={Array.from({ length: 8 })}
				direction='rows'
				renderValue={(_, index) => (
					<Card
						className='h-14 w-full bg-neutral-800'
						key={index + '-hourly-forecast-skeleton'}
					/>
				)}
			/>
		</Card>
	);
};
