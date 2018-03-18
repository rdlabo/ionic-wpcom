
export interface AppState {
    search: Search,
    current: Current
}

export interface Search {
    keyword: string,
}

export interface Current {
    page: string,
    opt : {}
}