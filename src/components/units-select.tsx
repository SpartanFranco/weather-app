import { ChevronDown, Settings, Check } from 'lucide-react';
import React, { useState } from 'react';
import { useWeatherStore } from '@/stores/weather-store';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks';

const UNIT_GROUPS = [
	{
		title: 'Temperature',
		options: [
			{ key: 'celsius', label: 'Celsius (°C)' },
			{ key: 'fahrenheit', label: 'Fahrenheit (°F)' },
		],
	},
	{
		title: 'Wind Speed',
		options: [
			{ key: 'kmh', label: 'km/h' },
			{ key: 'mph', label: 'mph' },
		],
	},
	{
		title: 'Precipitation',
		options: [
			{ key: 'mm', label: 'Millimeters (mm)' },
			{ key: 'inch', label: 'Inches (in)' },
		],
	},
];

export const UnitsSelect: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useIsMobile();
	const {
		temperatureUnit,
		windSpeedUnit,
		precipitationUnit,
		setTemperatureUnit,
		setWindSpeedUnit,
		setPrecipitationUnit,
	} = useWeatherStore();

	const handleValueChange = (type: string, value: string) => {
		switch (type) {
			case 'temperature':
				setTemperatureUnit(value as 'celsius' | 'fahrenheit');
				break;
			case 'wind':
				setWindSpeedUnit(value as 'kmh' | 'mph');
				break;
			case 'precipitation':
				setPrecipitationUnit(value as 'mm' | 'inch');
				break;
		}
	};

	return (
		<div className='relative w-fit'>
			<div className=''>
				<Button
					size={!isMobile ? 'lg' : 'sm'}
					variant='outline'
					className='text-neutral-0 z-10 flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600'
					onClick={() => setIsOpen(!isOpen)}
				>
					<Settings className='hidden size-4' />
					<span className='text-sm font-medium md:text-lg'>Units</span>
					<ChevronDown className='size-4' />
				</Button>

				{isOpen && (
					<div className='absolute top-full right-0 z-50 mt-2 w-64 rounded-lg bg-neutral-800 p-4 shadow-lg'>
						{UNIT_GROUPS.map((group) => (
							<div
								key={group.title}
								className='mb-4 last:mb-0'
							>
								<h3 className='mb-2 text-sm font-semibold text-neutral-300'>
									{group.title}
								</h3>
								<div className='space-y-1'>
									{group.options.map((opt) => {
										let currentValue = '';
										let setValue = (_: string) => {};

										if (group.title === 'Temperature') {
											currentValue = temperatureUnit;
											setValue = (value) =>
												handleValueChange('temperature', value);
										} else if (group.title === 'Wind Speed') {
											currentValue = windSpeedUnit;
											setValue = (value) => handleValueChange('wind', value);
										} else if (group.title === 'Precipitation') {
											currentValue = precipitationUnit;
											setValue = (value) =>
												handleValueChange('precipitation', value);
										}

										return (
											<button
												key={opt.key}
												onClick={() => setValue(opt.key)}
												className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
													currentValue === opt.key
														? 'text-neutral-0 bg-neutral-700'
														: 'hover:text-neutral-0 text-neutral-300 hover:bg-neutral-700'
												}`}
											>
												<span>{opt.label}</span>
												{currentValue === opt.key && (
													<Check className='h-4 w-4' />
												)}
											</button>
										);
									})}
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{isOpen && (
				<div
					className='fixed inset-0 z-40'
					onClick={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
};
