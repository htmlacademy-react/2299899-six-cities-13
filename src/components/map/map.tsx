import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { Offer } from '../../mocks/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City } from '../../mocks/city';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | undefined;
  height: string;
  zoom: number;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
});

export default function Map(props: MapProps): JSX.Element {
  const { city, height, zoom } = props;
  const { offers, selectedOffer } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city, zoom);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.lat,
          lng: offer.lng,
        });

        marker
          .setIcon(
            selectedOffer !== undefined && selectedOffer.id === offer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <div style={{ height }} ref={mapRef}></div>;
}
