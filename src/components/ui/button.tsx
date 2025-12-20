import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-blue-500 text-neutral-0 hover:bg-blue-700',
				destructive: 'bg-red-500 text-white hover:bg-red-700',
				outline:
					'border border-neutral-600 bg-transparent text-neutral-0 hover:bg-neutral-700',
				secondary: 'bg-neutral-700 text-neutral-0 hover:bg-neutral-600',
				ghost: 'text-neutral-0 hover:bg-neutral-700',
				link: 'text-blue-500 underline-offset-4 hover:underline hover:text-blue-700',
				// Variantes con tus colores específicos
				neutral: 'bg-neutral-700 text-neutral-0 hover:bg-neutral-600',
				orange: 'bg-orange-500 text-neutral-0 hover:bg-orange-600',
				blue: 'bg-blue-500 text-neutral-0 hover:bg-blue-700',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				xl: 'h-12 rounded-md px-8 text-base has-[>svg]:px-6', // Tamaño extra grande
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

export function Button({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	isLoading = false,
	children,
	disabled,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<>
					<span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
					{children}
				</>
			) : (
				children
			)}
		</Comp>
	);
}
