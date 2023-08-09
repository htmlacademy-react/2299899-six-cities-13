import { useAppSelector } from '../hooks';

export const useCurrentCity = () => useAppSelector((state) => state.city);

export const useDataPostedStatus = () =>
  useAppSelector((state) => state.isPosted);
