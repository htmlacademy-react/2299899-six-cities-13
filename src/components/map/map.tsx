import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { Offer } from '../../types/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City } from '../../types/city';
import { useAppSelector } from '../../hooks';
import { selectCardUnderMouse } from '../../store/app-process/app-process.selectors';

type MapProps = {
  city: City;
  offers: Offer[];
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
  const { offers } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city, zoom);
  const cityLat = city.location.latitude;
  const cityLng = city.location.longitude;
  const selectedOfferId = useAppSelector(selectCardUnderMouse);
  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);

  useEffect(() => {
    if (map) {
      map.setView({ lat: cityLat, lng: cityLng }, zoom);
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
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
  }, [map, offers, selectedOffer, cityLat, cityLng, zoom]);

  return <div style={{ height }} ref={mapRef}></div>;
}
