import PocketBase, { RecordService } from 'pocketbase';

interface Entry {
	id: string;
	title: string;
	author: string;
	year: number;
	link: string;
	campaign: string;
	type: string;
	expand: Record<string, Campaign | Type>;
}

interface Campaign {
	id: string;
	name: string;
}

interface Type {
	id: string;
	name: string;
}

interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService;
	collection(idOrName: 'entries'): RecordService<Entry>;
	collection(idOrName: 'campaigns'): RecordService<Campaign>;
	collection(idOrName: 'types'): RecordService<Type>;
}

export function init(): TypedPocketBase {
	return new PocketBase('https://scfvi.pockethost.io') as TypedPocketBase;
}

export async function getAllEntries(db: TypedPocketBase) {
	const entries = await db.collection('entries').getFullList({ expand: 'campaign,type' });
	return entries;
}
