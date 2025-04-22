export interface Entry {
	id: string;
	title: string;
	author: string;
	year: number;
	link: string;
	campaign: string;
	type: string;
	description: string;
	archivebox_id: string | null;
	index: number;
	expand: Record<'campaign' | 'type', Campaign | Type>;
}

export interface Campaign {
	id: string;
	name: string;
}

export interface Type {
	id: string;
	name: string;
}
