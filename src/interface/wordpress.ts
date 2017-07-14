
export interface InterfacePost {
    ID: number,
    title: string,
    excerpt: string,
    content: string,
    date: string,
    author: InterfaceAuthor,
    post_thumbnail: {
        URL: string
    },
    short_URL: string,
    categories: Array<InterfaceCategory>
    tags: Array<InterfaceTag>,

    origin: {
        title: string,
        excerpt: string,
    }
}

export interface InterfacePostParams {
    type?           : string,
    categorySlug?   : string
    tagSlug?        : string
    authorID?       : number
    search?         : string
}

export interface InterfaceCategory {
    ID: number,
    name: string,
    post_count: number,
    parent: number,
    slug: string
}

export interface InterfaceTag {
    ID: number,
    name: string,
    post_count: number,
    slug: string
}

export interface InterfaceAuthor {
    ID: number,
    name: string,
    avatar_URL:string
}