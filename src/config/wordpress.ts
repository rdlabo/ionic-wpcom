
// URL of WordPress.com
export const wordpressURL = 'ja.blog.wordpress.com';

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