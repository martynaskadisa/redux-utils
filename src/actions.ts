export interface Action<TPayload = void, TMeta = any> {
    type: string;
    payload: TPayload;
    meta: TMeta;
}

type ActionCreator<TPayload = void, TMeta = any> = TPayload extends void 
    ? (payload?: TPayload, meta?: TMeta) => Action<TPayload, TMeta>
    : (payload: TPayload, meta?: TMeta) => Action<TPayload, TMeta>

export function createActionCreator<TPayload = void, TMeta = any>(type: string): ActionCreator<TPayload, TMeta>;

export function createActionCreator(type: string) {
    const actionCreator = (payload: any, meta: any) => ({
        type,
        payload,
        meta
    });

    actionCreator.toString = () => type;

    return actionCreator;
  }
