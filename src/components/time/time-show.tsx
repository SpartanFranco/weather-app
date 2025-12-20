interface Props {
	image?: string;
	temperature?: number;
}
export const TimeShow: React.FC<Props> = ({ image, temperature }) => {
	return (
		<section className='flex items-center md:gap-2'>
			<img
				src={image}
				className='size-30 xl:size-36'
			/>
			<p className='flex items-start gap-1 text-7xl font-bold italic xl:text-9xl'>
				{temperature}
				<span className='mt-1'>°</span>
			</p>
		</section>
	);
};
