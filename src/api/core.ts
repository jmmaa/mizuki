export type SetStateAction<T> = (state: T) => T;
export type StateGetterFunc<T> = () => T;
export type StateSetterFunc<T> = (setter: SetStateAction<T>) => void;

export const createState = <T>(state: T): [StateGetterFunc<T>, StateSetterFunc<T>] => {
  const read = () => state;

  const write = (setter: SetStateAction<T>) => {
    state = setter(state);
  };

  return [read, write];
};

export type NotifyFunc<T> = (value: T) => void;
export type UnsubscribeFunc<T> = () => void;
export type SubscribeFunc<T> = (callback: NotifyFunc<T>) => UnsubscribeFunc<T>;

export const createObserver = <T>(): [NotifyFunc<T>, SubscribeFunc<T>] => {
  let subs = new Set<(value: T) => void>();

  const notify = (value: T) => {
    for (let sub of subs) {
      sub(value);
    }
  };

  const subscribe = (callback: (value: T) => void) => {
    subs.add(callback);

    return () => {
      subs.delete(callback);
    };
  };

  return [notify, subscribe];
};
