import type { Campaign, Entry, Type } from '$lib/types';
import PocketBase, { RecordService } from 'pocketbase';

interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService;
	collection(idOrName: 'entries'): RecordService<Entry>;
	collection(idOrName: 'campaigns'): RecordService<Campaign>;
	collection(idOrName: 'types'): RecordService<Type>;
}

export function init(): TypedPocketBase {
	return new PocketBase('https://pocketbase.scfvi.com') as TypedPocketBase;
}

export async function getAllEntries(client: TypedPocketBase) {
	const entries = await client
		.collection('entries')
		.getFullList({ expand: 'campaign,type', sort: 'year,title' });
	return entries.map((entry, index) => ({ ...entry, index }));
}

export async function getAllTypes(client: TypedPocketBase) {
	const types = await client.collection('types').getFullList({ sort: 'name' });
	return types;
}

export async function getAllCampaigns(client: TypedPocketBase) {
	const campaigns = await client.collection('campaigns').getFullList({ sort: 'name' });
	return campaigns;
}
