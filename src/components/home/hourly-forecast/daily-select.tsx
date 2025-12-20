import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useWeatherStore } from '@/stores/weather-store';
import { useEffect } from 'react';

export const DailySelect = () => {
	const { weatherData, selectedDay, setSelectedDay } = useWeatherStore();

	const dailyOptions = weatherData?.daily ?? [];

	const formattedOptions = dailyOptions.map((item, index) => ({
		date: item.date,
		dayLabel: item.day,
		formattedDate: new Date(item.date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		}),
		index,
	}));

	useEffect(() => {
		if (!formattedOptions.length) return;
		if (selectedDay >= formattedOptions.length) {
			setSelectedDay(0);
		}
	}, [formattedOptions.length, selectedDay, setSelectedDay]);

	const safeSelectedIndex = Math.min(
		selectedDay,
		Math.max(formattedOptions.length - 1, 0),
	);

	const selectedValue = formattedOptions[safeSelectedIndex]?.date;
	const hasOptions = formattedOptions.length > 0;

	const handleValueChange = (value: string) => {
		const nextIndex = formattedOptions.findIndex((item) => item.date === value);
		if (nextIndex !== -1) {
			setSelectedDay(nextIndex);
		}
	};

	return (
		<Select
			value={hasOptions ? selectedValue : 'fallback'}
			onValueChange={hasOptions ? handleValueChange : undefined}
			disabled={!hasOptions}
		>
			<SelectTrigger className='text-neutral-0 flex items-center justify-center rounded-md border-neutral-600 bg-neutral-700 px-2 py-1 transition-all hover:bg-neutral-800'>
				<SelectValue placeholder='Select day' />
			</SelectTrigger>
			<SelectContent
				position='popper'
				className='max-h-(--radix-select-content-available-height) rounded-xl border-neutral-600 bg-neutral-800 p-2 shadow-lg'
			>
				{hasOptions ? (
					formattedOptions.map((item) => (
						<SelectItem
							key={item.date}
							value={item.date}
							className='text-neutral-0 hover:text-neutral-0 focus:text-neutral-0 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700'
						>
							{item.dayLabel}
						</SelectItem>
					))
				) : (
					<SelectItem
						value='fallback'
						className='cursor-default text-neutral-200'
					>
						-
					</SelectItem>
				)}
			</SelectContent>
		</Select>
	);
};
