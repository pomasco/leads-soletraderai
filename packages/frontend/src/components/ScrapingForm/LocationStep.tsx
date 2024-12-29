import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import { usePlacesAutocomplete, PlaceResult } from '../../lib/places';

interface LocationStepProps {
  country: string;
  setCountry: (country: string) => void;
  city: string;
  setCity: (city: string) => void;
  onLocationSelect: () => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ 
  country, setCountry, city, setCity, onLocationSelect
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlaceSelect = (result: PlaceResult) => {
    setCity(result.city);
    setCountry(result.country);
    setSearchValue(result.fullText);
    setIsLoading(false);
    onLocationSelect();
  };

  usePlacesAutocomplete(inputRef, handlePlaceSelect);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-heading font-medium text-dark-purple">
        Select your location
      </h3>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-dark-purple mb-2">
            Search Location
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setIsLoading(true);
              }}
              placeholder="Type to search for a city"
              className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-caribbean-current/20 
                       focus:border-caribbean-current focus:outline-none transition-colors
                       text-dark-purple"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-caribbean-current/60 animate-spin" />
              ) : (
                <MapPin className="w-5 h-5 text-caribbean-current/60" />
              )}
            </div>
          </div>
          {city && country && (
            <p className="mt-2 text-sm text-caribbean-current">
              Selected: {city}, {country}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LocationStep;