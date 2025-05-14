interface EntryExpand {
  campaign: Array<Campaign>;
  type: Type;
}

export interface Entry {
  id: string;
  index: number;
  title: string;
  author: string;
  year: number;
  link: string;
  description: string;
  media: Array<string>;
  archivebox_id: string | null;
  expand: EntryExpand;
}

export interface Campaign {
  id: string;
  name: string;
}

export interface Type {
  id: string;
  name: string;
}
