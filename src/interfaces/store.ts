
export interface IAppState {
    search: ISearch,
    current: ICurrent
}

export interface ISearch {
    keyword: string,
}

export interface ICurrent {
    page: string,
    opt : {}
}