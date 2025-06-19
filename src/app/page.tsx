'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FontPanel } from '@/components/font-previewer/FontPanel';
import { LivePreviewBox } from '@/components/font-previewer/LivePreviewBox';
import type { FontConfig } from '@/components/font-previewer/types';
import { DEFAULT_SAMPLE_TEXT } from '@/components/font-previewer/types';
import { useToast } from "@/hooks/use-toast";

const initialFontConfigs: FontConfig[] = [
  { id: 'panel-1', name: 'Roboto', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Roboto', aiRecommendation: '', isLoadingRecommendation: false },
  { id: 'panel-2', name: 'Open Sans', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Open Sans', aiRecommendation: '', isLoadingRecommendation: false },
  { id: 'panel-3', name: 'Lato', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Lato', aiRecommendation: '', isLoadingRecommendation: false },
  { id: 'panel-4', name: 'Montserrat', size: 24, weight: 400, letterSpacing: 0, color: '#333333', fontFamilyQuery: 'Montserrat', aiRecommendation: '', isLoadingRecommendation: false },
];

export default function FontPreviewerPage() {
  const [fontConfigs, setFontConfigs] = useState<FontConfig[]>(initialFontConfigs);
  const [livePreviewText, setLivePreviewText] = useState<string>(DEFAULT_SAMPLE_TEXT);
  const [activeFontForLivePreview, setActiveFontForLivePreview] = useState<FontConfig | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const { toast } = useToast();

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
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary">Font Previewer</h1>
        <p className="text-muted-foreground">Experiment with Google Fonts and get AI-powered insights.</p>
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

        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4 text-primary/90">Live Text Preview</h2>
          <LivePreviewBox
            liveText={livePreviewText}
            onTextChange={setLivePreviewText}
            activeFontConfig={activeFontForLivePreview}
          />
        </section>
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Font Previewer. Powered by Next.js and Genkit.</p>
      </footer>
    </div>
  );
}
