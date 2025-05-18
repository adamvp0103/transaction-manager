import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useSelector } from 'react-redux';

// Custom Redux hooks for convenience in development
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
