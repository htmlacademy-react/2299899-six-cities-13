import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Offer } from '../../mocks/offer';
import { Map, TileLayer } from 'leaflet';

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  offer: Offer | undefined
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && offer) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: offer.lat,
          lng: offer.lng,
        },
        zoom: 10,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, offer]);

  return map;
}
