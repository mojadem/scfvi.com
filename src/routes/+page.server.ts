import * as db from '$lib/server/database';

export const load = async () => {
	const client = db.init();

	return {
		entries: await db.getAllEntries(client)
	};
};
