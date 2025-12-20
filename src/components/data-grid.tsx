import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface DataGridProps<T> {
	title?: string;
	columns?: number;
	rows?: number;
	direction?: 'columns' | 'rows';
	data: T[];
	className?: string;
	renderValue: (item: T, indx: number, array: T[]) => ReactNode;
}

export function DataGrid<T>({
	columns = 2,
	rows = 2,
	direction = 'columns',
	data,
	className,
	renderValue,
}: DataGridProps<T>) {
	const isColumnMode = direction === 'columns';

	return (
		<div
			className={cn(
				'grid gap-4',
				isColumnMode && {
					[`grid-cols-1 sm:grid-cols-${columns}`]: columns <= 4,
				},
				className,
			)}
			style={
				isColumnMode
					? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
					: { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }
			}
		>
			{data.map(renderValue)}
		</div>
	);
}
