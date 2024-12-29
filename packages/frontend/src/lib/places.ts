import { useEffect, useCallback } from 'react';

export interface PlaceResult {
  city: string;
  country: string;
  fullText: string;
}

export const usePlacesAutocomplete = (
  inputRef: React.RefObject<HTMLInputElement>,
  onPlaceSelect: (result: PlaceResult) => void
) => {
  const initAutocomplete = useCallback(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['(cities)'],
      fields: ['address_components', 'formatted_address']
    });

    const handlePlaceSelect = () => {
      const place = autocomplete.getPlace();
      
      if (place.address_components) {
        let cityName = '';
        let countryName = '';

        for (const component of place.address_components) {
          const componentType = component.types[0];

          if (componentType === 'locality' || componentType === 'postal_town') {
            cityName = component.long_name;
          }

          if (componentType === 'country') {
            countryName = component.long_name;
          }
        }

        if (cityName && countryName) {
          onPlaceSelect({
            city: cityName,
            country: countryName,
            fullText: place.formatted_address || `${cityName}, ${countryName}`
          });
        }
      }
    };

    autocomplete.addListener('place_changed', handlePlaceSelect);

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [inputRef, onPlaceSelect]);

  useEffect(() => {
    const cleanup = initAutocomplete();
    return () => cleanup?.();
  }, [initAutocomplete]);
};