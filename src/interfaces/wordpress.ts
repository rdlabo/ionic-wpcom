
export interface Site {
    name        : string,
    jetpack     : boolean
}

export interface Post {
    ID          : number,
    title       : string,
    excerpt     : string,
    content     : string,
    date        : string,
    author      : Author,
    post_thumbnail: {
        URL     : string
    },
    short_URL   : string,
    categories  : Array<Category>
    tags        : Array<Tag>,

    origin: {
        title   : string,
        excerpt : string,
    }
}

export interface PostParams {
    type?           : string,
    categorySlug?   : string
    tagSlug?        : string
    authorID?       : number
    search?         : string
}

export interface Category {
    ID              : number,
    name            : string,
    post_count      : number,
    parent          : number,
    slug            : string
}

export interface Tag {
    ID              : number,
    name            : string,
    post_count      : number,
    slug            : string
}

export interface Author {
    ID              : number,
    name            : string,
    avatar_URL      : string
}

export interface StragePost {
    domain          : string,
    postID          : number,
    article         : Post
    created         : string
}