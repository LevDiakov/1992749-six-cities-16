import { setError } from '../features/sorting-offers-by-cities';
import { store } from '../store';
import { clearErrorAction } from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
