import { forwardRef, useEffect, useRef } from 'react';
import { Spinner } from '../spinner';
import { cn } from '@/lib/utils'; // Asegúrate de importar cn
import { ScrollArea } from '../scroll-area';
import type { Location } from '@/interafces/location.interface';

interface SuggestionsListProps {
	id?: string;
	isFetching: boolean;
	data?: Location[];
	query: string;
	showSuggestions: boolean;
	onSelect: (location: Location) => void;
	activeIndex?: number;
}

export const SuggestionsList = forwardRef<
	HTMLUListElement,
	SuggestionsListProps
>(
	(
		{
			id,
			isFetching,
			data,
			query,
			showSuggestions,
			onSelect,
			activeIndex = -1,
		},
		ref,
	) => {
		const activeItemRef = useRef<HTMLLIElement>(null);

		console.log(data);

		useEffect(() => {
			if (activeItemRef.current && activeIndex >= 0) {
				activeItemRef.current.scrollIntoView({
					block: 'nearest',
					behavior: 'smooth',
				});
			}
		}, [activeIndex]);

		if (
			(!isFetching && (!data || data.length === 0) && !query) ||
			!showSuggestions
		)
			return null;

		return (
			<div
				className='absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-lg border border-neutral-600 bg-neutral-700 shadow-lg'
				role='listbox'
				id={id}
				aria-label='Search suggestions'
			>
				{isFetching && (
					<div
						className='flex items-center justify-center gap-2 py-4 text-(--neutral-0)'
						role='status'
					>
						<Spinner color='primary' />
						<span>Searching in progress...</span>
					</div>
				)}

				{!isFetching && data && data.length > 0 && (
					<ScrollArea className='max-h-60'>
						<ul
							className='p-2'
							ref={ref}
						>
							{data.map((location, index) => (
								<li
									id={`suggestion-${index}`}
									key={`${location.latitude}-${location.longitude}`}
									ref={index === activeIndex ? activeItemRef : null}
									onMouseDown={() => onSelect(location)}
									onMouseEnter={() => {}}
									role='option'
									aria-selected={index === activeIndex}
									className={cn(
										'text-neutral-0 cursor-pointer rounded-lg px-4 py-3 transition-colors',
										index === activeIndex
											? 'bg-neutral-600'
											: 'hover:bg-neutral-600',
									)}
								>
									<div className='font-medium'>{location.name}</div>
									<div className='text-xs text-neutral-300'>
										{location.country}
									</div>
								</li>
							))}
						</ul>
					</ScrollArea>
				)}

				{!isFetching && query && data?.length === 0 && (
					<div
						className='py-3 text-center text-neutral-200'
						role='alert'
					>
						No results found
					</div>
				)}
			</div>
		);
	},
);

SuggestionsList.displayName = 'SuggestionsList';
