import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { fonts } from '@/data/fonts';

interface SearchWithSuggestionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchWithSuggestions({ searchQuery, onSearchChange }: SearchWithSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allSuggestions = useMemo(() => {
    return fonts.map((f) => f.name);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allSuggestions
        .filter(suggestion =>
          suggestion.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6);
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [searchQuery, allSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowSuggestions(false);
      inputRef.current?.blur();
      console.log('Search for:', searchQuery);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-80">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400/80" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search fonts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="pl-10 pr-9 bg-zinc-800/50 border-cyan-400/20 text-cyan-50 placeholder:text-cyan-400/60 focus:border-cyan-400/40 focus:ring-cyan-400/20"
        />
        {searchQuery && (
          <Button
            onClick={clearSearch}
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-900/20"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-zinc-800 border border-cyan-400/20 rounded-lg shadow-lg shadow-cyan-400/10 overflow-hidden"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left text-cyan-50 hover:bg-cyan-900/30 transition-colors duration-150 border-b border-cyan-400/10 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-cyan-400/60" />
                  <span className="text-sm">{suggestion}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}