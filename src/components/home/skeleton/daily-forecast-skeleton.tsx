import React from 'react';
import { cn } from '@/lib/utils';
import { DataGrid } from '../../data-grid';
import { useIsMobile } from '@/hooks/use-mobile';

interface DailyForecastSkeletonProps {
	className?: string;
}

export const DailyForecastSkeleton: React.FC<DailyForecastSkeletonProps> = ({
	className,
}) => {
	const isMobile = useIsMobile();
	const skeletonData = Array(7).fill(null);

	return (
		<div className={cn('flex flex-col justify-end', className)}>
			<h2 className='mb-4 text-lg font-normal'>Daily forecast</h2>
			<DataGrid
				columns={isMobile ? 3 : 7}
				data={skeletonData}
				renderValue={(_, index) => (
					<div
						key={index}
						className='h-38 w-full rounded-2xl bg-neutral-700'
					/>
				)}
			/>
		</div>
	);
};
