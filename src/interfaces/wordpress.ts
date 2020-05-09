export interface ISite {
  name: string;
  jetpack: boolean;
}

export interface IPost {
  ID: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: IAuthor;
  post_thumbnail: {
    URL: string;
  };
  short_URL: string;
  categories: Array<ICategory>;
  tags: Array<ITag>;

  origin: {
    title: string;
    excerpt: string;
  };
}

export interface IPostParams {
  type?: string;
  categorySlug?: string;
  tagSlug?: string;
  authorID?: number;
  search?: string;
}

export interface ICategory {
  ID: number;
  name: string;
  post_count: number;
  parent: number;
  slug: string;
}

export interface ITag {
  ID: number;
  name: string;
  post_count: number;
  slug: string;
}

export interface IAuthor {
  ID: number;
  name: string;
  avatar_URL: string;
}

export interface IStragePost {
  domain: string;
  postID: number;
  article: IPost;
  created: string;
}
