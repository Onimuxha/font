export interface Font {
  id: string;
  name: string;
  type: 'Khmer' | 'English';
  fileName: string;
  fontFamily: string;
  previewText: string;
  downloadUrl: string;
}

export interface PreviewSettings {
  text: string;
  size: number;
}