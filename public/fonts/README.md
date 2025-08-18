# Font Files Directory

Place your .ttf font files in this directory to use them in the font store.

## Supported Font Files:
- KhmerOSSiemreap.ttf
- KhmerOSBattambang.ttf  
- KhmerOSMuol.ttf
- Inter-Regular.ttf
- Roboto-Regular.ttf
- JetBrainsMono-Regular.ttf

## Adding New Fonts:

1. **Add the font file** to this `/public/fonts/` directory
2. **Update the font data** in `/src/data/fonts.ts`:
   - Add a new font object with the correct fileName and fontFamily
   - Set the downloadUrl to `/fonts/YourFontFile.ttf`
   - Add appropriate preview text
   - Include the CSS snippet for @font-face

3. **Font will be automatically loaded** when users view the font card

## Example Font Object:
```typescript
{
  id: 'unique-id',
  name: 'Your Font Name',
  type: 'Khmer' | 'English',
  fileName: 'YourFont.ttf',
  fontFamily: 'Your Font Family',
  previewText: 'Sample text in the font',
  cssSnippet: `@font-face {
    font-family: 'Your Font Family';
    src: url('./fonts/YourFont.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }`,
  downloadUrl: '/fonts/YourFont.ttf'
}
```

## Notes:
- Font files should be in .ttf format for best compatibility
- Make sure font file names match exactly in the data configuration
- The font preview will fallback to system fonts if the file is not found
- Large font files may take time to load on first view