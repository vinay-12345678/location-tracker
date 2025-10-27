import {
  create as createZustandStore,
  type StateCreator,
  type StoreApi,
} from 'zustand';

export type Store<T> = {
  (): T;
  <U>(selector: (state: T) => U, equalityFn?: (a: U, b: U) => boolean): U;
  reset: () => void;
  getState: () => T;
  setState: (
    partial: Partial<T> | ((state: T) => Partial<T>),
    replace?: boolean,
  ) => void;
  subscribe: StoreApi<T>['subscribe'];
  getInitialState: () => T;
};

export function create<T>(
  stateCreator: StateCreator<T, [], []>,
): Store<T> {
  const store = createZustandStore(stateCreator);
  const initialState = store.getState();

  const _store = store as Store<T>;
  _store.reset = function () {
    this.setState(initialState);
  };
  _store.getInitialState = () => initialState;

  return _store;
}

