import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import type React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleProps extends ComponentProps<'h1'> {
	as?: HeadingLevel;
}

export const Title: React.FC<TitleProps> = ({
	className,
	as = 'h1',
	...props
}) => {
	const Component = as;
	return (
		<Component
			className={cn(
				'w-72 text-center text-5xl leading-tight font-extrabold tracking-wide lg:w-fit',
				className,
			)}
			{...props}
		/>
	);
};
