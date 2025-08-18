import { useState } from 'react';
import { Download, Copy, Check, Type, RotateCcw, Shuffle, Settings, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Font } from '@/types/font';
import { motion } from 'framer-motion';
import { getFontInfo } from "@/utils/fontUtils";
import { sampleTexts } from '@/data/fonts';

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
  index: number;
  onDownloadClick: (font: Font) => void;
}

export function FontCard({
  font,
  previewText: globalPreviewText,
  fontSize: globalFontSize,
  index,
  onDownloadClick
}: FontCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [localText, setLocalText] = useState('');
  const [localSize, setLocalSize] = useState(globalFontSize);
  const [language, setLanguage] = useState<'khmer' | 'english'>('english');

  const handleDownload = () => {
    onDownloadClick(font);
  };

  const handleCopyCSS = async () => {
    const { format } = getFontInfo(font.downloadUrl);
    const snippet = `@font-face {
  font-family: '${font.fontFamily}';
  src: url('${font.downloadUrl}') format('${format}');
  font-weight: normal;
  font-style: normal;
}`;

    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      toast({ title: "CSS Copied", description: "Ready to use in your project" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ title: "Copy Failed", description: "Could not copy CSS", variant: "destructive" });
    }
  };

  const getRandomText = () => {
    const texts = sampleTexts[language];
    setLocalText(texts[Math.floor(Math.random() * texts.length)]);
  };

  const toggleLanguage = () => {
    const newLang = language === 'khmer' ? 'english' : 'khmer';
    setLanguage(newLang);
    setLocalText(sampleTexts[newLang][0]);
  };

  const displayText = localText || globalPreviewText || font.previewText;
  const displaySize = showControls ? localSize : globalFontSize;

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      // whileHover={{ y: -8 }}
      className="group"
    >
      <div className="bg-zinc-900/70 border border-zinc-700 rounded-3xl p-8 hover:border-cyan-400/30 transition-all duration-300 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-zinc-50 mb-3 tracking-tight leading-none">
              {font.name}
            </h3>
            <div className="inline-flex px-3 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-xs font-medium tracking-wide uppercase border border-cyan-400/20">
              {font.type}
            </div>
          </div>

          <motion.button
            onClick={() => setShowControls(!showControls)}
            className={`p-3 rounded-2xl transition-all duration-200 ${showControls
              ? 'bg-cyan-400 text-zinc-900'
              : 'bg-zinc-800 text-cyan-400 hover:bg-zinc-700'
              }`}
            whileTap={{ scale: 0.95 }} // Add a slight press effect
          >
            <motion.div
              animate={{ rotate: showControls ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Settings className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </div>

        {/* Controls Panel */}
        {showControls && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-zinc-800/50 border border-cyan-400/20 rounded-2xl p-6 space-y-6">
              {/* Text Input */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Type className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-400">Custom Text</span>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={localText}
                      onChange={(e) => setLocalText(e.target.value)}
                      placeholder={`Enter ${language} text...`}
                      className="flex-1 px-4 py-3 bg-zinc-700 border border-cyan-400/20 rounded-xl text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => setLocalText('')}
                      className="px-4 py-3 bg-zinc-700 border border-cyan-400/20 rounded-xl text-cyan-400 hover:text-cyan-300 hover:bg-zinc-600 transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={toggleLanguage}
                      className="px-4 py-2 bg-zinc-700 border border-cyan-400/20 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-zinc-600 transition-colors text-sm font-medium">
                      {language === 'khmer' ? 'Switch to English' : 'Switch to Khmer'}
                    </button>
                    <button
                      onClick={getRandomText}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-700 border border-cyan-400/20 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-zinc-600 transition-colors text-sm font-medium">
                      <Shuffle className="h-3 w-3" />
                      Random Sample
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-cyan-400">Font Size</span>
                  <span className="text-sm text-cyan-400 font-mono">{localSize}px</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalSize(Math.max(12, localSize - 4))}
                    className="p-2 bg-zinc-700 border border-cyan-400/20 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-zinc-600 transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>

                  <input
                    type="range"
                    min="12"
                    max="72"
                    step="2"
                    value={localSize}
                    onChange={(e) => setLocalSize(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-zinc-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer" />
                  <button
                    onClick={() => setLocalSize(Math.min(72, localSize + 4))}
                    className="p-2 bg-zinc-700 border border-cyan-400/20 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-zinc-600 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Font Preview */}
        <div className="flex-1 mb-8">
          <div className="bg-zinc-800/30 border border-cyan-400/20 rounded-2xl p-8 min-h-[200px] flex items-center justify-center">
            <style>
              {`@font-face {
                font-family: '${font.fontFamily}';
                src: url('${font.downloadUrl}') format('truetype');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }`}
            </style>
            <p
              className="text-zinc-50 text-center leading-relaxed break-words"
              style={{
                fontFamily: `'${font.fontFamily}', 'Arial', sans-serif`,
                fontSize: `${displaySize}px`,
                lineHeight: displaySize < 24 ? '1.6' : '1.4'
              }}
            >
              {displayText}
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4">
          <div className="relative flex-1 overflow-hidden rounded-2xl">
            <button
              onClick={handleDownload}
              className="relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-cyan-900/30 text-cyan-400 rounded-2xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 font-medium group/button hover:bg-cyan-900/40">
              <span className="absolute inset-0 overflow-hidden rounded-2xl">
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/button:opacity-100 -translate-x-full group-hover/button:translate-x-full transition-all duration-500" />
              </span>
              <Download className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-y-0.5 relative z-10" />
              <span className="relative z-10">Download Font</span>
            </button>
          </div>

          <button
            onClick={handleCopyCSS}
            className="p-4 bg-cyan-900/30 border border-cyan-400/30 text-cyan-400 rounded-2xl hover:bg-cyan-900/40 hover:border-cyan-400/50 transition-colors">
            {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}