import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

export const CardPlaceSkeleton: React.FC<
	React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
	const dots = Array.from({ length: 3 });

	return (
		<Card
			className={cn(
				'flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-9',
				'text-neutral-0 bg-neutral-700 shadow-md',
				className,
			)}
		>
			<div className='flex items-center gap-2'>
				{dots.map((_, index) => (
					<span
						key={index}
						className='h-3 w-3 animate-bounce rounded-full bg-white'
						style={{ animationDelay: `${index * 0.15}s` }}
					/>
				))}
			</div>
			<p className='text-sm font-medium tracking-widest uppercase'>
				Loading...
			</p>
		</Card>
	);
};
