import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePlacesAutocomplete } from './usePlacesAutocomplete';
import KeywordInput from './KeywordInput';
import CreditSlider from './CreditSlider';

interface PlaceResult {
  city: string;
  country: string;
  fullText: string;
}

const ScrapingForm: React.FC = () => {
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState<PlaceResult | null>(null);
  const [locationConfirmed, setLocationConfirmed] = React.useState(false);
  const [credits, setCredits] = React.useState(100);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const webhookUrl = 'https://hook.eu2.make.com/s3keh3fxy8pswbh81dpks59d14f3zgsf';

  const handlePlaceSelect = (result: PlaceResult) => {
    setSelectedLocation(result);
    setLocation(result.fullText);
    setLocationConfirmed(true);
  };

  const confirmLocation = () => {
    if (selectedLocation) {
      setLocationConfirmed(true);
    }
  };

  usePlacesAutocomplete(inputRef, handlePlaceSelect);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (keywords.length === 0) {
      setError('Please enter at least one keyword');
      return;
    }

    if (!location) {
      setError('Please select a location');
      return;
    }

    setIsSearching(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to use this feature');
      
      if (!selectedLocation) {
        throw new Error('Please select a valid location');
      }

      // Prepare data for webhook
      const searchData = {
        userId: user.id,
        keywords,
        location: selectedLocation,
        numResults: credits,
        timestamp: new Date().toISOString()
      };

      // Send data to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit search request');
      }

      // Show success message with more details
      alert(`Search submitted successfully!\n\nKeywords: ${keywords.join(', ')}\nLocation: ${location}\nResults: ${credits}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm p-8"
    >
      <h3 className="text-2xl font-heading font-bold text-dark-purple mb-6">
        Generate Leads
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dark-purple mb-4">
            Keywords (up to 5)
          </label>
          <KeywordInput 
            keywords={keywords} 
            setKeywords={setKeywords} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-purple mb-4">
            Location
          </label>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={location}
              type="text"
              placeholder="Type to search and select a location"
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationConfirmed(false);
                setSelectedLocation(null);
              }}
              onFocus={() => {
                if (locationConfirmed) {
                  setLocationConfirmed(false);
                  setLocation('');
                  setSelectedLocation(null);
                }
              }}
              className="w-full px-4 py-3 pl-10 rounded-lg bg-white border-2 
                       border-caribbean-current/20
                       text-dark-purple placeholder:text-dark-purple/40 focus:outline-none 
                       focus:border-caribbean-current transition-colors
                       disabled:bg-gray-50 disabled:cursor-not-allowed
                       ${locationConfirmed ? 'bg-green-50 border-green-200' : ''}"
              disabled={locationConfirmed}
            />
            <div className="relative">
              {locationConfirmed ? (
                <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              ) : (
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-caribbean-current/40" />
              )}
            </div>
            <motion.button
              type="button"
              onClick={confirmLocation}
              disabled={!selectedLocation || locationConfirmed}
              className={`px-4 py-2 rounded-lg transition-colors min-w-[100px]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       ${locationConfirmed 
                         ? 'bg-green-500 text-white' 
                         : 'bg-caribbean-current text-white hover:bg-caribbean-current/90'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {locationConfirmed ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Confirmed
                </span>
              ) : (
                'Confirm'
              )}
            </motion.button>
          </div>
          {location && !selectedLocation && !locationConfirmed && (
            <p className="mt-2 text-sm text-red-400">
              Please select a location from the suggestions
            </p>
          )}
          {locationConfirmed && selectedLocation && (
            <p className="mt-2 text-sm text-green-600">
              Location confirmed: {selectedLocation.city}, {selectedLocation.country}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-purple mb-4">
            Number of Results
          </label>
          <CreditSlider credits={credits} setCredits={setCredits} maxCredits={1000} />
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <motion.button
          type="submit"
          disabled={isSearching}
          className="w-full bg-caribbean-current text-white px-6 py-3 rounded-lg
                   disabled:opacity-50 disabled:cursor-not-allowed hover:bg-caribbean-current/90
                   flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Leads...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Generate Leads
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ScrapingForm;