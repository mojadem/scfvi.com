/// <reference path="../.astro/types.d.ts" />

interface Entry {
  id: string;
  title: string;
  author: string;
  year: int;
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

interface TypedPocketBase extends import("pocketbase").PocketBase {
  collection(idOrName: string): import("pocketbase").RecordService;
  collection(idOrName: "entries"): import("pocketbase").RecordService<Entry>;
  collection(
    idOrName: "campaigns",
  ): import("pcketbase").RecordService<Campaign>;
  collection(idOrName: "types"): import("pcketbase").RecordService<Type>;
}

declare namespace App {
  interface Locals extends Record<string, any> {
    pb: TypedPocketBase;
  }
}
