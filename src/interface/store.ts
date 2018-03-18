
export interface AppStateInterface {
    search: SearchInterface,
    current: CurrentInterface
}

export interface SearchInterface {
    keyword: string,
}

export interface CurrentInterface {
    page: string,
    opt : {}
}