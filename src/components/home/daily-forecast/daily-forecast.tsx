import React from 'react';
import { DataGrid } from '../../data-grid';
import { DailyCard } from './daily-card';
import { useIsMobile } from '@/hooks/use-mobile';
import type { DailyItem } from '@/interafces/daily.interface';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
	dailyData: DailyItem[];
}
export const DailyForecast: React.FC<Props> = ({ className, dailyData }) => {
	const isMobile = useIsMobile();

	return (
		<div className={cn('flex flex-col justify-end', className)}>
			<h2 className='mb-4 text-lg font-normal'>Daily forecast</h2>
			<DataGrid
				columns={isMobile ? 3 : 7}
				data={dailyData}
				renderValue={(item) => (
					<DailyCard
						key={item.day}
						{...item}
					/>
				)}
			/>
		</div>
	);
};
