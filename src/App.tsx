import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { FilterTabs } from '@/components/FilterTabs';
import { FontGrid } from '@/components/FontGrid';
import { StatsBar } from '@/components/StatsBar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fonts } from '@/data/fonts';
import { PreviewSettings } from '@/types/font';
import { motion } from 'framer-motion';
import Particles from './components/Particles'; // for background

function App() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'Khmer' | 'English'>('all');

  const [previewSettings] = useLocalStorage<PreviewSettings>('fontstore-preview', {
    text: '',
    size: 32,
  });

  const filteredFonts = useMemo(() => {
    return fonts.filter((font) => {
      const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || font.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const handleDownloadAll = () => {
    toast({
      title: "Bulk Download",
      description: `Starting download of ${filteredFonts.length} fonts...`,
    });
  };

  const khmerFonts = fonts.filter(f => f.type === 'Khmer').length;
  const englishFonts = fonts.filter(f => f.type === 'English').length;

  return (
    <div className="min-h-screen bg-zinc-950 text-cyan-50 relative">
      {/* DotGrid as fixed background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      {/* Dark overlay to make background more subtle */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-zinc-950/60"></div>
      {/* Main content with relative positioning to appear above background */}
      <div className="relative z-10">
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onDownloadAll={handleDownloadAll}
        />

        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Font
              </span>
              <span className="block text-cyan-400/80">Collection</span>
            </h1>
            <p className="text-lg text-cyan-400/80 max-w-xl mx-auto leading-relaxed font-light">
              Curated typography for modern design. Browse, preview, and download
              professional fonts for your next project.
            </p>
          </motion.div>

          <div className="space-y-8">
            <StatsBar
              totalFonts={fonts.length}
              khmerFonts={khmerFonts}
              englishFonts={englishFonts}
              filteredCount={filteredFonts.length}
            />

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <FilterTabs selectedType={selectedType} onTypeChange={setSelectedType} />

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm text-cyan-400/80"
              >
                {filteredFonts.length} font{filteredFonts.length !== 1 ? 's' : ''} found
              </motion.div>
            </div>

            <FontGrid
              fonts={filteredFonts}
              previewText={previewSettings.text}
              fontSize={previewSettings.size}
            />
          </div>
        </main>

        <Footer />
        <Toaster />
      </div>
    </div>
  );
}

export default App;