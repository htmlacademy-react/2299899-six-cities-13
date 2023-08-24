import { describe } from 'vitest';
import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { useRef } from 'react';
import { makeFakeCity } from '../../utils/test-mocks';
import { Map } from 'leaflet';

describe('Hook: useMap', () => {
  it('should return Leaflet Map component', () => {
    const mockCity = makeFakeCity();
    const mapRef = renderHook(() =>
      useRef<HTMLElement | null>(document.createElement('div'))
    );

    const { result } = renderHook(() =>
      useMap(mapRef.result.current, mockCity, mockCity.location.zoom)
    );
    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });

  it('should return null instead of Map if "mapRef" is null', () => {
    const mockCity = makeFakeCity();
    const mapRef = renderHook(() => useRef<HTMLElement | null>(null));

    const { result } = renderHook(() =>
      useMap(mapRef.result.current, mockCity, mockCity.location.zoom)
    );
    const map = result.current;

    expect(map).toBeNull();
  });
});
