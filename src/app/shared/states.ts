export interface State {
  [state: string]: string;
}

export const VISIBLE_STATE: State = {
  hidden: 'hidden',
  visible: 'visible',
};

export const LOAD_STATE: State = {
  loaded: 'loaded',
  loading: 'loading',
  unloaded: 'unloaded',
};

export const BOOLEAN_STRING_STATE: State = {
  true: 'true',
  false: 'false',
};

