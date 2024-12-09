import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePlacesAutocomplete } from '../../lib/places';

interface PlaceResult {
  city: string;
  country: string;
  fullText: string;
}

const TestScrapingForm: React.FC = () => {
  const [keyword, setKeyword] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState('');
  const [lastUsed, setLastUsed] = React.useState<Date | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    checkLastUsed();
  }, []);

  const checkLastUsed = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('test_searches')
        .select('last_used')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setLastUsed(new Date(data.last_used));
      }
    }
  };

  const canUseTest = () => {
    if (!lastUsed) return true;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return lastUsed < oneMonthAgo;
  };

  const handlePlaceSelect = (result: PlaceResult) => {
    setLocation(result.fullText);
  };

  usePlacesAutocomplete(inputRef, handlePlaceSelect);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!keyword.trim()) {
      setError('Please enter a keyword');
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

      if (!canUseTest()) {
        throw new Error('Test search can only be used once per month');
      }

      // Record the test usage
      const { error: usageError } = await supabase
        .from('test_searches')
        .upsert({
          user_id: user.id,
          last_used: new Date().toISOString()
        });

      if (usageError) throw usageError;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      alert('Test search completed! In the full version, you can search for multiple keywords and get more results.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSearching(false);
      await checkLastUsed();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
    >
      <h3 className="text-xl font-heading font-bold text-dark-purple mb-4">
        Try Leadsy - Test Search
      </h3>
      <p className="text-dark-purple mb-6 text-sm">
        Test our lead generation with one free search per month (limited to 10 results)
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark-purple mb-2">
            Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter one keyword"
            className="w-full px-4 py-2 rounded-lg border-2 border-caribbean-current/20 
                     focus:border-caribbean-current focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-purple mb-2">
            Location
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search location"
              className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-caribbean-current/20 
                       focus:border-caribbean-current focus:outline-none transition-colors"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-caribbean-current/60" />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {lastUsed && !canUseTest() && (
          <p className="text-dark-purple/60 text-sm">
            Next test available on {new Date(lastUsed.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={isSearching || (lastUsed && !canUseTest())}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Test Search
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TestScrapingForm;