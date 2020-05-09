export enum ResultKind {
    Success,
    Failure
}

export interface Success<TValue> {
    kind: ResultKind.Success,
    data: TValue
}

export interface Failure<TValue> {
    kind: ResultKind.Failure,
    error: TValue
}

export type Result<TSuccess, TFailure> =
    | Success<TSuccess>
    | Failure<TFailure>