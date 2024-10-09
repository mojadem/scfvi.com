import * as db from '$lib/server/database';

export const load = async () => {
	return {
		entries: await db.getAllEntries()
	};
};
