import { Dispatch, Reducer } from 'react';

export type FormKey = 'prompt' | 'ai_model';

export type FormData = {
  [key in FormKey]: string;
};

export type ChatStep = 'idle' | 'loading';

export type ChatRole = 'user' | 'assistant';

export interface Chat {
  id: string;
  role: ChatRole;
  message: string;
  partial: boolean;
}

export type ChatHist = Chat[];

export type State = {
  step: ChatStep;
  formData: FormData;
  chatHist: ChatHist;
  error?: string;
};

export const initialState: State = {
  step: 'idle',
  formData: { prompt: '', ai_model: 'gemini-1.5-flash-001' },
  chatHist: [],
};

export type Action =
  | { type: 'toIdle' }
  | { type: 'toLoading' }
  | { type: 'toSetValue'; key: FormKey; value: string };

export function setValue(
  dispatch: Dispatch<Action>,
  key: FormKey,
  value: string,
): void {
  dispatch({ type: 'toSetValue', key, value });
}

export function toIdle(dispatch: Dispatch<Action>): void {
  dispatch({ type: 'toIdle' });
}

export function toLoading(dispatch: Dispatch<Action>): void {
  dispatch({ type: 'toLoading' });
}

export const reducer: Reducer<State, Action> = (
  state: State,
  action: Action,
): State => {
  switch (action.type) {
    case 'toIdle':
      return { ...state, step: 'idle' };
    case 'toLoading':
      return { ...state, step: 'loading' };
    case 'toSetValue':
      return setValueState(state, action);
    default:
      return state;
  }
};

const setValueState = (
  state: State,
  action: Extract<Action, { type: 'toSetValue' }>,
): State => {
  return {
    ...state,
    formData: { ...state.formData, [action.key]: action.value },
  };
};
