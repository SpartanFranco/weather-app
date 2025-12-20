import { images } from '@/consts';
import { UnitsSelect } from './units-select';
import { GitCompare } from 'lucide-react';
import { useCompareStore } from '@/stores/compare-store';
import { useNavigate } from 'react-router';
import { FavoritesDrawer } from './favorites-drawer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
	const { compareLocations } = useCompareStore();
	const navigate = useNavigate();
	return (
		<header className='mb-10 flex w-full items-center justify-between rounded-2xl lg:mb-14'>
			<img
				src={images.logo}
				alt='Logo de la empresa'
				className='h-8 w-auto object-contain md:h-12'
			/>
			<div className='flex items-center gap-4'>
				<FavoritesDrawer />
				<div className='hidden md:block'>
					<Button
						size='lg'
						variant='ghost'
						onClick={() => navigate('/compare-locations')}
						className={cn(
							'text-neutral-0 bg-neutral-700',
							compareLocations.length === 0 && 'pointer-events-none opacity-70',
						)}
					>
						<GitCompare size={20} /> Compare
						{compareLocations.length > 0 && `(${compareLocations.length})`}
					</Button>
				</div>
				<div className='flex items-center md:hidden'>
					<Badge
						hidden={compareLocations.length === 0}
						color='warning'
						onClick={() => navigate('/compare-locations')}
					>
						{compareLocations.length}
						<GitCompare size={20} />
					</Badge>
				</div>
				<UnitsSelect />
			</div>
		</header>
	);
};
