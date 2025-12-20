import type { FavoriteLocation } from '@/stores/favorites-store';
import type { LocationData } from '@/stores/weather-store';

export function isFavorite(
	favorites: FavoriteLocation[],
	coordinates: LocationData,
): boolean {
	return favorites.some(
		(fav) =>
			fav.latitude === coordinates.latitude &&
			fav.longitude === coordinates.longitude,
	);
}
