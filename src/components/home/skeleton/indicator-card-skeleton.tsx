import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	title: string;
	value: React.ReactNode;
}

export const IndicatorCardSkeleton = ({ title, value }: Props) => {
	return (
		<Card
			className={cn(
				'flex w-full flex-col items-start justify-between p-4 shadow-md',
				'text-neutral-0 bg-neutral-700 hover:bg-neutral-700',
			)}
		>
			<span className='text-md tracking-wide'>{title}</span>
			{value}
		</Card>
	);
};
