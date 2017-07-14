
export interface AppState {
    keyword: InterfaceKeyword,
    current: InterfaceCurrent
}

export interface InterfaceKeyword {
    keyword: string,
}

export interface InterfaceCurrent {
    page: string,
    opt : {}
}