
export interface InterfacePost {
    ID: number,
    title: string,
    excerpt: string,
    content: string,
    date: string,
    author: {
        name: string
    },
    post_thumbnail: {
        URL: string
    },
    short_URL: string,
    categories: Array<InterfaceCategory>
}

export interface InterfaceCategory {
    ID: number,
    name: string,
    post_count:number,
    parent:number,
    slug:string
}

export interface InterfacePostParams {
    type?: string,
    slug?: string
}
