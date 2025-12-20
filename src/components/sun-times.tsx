// import { Sunrise, Sunset } from 'lucide-react';

// interface SunTimesProps {
// 	sunrise: string;
// 	sunset: string;
// 	className?: string;
// }

// export const SunTimes: React.FC<SunTimesProps> = ({
// 	sunrise,
// 	sunset,
// 	className,
// }) => {
// 	const formatTime = (isoString: string) => {
// 		try {
// 			return new Date(isoString).toLocaleTimeString('en-US', {
// 				hour: 'numeric',
// 				minute: '2-digit',
// 				hour12: true,
// 			});
// 		} catch {
// 			return '--:--';
// 		}
// 	};

// 	return (
// 		<Card
// 			className={cn('border border-neutral-600 bg-neutral-800 p-4', className)}
// 		>
// 			<h3 className='text-neutral-0 mb-4 text-lg font-semibold'>Sun Times</h3>
// 			<div className='flex items-center justify-around gap-6'>
// 				<div className='flex flex-col items-center gap-2'>
// 					<div className='rounded-full bg-orange-500/20 p-3'>
// 						<Sunrise className='size-6 text-orange-500' />
// 					</div>
// 					<div className='text-center'>
// 						<p className='text-xs text-neutral-400'>Sunrise</p>
// 						<p className='text-neutral-0 text-lg font-semibold'>
// 							{formatTime(sunrise)}
// 						</p>
// 					</div>
// 				</div>

// 				<div className='h-12 w-px bg-neutral-600' />

// 				<div className='flex flex-col items-center gap-2'>
// 					<div className='rounded-full bg-blue-500/20 p-3'>
// 						<Sunset className='size-6 text-blue-500' />
// 					</div>
// 					<div className='text-center'>
// 						<p className='text-xs text-neutral-400'>Sunset</p>
// 						<p className='text-neutral-0 text-lg font-semibold'>
// 							{formatTime(sunset)}
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</Card>
// 	);
// };
