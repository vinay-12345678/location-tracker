import { create } from './createStore';
import _get from 'lodash/get';

/**
 * App Store State Type
 */
export type TAppState = {
  isTracking: boolean;
};

/**
 * App Store - Global app-level configuration and state
 *
 * This store manages app-wide settings and configurations that persist across sessions.
 * Uses MMKV for fast, persistent storage.
 */
const useAppStore = create<TAppState>(() => ({
  isTracking: false,
}));

export const getIsTracking = (state: TAppState): boolean => {
  return _get(state, ['isTracking'], false);
};

export const toggleTracking = (isTracking: boolean) => {
  useAppStore.setState((state) => ({ ...state, isTracking }));
};

export default useAppStore;
