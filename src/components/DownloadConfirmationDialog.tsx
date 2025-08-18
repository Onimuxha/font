import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Download, FileText, Info } from 'lucide-react';
import { Font } from '@/types/font';

interface DownloadConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  font: Font | null;
  onConfirmDownload: () => void;
}

export function DownloadConfirmationDialog({
  isOpen,
  onOpenChange,
  font,
  onConfirmDownload
}: DownloadConfirmationDialogProps) {
  if (!font) return null;

  const handleDownload = () => {
    onConfirmDownload();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-zinc-900/95 border border-cyan-400/20 text-cyan-50 max-w-md backdrop-blur-sm">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-900/30 rounded-lg border border-cyan-400/20">
              <Download className="h-5 w-5 text-cyan-400" />
            </div>
            <AlertDialogTitle className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Download Font
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-cyan-100 space-y-3">
            <div className="bg-zinc-800/50 border border-cyan-400/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-cyan-400/80" />
                <span className="font-medium text-cyan-300">{font.name}</span>
              </div>
              <div className="text-sm text-cyan-400/80">
                Font Family: {font.fontFamily}
              </div>
              <div className="text-sm text-cyan-400/80">
                Type: {font.type}
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-cyan-300">
              <Info className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>
                By downloading this font, you agree to use it according to its license terms. 
                The font will be saved to your downloads folder.
              </span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel className="bg-zinc-800 border border-cyan-400/20 text-cyan-400 hover:bg-zinc-700/50 hover:border-cyan-400/40">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDownload}
            className="bg-cyan-400 text-zinc-900 hover:bg-cyan-300 font-medium"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}