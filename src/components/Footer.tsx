import { Type, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="border-t border-cyan-400/20 bg-zinc-900/80 mt-16 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-900/30 rounded-lg border border-cyan-400/20">
              <Type className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                FontStore
              </h3>
              <p className="text-sm text-cyan-400/80">Personal Font Collection</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              className="text-cyan-400/80 hover:text-cyan-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:your@email.com"
              className="text-cyan-400/80 hover:text-cyan-300 transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-cyan-400/10 text-center">
          <p className="text-sm text-cyan-400/60">
            © 2025 FontStore. All rights reserved. Fonts are property of their respective creators.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}