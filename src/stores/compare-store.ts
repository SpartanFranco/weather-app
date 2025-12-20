import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LocationData } from './weather-store';

interface CompareLocation extends LocationData {
	id: string;
}

interface CompareStore {
	compareLocations: CompareLocation[];
	addCompareLocation: (location: LocationData) => void;
	removeCompareLocation: (id: string) => void;
	clearCompareLocations: () => void;
	isComparing: boolean;
	setIsComparing: (value: boolean) => void;
}

export const useCompareStore = create<CompareStore>()(
	persist(
		(set, get) => ({
			compareLocations: [],
			isComparing: false,

			addCompareLocation: (location) => {
				const locations = get().compareLocations;
				if (locations.length >= 4) {
					// Limit to 4 locations for comparison
					return;
				}

				const id = `${location.latitude}-${location.longitude}`;
				const exists = locations.some((loc) => loc.id === id);

				if (!exists) {
					set({
						compareLocations: [...locations, { ...location, id }],
					});
				}
			},

			removeCompareLocation: (id) => {
				set({
					compareLocations: get().compareLocations.filter(
						(loc) => loc.id !== id,
					),
				});
			},

			clearCompareLocations: () => {
				set({ compareLocations: [], isComparing: false });
			},

			setIsComparing: (value) => {
				set({ isComparing: value });
			},
		}),
		{
			name: 'compare-storage',
		},
	),
);
