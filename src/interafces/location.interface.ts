export interface Country {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	elevation: number;
	feature_code: string;
	country_code: string;
	timezone: string;
	population: number;
	country_id: number;
	country: string;
	admin1_id?: number;
	admin2_id?: number;
	admin3_id?: number;
	admin1?: string;
	admin2?: string;
	admin3?: string;
	postcodes?: string[];
}

export type Location = Pick<
	Country,
	'name' | 'latitude' | 'longitude' | 'country' | 'timezone'
>;
