import { atom } from "nanostores";
import type { Entry } from "./types.ts";

export const $entries = atom<Entry[]>([]);
