import { Card } from '@/components/ui/card';
import type { Indicator } from '@/interafces/indicator.interface';
import { cn } from '@/lib/utils';

export const IndicatorCard = ({ title, value, className }: Indicator) => {
	const displayValue = value ?? '-';
	return (
		<Card
			className={cn(
				'flex w-full flex-col items-start justify-between p-4 shadow-md',
				'text-neutral-0 bg-neutral-700 hover:bg-neutral-700',
				className,
			)}
		>
			<span className='text-md tracking-wide'>{title}</span>
			<span className='mt-2 text-3xl font-light'>{displayValue}</span>
		</Card>
	);
};
