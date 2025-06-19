'use client';

import React from 'react';
import type { FontConfig } from './types';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LivePreviewBoxProps {
  liveText: string;
  onTextChange: (text: string) => void;
  activeFontConfig: FontConfig | null;
}

export function LivePreviewBox({ liveText, onTextChange, activeFontConfig }: LivePreviewBoxProps) {
  const previewStyle: React.CSSProperties = activeFontConfig ? {
    fontFamily: activeFontConfig.fontFamilyQuery,
    fontSize: `${activeFontConfig.size}px`,
    fontWeight: activeFontConfig.weight,
    letterSpacing: `${activeFontConfig.letterSpacing}px`,
    color: activeFontConfig.color,
    lineHeight: 1.6,
    transition: 'all 0.3s ease-in-out',
  } : {
    lineHeight: 1.6,
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">
          {activeFontConfig ? `Previewing with ${activeFontConfig.name}` : "Live Text Editor"}
        </CardTitle>
        <CardDescription>
          {activeFontConfig 
            ? `Enter your text below to see it rendered in ${activeFontConfig.name} with current settings.`
            : "Type your custom text here. Apply a font style from one of the panels above."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Textarea
            value={liveText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type your text here..."
            className="min-h-[200px] text-base focus:ring-primary focus:border-primary"
            aria-label="Input for live preview text"
          />
        </div>
        <div 
          className="p-4 border rounded-md min-h-[200px] bg-muted/20 break-words whitespace-pre-wrap" 
          style={previewStyle}
          aria-label="Live preview of text with selected font style"
        >
          {liveText || (activeFontConfig ? "" : "Your text will appear here...")}
        </div>
      </CardContent>
    </Card>
  );
}
