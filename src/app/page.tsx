'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FontPanel } from '@/components/font-previewer/FontPanel';
import { LivePreviewBox } from '@/components/font-previewer/LivePreviewBox';
import type { FontConfig } from '@/components/font-previewer/types';
import { DEFAULT_SAMPLE_TEXT } from '@/components/font-previewer/types';
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from '@/components/analytics/Analytics';

const initialFontConfigs: FontConfig[] = [
  { id: 'panel-1', name: 'Roboto', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Roboto' },
  { id: 'panel-2', name: 'Open Sans', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Open Sans' },
  { id: 'panel-3', name: 'Lato', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Lato' },
  { id: 'panel-4', name: 'Montserrat', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Montserrat' },
];

export default function FontPreviewerPage() {
  const [fontConfigs, setFontConfigs] = useState<FontConfig[]>(initialFontConfigs);
  const [livePreviewText, setLivePreviewText] = useState<string>(DEFAULT_SAMPLE_TEXT);
  const [activeFontForLivePreview, setActiveFontForLivePreview] = useState<FontConfig | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { trackFontChange, trackFontComparison, trackFeatureUsage, trackTextPreview } = useAnalytics();

  const sanitizeFontNameForCSS = (fontName: string) => {
    // Replace spaces with '+' for Google Fonts API, keep spaces for CSS font-family
    // CSS font-family needs quotes if name contains spaces or special chars
    return fontName.includes(' ') ? `'${fontName}'` : fontName;
  };
  
  const loadGoogleFont = useCallback((fontName: string) => {
    if (!fontName.trim() || fontName === 'Inter') return; // Inter is loaded globally

    const fontQueryName = fontName.replace(/\s+/g, '+');
    // Load all weights to allow easy switching in select
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontQueryName}:wght@100;200;300;400;500;600;700;800;900&display=swap`;

    if (!loadedFonts.has(fontUrl)) {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      setLoadedFonts(prev => new Set(prev).add(fontUrl));
    }
  }, [loadedFonts]);

  useEffect(() => {
    initialFontConfigs.forEach(config => loadGoogleFont(config.name));
    // Track initial font comparison
    const fontNames = initialFontConfigs.map(config => config.name);
    trackFontComparison(fontNames);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load initial fonts once on mount

  const updateFontConfig = (index: number, newConfig: Partial<FontConfig>) => {
    setFontConfigs(prevConfigs => {
      const updatedConfigs = [...prevConfigs];
      const oldConfig = updatedConfigs[index];
      updatedConfigs[index] = { ...oldConfig, ...newConfig };

      if (newConfig.name && newConfig.name !== oldConfig.name) {
        loadGoogleFont(newConfig.name);
        updatedConfigs[index].fontFamilyQuery = sanitizeFontNameForCSS(newConfig.name);
        // Track font change
        trackFontChange(newConfig.name, updatedConfigs[index].id);
      }
      
      // Track feature usage for other changes
      if (newConfig.size !== undefined && newConfig.size !== oldConfig.size) {
        trackFeatureUsage('font_size', newConfig.size);
      }
      if (newConfig.weight !== undefined && newConfig.weight !== oldConfig.weight) {
        trackFeatureUsage('font_weight', newConfig.weight);
      }
      if (newConfig.letterSpacing !== undefined && newConfig.letterSpacing !== oldConfig.letterSpacing) {
        trackFeatureUsage('letter_spacing', newConfig.letterSpacing);
      }
      if (newConfig.color !== undefined && newConfig.color !== oldConfig.color) {
        trackFeatureUsage('font_color', newConfig.color);
      }
      
      // If this font was active for live preview, update that too
      if (activeFontForLivePreview?.id === updatedConfigs[index].id) {
        setActiveFontForLivePreview(updatedConfigs[index]);
      }
      return updatedConfigs;
    });
  };
  
  const handleSetLivePreviewFont = (config: FontConfig) => {
    setActiveFontForLivePreview(config);
    toast({
      title: "Live Preview Updated",
      description: `Live preview now uses ${config.name}.`,
    });
    // Track live preview usage
    trackFeatureUsage('live_preview_font', config.name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary">Compare Google Fonts Side-by-Side</h1>
        <p className="text-lg text-muted-foreground mt-2">Preview and test 1,400+ Google Fonts with real-time customization. Find the perfect typography for your project.</p>
      </header>

      <main className="flex-grow">
        <section className="mb-8">
          <h2 className="text-2xl font-headline font-semibold mb-4 text-primary/90">Font Panels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {fontConfigs.map((config, index) => (
              <FontPanel
                key={config.id}
                fontConfig={config}
                onUpdate={(newValues) => updateFontConfig(index, newValues)}
                onSetLivePreview={() => handleSetLivePreviewFont(config)}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-headline font-semibold mb-6 text-primary/90">How to Use This Tool</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary/80">Getting Started</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Each panel shows a different Google Font with customizable settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Change font family, size, weight, letter spacing, and color</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Click "Use for Live Preview" to test a font with custom text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Compare multiple fonts side-by-side to find the perfect match</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary/80">Pro Tips</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Try different weights (100-900) to see font variations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Adjust letter spacing for better readability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Test with your actual content in the live preview</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Consider contrast and readability for your use case</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3 text-primary/80">About Google Fonts</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Google Fonts is a free, open-source library of over 1,400 font families that you can use in your web projects. 
                  These fonts are optimized for the web, load quickly, and are maintained by Google. They're perfect for websites, 
                  applications, and any digital project where typography matters.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <a 
                    href="https://fonts.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <span>Browse All Google Fonts</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <span className="text-sm text-muted-foreground">
                    Discover fonts by category, language, and popularity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4 text-primary/90">Live Text Preview</h2>
          <LivePreviewBox
            liveText={livePreviewText}
            onTextChange={(text) => {
              setLivePreviewText(text);
              // Track text preview changes (debounced would be better in production)
              if (text.length !== livePreviewText.length) {
                trackTextPreview(text.length);
              }
            }}
            activeFontConfig={activeFontForLivePreview}
          />
        </section>
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Simple Font Compare - Free Google Fonts Comparison Tool</p>
        <p className="mt-2">
          <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Powered by Google Fonts
          </a>
          {' • '}
          <a href="https://github.com/pavelnovel/font-previewer" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Open Source
          </a>
        </p>
      </footer>
    </div>
  );
}
