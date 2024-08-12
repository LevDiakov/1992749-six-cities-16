import {useEffect, useRef} from 'react';
import leaflet, { layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City, Offer } from '../../types/types';

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer;
  className: string;
}

function Map({city, offers, selectedOffer, className}: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      map.setView([ city.location.latitude, city.location.longitude ], city.location.zoom);

      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer !== undefined && point.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [city.location.latitude, city.location.longitude, city.location.zoom, map, offers, selectedOffer]);

  return (
    <section className={`${className}__map map`} ref={mapRef}></section>
  );
}

export default Map;

