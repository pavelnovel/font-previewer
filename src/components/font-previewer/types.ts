export interface FontConfig {
  id: string;
  name: string;
  size: number; // in px
  weight: number; // e.g., 400, 700
  letterSpacing: number; // in px
  color: string; // hex code, e.g., '#RRGGBB'
  aiRecommendation?: string;
  isLoadingRecommendation?: boolean;
  fontFamilyQuery: string; // Stores the sanitized font name for CSS font-family
}

export const DEFAULT_SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz !@#$%^&*()";
