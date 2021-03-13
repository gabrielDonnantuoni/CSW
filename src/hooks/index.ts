import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useTimer(callback: (...params: any[]) => void,
  interval: number, ...calbackParams: any[]) {
  useEffect(() => {
    callback(...calbackParams);
    const timer = setInterval(() => {
      callback(...calbackParams);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);
}
