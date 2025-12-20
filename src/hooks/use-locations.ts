import { searchLocations } from '@/api/getLocations';
import { useQuery } from '@tanstack/react-query';

export const useLocations = (query: string) => {
	const searchQuery = useQuery({
		queryKey: ['locations', query],
		queryFn: () => searchLocations(query, 10),
		enabled: !!query,
	});
	return searchQuery;
};
