import { useEffect, RefObject } from 'react';

// Add this type declaration at the top
declare global {
  interface Window {
    google: typeof google;
  }
}

interface PlaceResult {
  city: string;
  country: string;
  fullText: string;
}

export function usePlacesAutocomplete(
  inputRef: RefObject<HTMLInputElement>,
  onPlaceSelect: (place: PlaceResult) => void
) {
  useEffect(() => {
    if (!inputRef.current || !window.google) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['(cities)'],
      fields: ['address_components', 'formatted_address', 'geometry']
    });

    const placeChangedListener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      
      if (!place.address_components) {
        console.error('No address components found');
        return;
      }

      let city = '';
      let country = '';
      
      for (const component of place.address_components) {
        if (component.types.includes('locality')) {
          city = component.long_name;
        }
        if (component.types.includes('country')) {
          country = component.long_name;
        }
      }

      if (!city) {
        const adminArea = place.address_components.find(
          component => component.types.includes('administrative_area_level_1')
        );
        if (adminArea) {
          city = adminArea.long_name;
        }
      }

      if (city && country) {
        onPlaceSelect({
          city,
          country,
          fullText: place.formatted_address || `${city}, ${country}`
        });
      }
    });

    return () => {
      if (placeChangedListener) {
        google.maps.event.removeListener(placeChangedListener);
      }
    };
  }, [inputRef, onPlaceSelect]);
}