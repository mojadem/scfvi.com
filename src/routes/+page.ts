import * as db from '$lib/database';

export const load = async () => {
	return {
		entries: await db.getAllEntries()
	};
};
