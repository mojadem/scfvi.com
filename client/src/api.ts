import PocketBase, { RecordService } from "pocketbase";
import type { Campaign, Entry, Type } from "./types";
import { PB_URL } from "./env";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService;
  collection(idOrName: "entries"): RecordService<Entry>;
  collection(idOrName: "campaigns"): RecordService<Campaign>;
  collection(idOrName: "types"): RecordService<Type>;
}

function init() {
  return new PocketBase(PB_URL) as TypedPocketBase;
}

export async function getAllEntries() {
  const pb = init();
  const entries = await pb.collection("entries").getFullList({
    expand: "campaign,type",
    sort: "year,title",
  });

  return entries.map((entry, index) => ({ ...entry, index }));
}

export async function getAllCampaigns() {
  const pb = init();
  return await pb.collection("campaigns").getFullList({ sort: "name" });
}

export async function getAllTypes() {
  const pb = init();
  return await pb.collection("types").getFullList({ sort: "name" });
}
