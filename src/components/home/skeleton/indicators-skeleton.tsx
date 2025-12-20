import { DataGrid } from '../../data-grid';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { IndicatorCardSkeleton } from './indicator-card-skeleton';
import { Minus } from 'lucide-react';

interface IndicatorsSkeletonProps {
	className?: string;
}

export const IndicatorsSkeleton: React.FC<IndicatorsSkeletonProps> = ({
	className,
}) => {
	const isMobile = useIsMobile();
	const skeletonData = [
		{
			title: 'Feels like',
			value: <Minus className='size-2 md:size-6' />,
		},
		{
			title: 'Humidity',
			value: <Minus className='size-2 md:size-6' />,
		},
		{
			title: 'Wind',
			value: <Minus className='size-2 md:size-6' />,
		},
		{ title: 'Precipitation', value: <Minus className='size-2 md:size-6' /> },
	];

	return (
		<DataGrid
			data={skeletonData}
			columns={isMobile ? 2 : 4}
			renderValue={(item) => (
				<IndicatorCardSkeleton
					key={item.title}
					{...item}
				/>
			)}
			className={cn('gap-6', className)}
		/>
	);
};
