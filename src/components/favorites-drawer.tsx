import { Star, Trash2, MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useWeatherStore } from '@/stores/weather-store';
import { useFavoritesStore } from '@/stores/favorites-store';
import { cn } from '@/lib/utils';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const FavoritesDrawer = () => {
	const [open, setOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	const { favorites, removeFavorite } = useFavoritesStore();
	const { location: currentLocation, setLocation } = useWeatherStore();

	useEffect(() => {
		if (!open) {
			setSelectedIndex(0);
		}
	}, [open]);

	useEffect(() => {
		if (itemRefs.current[selectedIndex]) {
			itemRefs.current[selectedIndex]?.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		}
	}, [selectedIndex]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!open || favorites.length === 0) return;

			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					setSelectedIndex((prev) =>
						prev < favorites.length - 1 ? prev + 1 : prev,
					);
					break;
				case 'ArrowUp':
					e.preventDefault();
					setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
					break;
				case 'Enter':
					e.preventDefault();
					handleSelectFavorite(favorites[selectedIndex]);
					break;
				default:
					break;
			}
		};

		if (open) {
			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}
	}, [open, favorites, selectedIndex]);

	const handleSelectFavorite = (favorite: (typeof favorites)[0]) => {
		setLocation({
			name: favorite.name,
			country: favorite.country,
			latitude: favorite.latitude,
			longitude: favorite.longitude,
			timezone: favorite.timezone,
		});
		setOpen(false);
	};

	const handleRemoveFavorite = (favorite: (typeof favorites)[0]) => () => {
		removeFavorite(favorite.latitude, favorite.longitude);
	};

	return (
		<div>
			<div className=''>
				<Drawer
					open={open}
					onOpenChange={setOpen}
					direction='right'
				>
					<DrawerTrigger asChild>
						<div>
							<Button
								size='lg'
								variant='outline'
								className={cn(
									'text-neutral-0 hidden bg-neutral-700 hover:bg-neutral-600 md:block',
									favorites.length === 0 && 'pointer-events-none opacity-70',
								)}
							>
								View favorites {favorites.length > 0 && `(${favorites.length})`}
							</Button>
							<div className='relative inline-block md:hidden'>
								<Badge
									className={cn(favorites.length === 0 && 'hidden')}
									variant='destructive'
								>
									{favorites.length}
									<Star className='h-5 w-5' />
								</Badge>
							</div>
						</div>
					</DrawerTrigger>
					<DrawerContent className='text-neutral-0 border-neutral-700 bg-neutral-800'>
						<DrawerHeader>
							<DrawerTitle className='flex items-center gap-2'>
								<Star
									className='size-5 text-orange-500'
									fill='currentColor'
								/>
								<span className='text-neutral-0 text-lg font-semibold'>
									Favorite Locations
								</span>
							</DrawerTitle>
							<DrawerDescription className='text-neutral-300'>
								{favorites.length} saved location
								{favorites.length !== 1 ? 's' : ''}
							</DrawerDescription>
						</DrawerHeader>

						<div className='px-4 py-2'>
							{favorites.length > 0 ? (
								<div className='flex max-h-[60vh] flex-col gap-2 overflow-y-auto'>
									{favorites.map((fav, index) => {
										const isActive =
											currentLocation?.latitude === fav.latitude &&
											currentLocation?.longitude === fav.longitude;
										const isSelected = index === selectedIndex;

										return (
											<div
												ref={(el) => {
													itemRefs.current[index] = el;
												}}
												key={`${fav.latitude}-${fav.longitude}`}
												className={cn(
													'flex items-center justify-between rounded-lg p-3 transition-colors',
													isActive
														? 'bg-blue-700'
														: isSelected
															? 'bg-neutral-600'
															: 'bg-neutral-700 hover:bg-neutral-600',
												)}
											>
												<button
													type='button'
													onClick={() => handleSelectFavorite(fav)}
													className='flex flex-1 items-center gap-2 text-left'
												>
													<MapPin className='size-4 text-neutral-300' />
													<div>
														<p className='text-neutral-0 text-sm font-medium'>
															{fav.name}
														</p>
														<p className='text-xs text-neutral-300'>
															{fav.country}
														</p>
													</div>
												</button>

												<Button
													variant='ghost'
													size='sm'
													onClick={handleRemoveFavorite(fav)}
													className='h-8 w-8 p-0 text-neutral-400 hover:text-red-500'
												>
													<Trash2 className='size-4' />
												</Button>
											</div>
										);
									})}
								</div>
							) : (
								<div className='py-8 text-center'>
									<Star className='mx-auto mb-4 size-12 text-neutral-400' />
									<p className='text-neutral-400'>
										No favorite locations added.
									</p>
									<p className='mt-2 text-sm text-neutral-500'>
										Click the star icon on weather cards to add favorites
									</p>
								</div>
							)}
						</div>

						<DrawerFooter>
							<DrawerClose asChild>
								<Button
									variant='outline'
									className='text-neutral-0 border-neutral-600'
								>
									Close
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>

			{/* Mobile Trigger */}
			{/* <div className='md:hidden'>
				<Drawer
					open={open}
					onOpenChange={setOpen}
				>
					<DrawerTrigger asChild>
						<div className='relative inline-block'>
							<Badge
								className={cn(
									'absolute -top-2 -right-2',
									favorites.length === 0 && 'hidden',
								)}
								variant='destructive'
							>
								{favorites.length}
							</Badge>
							<Button
								variant='ghost'
								size='icon'
								className={cn(
									'h-10 w-10',
									favorites.length === 0 && 'opacity-40',
								)}
							>
								<Star className='h-5 w-5' />
							</Button>
						</div>
					</DrawerTrigger>
					<DrawerContent className='text-neutral-0 h-[80vh] border-neutral-700 bg-neutral-800'>
						<DrawerHeader className='flex flex-row items-center justify-between'>
							<div className='flex items-center gap-2'>
								<Star
									className='size-5 text-orange-500'
									fill='currentColor'
								/>
								<DrawerTitle className='text-neutral-0 text-lg font-semibold'>
									Favorites
								</DrawerTitle>
							</div>
							<DrawerClose asChild>
								<Button
									variant='ghost'
									size='icon'
									className='h-8 w-8'
								>
									<X className='h-4 w-4' />
								</Button>
							</DrawerClose>
						</DrawerHeader>

						<div className='flex-1 overflow-y-auto px-4 py-2'>
							{favorites.length > 0 ? (
								<div className='flex flex-col gap-2'>
									{favorites.map((fav, index) => {
										const isActive =
											currentLocation?.latitude === fav.latitude &&
											currentLocation?.longitude === fav.longitude;
										const isSelected = index === selectedIndex;

										return (
											<div
												ref={(el) => {
													itemRefs.current[index] = el;
												}}
												key={`${fav.latitude}-${fav.longitude}`}
												className={cn(
													'flex items-center justify-between rounded-lg p-3 transition-colors',
													isActive
														? 'bg-blue-700'
														: isSelected
															? 'bg-neutral-600'
															: 'bg-neutral-700 hover:bg-neutral-600',
												)}
											>
												<button
													type='button'
													onClick={() => handleSelectFavorite(fav)}
													className='flex flex-1 items-center gap-2 text-left'
												>
													<MapPin className='size-4 text-neutral-300' />
													<div>
														<p className='text-neutral-0 text-sm font-medium'>
															{fav.name}
														</p>
														<p className='text-xs text-neutral-300'>
															{fav.country}
														</p>
													</div>
												</button>

												<Button
													variant='ghost'
													size='sm'
													onClick={handleRemoveFavorite(fav)}
													className='h-8 w-8 p-0 text-neutral-400 hover:text-red-500'
												>
													<Trash2 className='size-4' />
												</Button>
											</div>
										);
									})}
								</div>
							) : (
								<div className='flex h-full flex-col items-center justify-center py-8'>
									<Star className='mb-4 size-12 text-neutral-400' />
									<p className='text-neutral-400'>No favorites yet</p>
								</div>
							)}
						</div>

						<DrawerFooter>
							<DrawerClose asChild>
								<Button
									variant='outline'
									className='text-neutral-0 w-full border-neutral-600'
								>
									Close
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div> */}
		</div>
	);
};
