import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { type TRootState, type TAppDispatch } from '@/store/store';

const useAppDispatch = () => useDispatch<TAppDispatch>();
const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export { useAppDispatch, useAppSelector };
