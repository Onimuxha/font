import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface FilterTabsProps {
  selectedType: 'all' | 'Khmer' | 'English';
  onTypeChange: (type: 'all' | 'Khmer' | 'English') => void;
}

export function FilterTabs({ selectedType, onTypeChange }: FilterTabsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="p-1 rounded-lg bg-gray-900/50 backdrop-blur-sm"
    >
      <Tabs value={selectedType} onValueChange={(value) => onTypeChange(value as any)}>
        <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 gap-1">
          <TabsTrigger
            value="all"
            className="relative z-10 rounded-md px-4 py-2 text-sm font-medium
    text-gray-400 hover:text-gray-200
    data-[state=active]:text-cyan-400"
          >
            {selectedType === 'all' && (
              <motion.span
                layoutId="tabIndicator"
                className="absolute inset-0 rounded-md bg-gray-800 border border-gray-700"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.5
                }}
              />
            )}
            <span className="relative z-10">All Fonts</span>
          </TabsTrigger>

          <TabsTrigger
  value="Khmer"
  className="relative z-10 rounded-md px-4 py-2 text-sm font-medium
    text-gray-400 hover:text-gray-200
    data-[state=active]:text-cyan-400"
>
  {selectedType === 'Khmer' && (
    <motion.span
      layoutId="tabIndicator"
      className="absolute inset-0 rounded-md bg-gray-800 border border-gray-700"
      initial={false}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5
      }}
    />
  )}
  <span className="relative z-10">Khmer</span>
</TabsTrigger>

<TabsTrigger
  value="English"
  className="relative z-10 rounded-md px-4 py-2 text-sm font-medium
    text-gray-400 hover:text-gray-200
    data-[state=active]:text-cyan-400"
>
  {selectedType === 'English' && (
    <motion.span
      layoutId="tabIndicator"
      className="absolute inset-0 rounded-md bg-gray-800 border border-gray-700"
      initial={false}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5
      }}
    />
  )}
  <span className="relative z-10">English</span>
</TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
}