import { useAppSelector } from '../hooks';

export const useCurrentCity = () => useAppSelector((state) => state.city);
