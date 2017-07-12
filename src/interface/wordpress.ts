
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
    }
}