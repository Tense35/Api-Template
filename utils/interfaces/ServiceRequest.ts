export interface IDeleteRequest {
    params: object;
    query?: object;
    body?: object;
}

export interface IGetRequest {
    params?: object;
    query?: object;
}

export interface IPostRequest extends IDeleteRequest {
    body: object;
}

export interface IPutRequest extends IPostRequest { }