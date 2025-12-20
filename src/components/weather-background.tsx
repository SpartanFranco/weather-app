import type { WeatherCondition } from '@/hooks/use-weather-background';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface WeatherBackgroundProps {
	condition: WeatherCondition;
	className?: string;
}

const BACKGROUND_CLASSES: Record<WeatherCondition, string> = {
	clear: 'bg-gradient-to-br from-blue-400 via-blue-300 to-yellow-300',
	cloudy: 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200',
	rainy: 'bg-gradient-to-br from-gray-600 via-gray-500 to-blue-400',
	snowy: 'bg-gradient-to-br from-blue-200 via-white to-gray-100',
	stormy: 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-950',
	foggy: 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400',
};

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({
	condition,
	className,
}) => {
	const rainDrops = useMemo(
		() =>
			Array.from({ length: 50 }, () => ({
				left: Math.random() * 100,
				delay: Math.random() * 2,
				duration: 1 + Math.random(),
			})),
		[],
	);

	const snowFlakes = useMemo(
		() =>
			Array.from({ length: 30 }, () => ({
				left: Math.random() * 100,
				drift: Math.random() * 20 - 10,
				delay: Math.random() * 3,
				duration: 2 + Math.random() * 3,
			})),
		[],
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className={cn(
				'fixed inset-0 -z-10 overflow-hidden transition-all duration-1000',
				BACKGROUND_CLASSES[condition],
				className,
			)}
		>
			{condition === 'rainy' && (
				<motion.div
					className='pointer-events-none absolute inset-0'
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.35 }}
				>
					{rainDrops.map((drop, i) => (
						<motion.div
							key={i}
							className='absolute h-14 w-0.5 bg-blue-200'
							style={{ left: `${drop.left}%` }}
							initial={{ top: '-10%' }}
							animate={{ top: '110%' }}
							transition={{
								duration: drop.duration,
								repeat: Infinity,
								delay: drop.delay,
								ease: 'linear',
							}}
						/>
					))}
				</motion.div>
			)}

			{condition === 'snowy' && (
				<motion.div
					className='pointer-events-none absolute inset-0'
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
				>
					{snowFlakes.map((flake, i) => (
						<motion.div
							key={i}
							className='absolute size-2 rounded-full bg-white'
							style={{ left: `${flake.left}%` }}
							initial={{ top: '-10%' }}
							animate={{
								top: '110%',
								x: flake.drift,
							}}
							transition={{
								duration: flake.duration,
								repeat: Infinity,
								delay: flake.delay,
								ease: 'linear',
							}}
						/>
					))}
				</motion.div>
			)}

			{condition === 'stormy' && (
				<motion.div className='pointer-events-none absolute inset-0'>
					<motion.div
						className='absolute inset-0 bg-white'
						animate={{
							opacity: [0, 0.9, 0, 0.6, 0],
						}}
						transition={{
							duration: 0.6,
							times: [0, 0.1, 0.2, 0.4, 1],
							repeat: Infinity,
							repeatDelay: 3,
							ease: 'easeOut',
						}}
					/>

					<motion.div
						className='absolute inset-0 bg-black/20'
						animate={{ opacity: [0.2, 0.35, 0.2] }}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</motion.div>
			)}
		</motion.div>
	);
};
