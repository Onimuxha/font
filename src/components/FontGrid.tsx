import { useState, useMemo, useEffect } from 'react';
import { FontCard } from './FontCard';
import { Pagination } from './Pagination';
import { DownloadConfirmationDialog } from './DownloadConfirmationDialog';
import { Font } from '@/types/font';
import { useToast } from '@/hooks/use-toast';
import { getFontInfo } from "@/utils/fontUtils";

interface FontGridProps {
  fonts: Font[];
  previewText: string;
  fontSize: number;
  itemsPerPage?: number;
  filterType?: 'all' | 'Khmer' | 'English';
}

export function FontGrid({
  fonts,
  previewText,
  fontSize,
  itemsPerPage = 9,
  filterType = 'all'
}: FontGridProps) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  const totalPages = Math.ceil(fonts.length / itemsPerPage);
  const paginatedFonts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return fonts.slice(startIndex, startIndex + itemsPerPage);
  }, [fonts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadClick = (font: Font) => {
    setSelectedFont(font);
    setShowDownloadDialog(true);
  };

  const handleConfirmDownload = () => {
    if (!selectedFont) return;

    try {
      const { ext } = getFontInfo(selectedFont.downloadUrl);
      const link = document.createElement("a");
      link.href = selectedFont.downloadUrl;
      link.download = `${selectedFont.name}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: `${selectedFont.name} is being downloaded`,
      });
    } catch (err) {
      toast({
        title: "Download Failed",
        description: "Could not download font",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Font Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {paginatedFonts.map((font, index) => (
          <FontCard
            key={font.id}
            font={font}
            previewText={previewText}
            fontSize={fontSize}
            index={index}
            onDownloadClick={handleDownloadClick}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={fonts.length}
      />

      {/* Download Confirmation Dialog */}
      <DownloadConfirmationDialog
        isOpen={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
        font={selectedFont}
        onConfirmDownload={handleConfirmDownload}
      />
    </div>
  );
}