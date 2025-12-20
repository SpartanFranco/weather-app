import { Search, Mic, MicOff } from 'lucide-react';
import { useSearch } from '@/hooks/use-search';
import { useLocations } from '@/hooks/use-locations';
import { useWeatherStore } from '@/stores/weather-store';
import { useState, useRef, useEffect } from 'react';
import { useVoiceSearch } from '@/hooks/use-voice-search';
import { Input } from '../input';
import { Button } from '../button';
import { SuggestionsList } from './sugestions-list';

interface SearchBarProps {
	onSelect?: (location: string) => void;
	placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = 'Search for a city...',
}) => {
	const {
		query,
		debounceQuery,
		handleChange,
		handleSelect,
		hanldeFocus,
		showSuggestions,
		setShowSuggestions,
	} = useSearch();

	const searchQuery = useLocations(query);
	const isLoading = useWeatherStore((state) => state.isLoading);

	const {
		isListening,
		transcript,
		isSupported: voiceSupported,
		startListening,
		stopListening,
		clearTranscript,
	} = useVoiceSearch();

	const [activeIndex, setActiveIndex] = useState(-1);
	const suggestionsRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		setActiveIndex(-1);
	}, [searchQuery.data]);

	useEffect(() => {
		if (transcript) {
			handleChange({
				target: { value: transcript },
			} as React.ChangeEvent<HTMLInputElement>);
			clearTranscript();
		}
	}, [transcript, handleChange, clearTranscript]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!searchQuery.data || searchQuery.data.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setActiveIndex((prev) =>
					prev < searchQuery.data.length - 1 ? prev + 1 : prev,
				);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
				break;
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0 && searchQuery.data[activeIndex]) {
					handleSelect(searchQuery.data[activeIndex]);
					setShowSuggestions(false);
					setActiveIndex(-1);
				}
				break;
			case 'Escape':
				setShowSuggestions(false);
				setActiveIndex(-1);
				break;
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (activeIndex >= 0 && searchQuery.data && searchQuery.data[activeIndex]) {
			handleSelect(searchQuery.data[activeIndex]);
			setShowSuggestions(false);
			setActiveIndex(-1);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full md:max-w-152 lg:mt-4 lg:w-[42vw]'
		>
			<div className='grid w-full items-center gap-2 md:grid-cols-[1fr_5rem] md:gap-5'>
				<div className='relative w-full'>
					<div className='relative'>
						<Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-neutral-400' />
						<Input
							autoComplete='off'
							placeholder={isListening ? 'Listening...' : placeholder}
							value={query}
							onChange={handleChange}
							onFocus={hanldeFocus}
							onKeyDown={handleKeyDown}
							className='text-neutral-0 h-14 w-full rounded-md border border-neutral-600 bg-neutral-700 pr-12 pl-12 placeholder:text-lg placeholder:font-light placeholder:tracking-wide placeholder:text-neutral-400 hover:border-neutral-500'
						/>

						{voiceSupported && (
							<Button
								type='button'
								variant='ghost'
								size='sm'
								onClick={isListening ? stopListening : startListening}
								className={`absolute top-1/2 right-3 h-8 w-8 -translate-y-1/2 transform p-0 ${isListening ? 'text-red-500' : 'text-neutral-400'} `}
							>
								{isListening ? <MicOff size={20} /> : <Mic size={20} />}
							</Button>
						)}
					</div>

					<SuggestionsList
						ref={suggestionsRef}
						isFetching={searchQuery.isFetching}
						data={searchQuery.data}
						query={debounceQuery}
						showSuggestions={showSuggestions}
						onSelect={handleSelect}
						activeIndex={activeIndex}
					/>
				</div>

				<Button
					type='submit'
					variant='default'
					disabled={isLoading || !query.trim()}
					className='text-neutral-0 flex h-14 w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-6 text-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'
				>
					{isLoading ? 'Searching...' : 'Search'}
				</Button>
			</div>
		</form>
	);
};
