import { useEffect, useMemo, useState } from 'react';
import { DataGrid } from '../../data-grid';
import { IndicatorCard } from './indicator-card';
import { useIsMobile } from '@/hooks/use-mobile';

import { useWeatherIndicators } from '@/hooks';
import { cn } from '@/lib/utils';

interface IndicatorsProps {
	className?: string;
}

const PAGE_SIZE = 4;

export const Indicators: React.FC<IndicatorsProps> = ({ className }) => {
	const indicators = useWeatherIndicators();
	const isMobile = useIsMobile();
	const [page, setPage] = useState(0);
	const totalPages = Math.max(1, Math.ceil(indicators.length / PAGE_SIZE));

	useEffect(() => {
		setPage((prev) => (prev >= totalPages ? 0 : prev));
	}, [totalPages]);

	const visibleIndicators = useMemo(
		() => indicators.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
		[page, indicators],
	);

	const showControls = indicators.length > PAGE_SIZE;
	const canGoPrev = page > 0;
	const canGoNext = page < totalPages - 1;

	return (
		<div className={cn('h-full', className)}>
			<DataGrid
				data={visibleIndicators}
				columns={isMobile ? 2 : 4}
				renderValue={(indicator) => (
					<IndicatorCard
						key={indicator.title}
						{...indicator}
						className='min-h-32'
					/>
				)}
				className={cn('gap-6', className)}
			/>
			{showControls && (
				<div className='flex items-center justify-end gap-3 text-sm'>
					<button
						type='button'
						className='border-foreground/20 rounded-full border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40'
						onClick={() =>
							canGoPrev && setPage((prev) => Math.max(prev - 1, 0))
						}
						disabled={!canGoPrev}
						aria-label='Ver indicadores anteriores'
					>
						Prev
					</button>
					<span>
						{page + 1} / {totalPages}
					</span>
					<button
						type='button'
						className='border-foreground/20 rounded-full border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40'
						onClick={() =>
							canGoNext && setPage((prev) => Math.min(prev + 1, totalPages - 1))
						}
						disabled={!canGoNext}
						aria-label='Ver siguientes indicadores'
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};
