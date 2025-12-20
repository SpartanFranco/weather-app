import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LocationData } from './weather-store';
import { isFavorite } from '@/utils/favorites';

export interface FavoriteLocation extends LocationData {
	addedAt: number;
}

interface FavoritesStore {
	favorites: FavoriteLocation[];
	addFavorite: (location: LocationData) => void;
	removeFavorite: (latitude: number, longitude: number) => void;
	toggleFavorite: (location: LocationData) => void;
	clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
	persist(
		(set, get) => ({
			favorites: [],

			addFavorite: (location: LocationData) => {
				const { favorites } = get();
				const exists = favorites.some(
					(fav) =>
						fav.latitude === location.latitude &&
						fav.longitude === location.longitude,
				);

				if (!exists) {
					const newFavorite: FavoriteLocation = {
						...location,
						addedAt: Date.now(),
					};
					set({ favorites: [...favorites, newFavorite] });
				}
			},

			removeFavorite: (latitude: number, longitude: number) => {
				const { favorites } = get();
				const filtered = favorites.filter(
					(fav) => fav.latitude !== latitude || fav.longitude !== longitude,
				);
				set({ favorites: filtered });
			},

			toggleFavorite: (location: LocationData) => {
				const { addFavorite, removeFavorite, favorites } = get();
				if (!isFavorite(favorites, location)) {
					addFavorite(location);
					return;
				}
				removeFavorite(location.latitude, location.longitude);
			},

			clearFavorites: () => {
				set({ favorites: [] });
			},
		}),
		{
			name: 'weather-favorites',
		},
	),
);
