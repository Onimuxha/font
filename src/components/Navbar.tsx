import { Type } from 'lucide-react';
import { SearchWithSuggestions } from './SearchWithSuggestions';
import { motion } from 'framer-motion';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDownloadAll: () => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-cyan-400/20 bg-zinc-900/60 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="p-2 bg-cyan-400/10 rounded-lg border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors">
              <Type className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              FontStore
            </h1>
          </motion.div>
          
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <SearchWithSuggestions
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}