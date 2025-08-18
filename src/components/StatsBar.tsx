import { motion } from 'framer-motion';
interface StatsBarProps {
  totalFonts: number;
  khmerFonts: number;
  englishFonts: number;
  filteredCount: number;
}

export function StatsBar({ totalFonts, khmerFonts, englishFonts, filteredCount }: StatsBarProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      <div className="bg-zinc-900/70 border border-cyan-400/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          {filteredCount}
        </div>
        <div className="text-cyan-400/80 text-sm font-medium">Showing</div>
      </div>

      <div className="bg-zinc-900/70 border border-cyan-400/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
        <div className="text-3xl font-bold text-cyan-400 mb-2">{totalFonts}</div>
        <div className="text-cyan-400/80 text-sm font-medium">Total Fonts</div>
      </div>

      <div className="bg-zinc-900/70 border border-cyan-400/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
        <div className="text-3xl font-bold text-cyan-400 mb-2">{khmerFonts}</div>
        <div className="text-cyan-400/80 text-sm font-medium">Khmer Fonts</div>
      </div>

      <div className="bg-zinc-900/70 border border-cyan-400/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
        <div className="text-3xl font-bold text-cyan-400 mb-2">{englishFonts}</div>
        <div className="text-cyan-400/80 text-sm font-medium">English Fonts</div>
      </div>
    </motion.div>
  );
}