import PocketBase, { type RecordService } from "pocketbase";
import type { Campaign, Entry, Type } from "@lib/types.ts";
import { PB_URL } from "@lib/env.ts";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService;
  collection(idOrName: "entries"): RecordService<Entry>;
  collection(idOrName: "campaigns"): RecordService<Campaign>;
  collection(idOrName: "types"): RecordService<Type>;
}

const pb = new PocketBase(PB_URL) as TypedPocketBase;
console.log(`init PocketBase with URL: ${PB_URL}`);

export async function getAllEntries() {
  const entries = await pb.collection("entries").getFullList({
    expand: "campaign,type",
    sort: "year,title",
  });

  return entries.map((entry, index) => ({ ...entry, index }));
}

export async function getAllCampaigns() {
  return await pb.collection("campaigns").getFullList({ sort: "name" });
}

export async function getAllTypes() {
  return await pb.collection("types").getFullList({ sort: "name" });
}
