'use client';

import React from 'react';
import type { FontConfig } from './types';
import { DEFAULT_SAMPLE_TEXT } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Baseline, Bold, Palette, Copy, MoveHorizontal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Separator } from '../ui/separator';
import { Combobox } from '../ui/combobox';

interface FontPanelProps {
  fontConfig: FontConfig;
  onUpdate: (newConfig: Partial<FontConfig>) => void;
  onSetLivePreview: () => void;
}

const fontWeights = [
  { label: 'Thin (100)', value: 100 },
  { label: 'Extra Light (200)', value: 200 },
  { label: 'Light (300)', value: 300 },
  { label: 'Regular (400)', value: 400 },
  { label: 'Medium (500)', value: 500 },
  { label: 'Semi Bold (600)', value: 600 },
  { label: 'Bold (700)', value: 700 },
  { label: 'Extra Bold (800)', value: 800 },
  { label: 'Black (900)', value: 900 },
];

const popularFonts = [
  { label: "Roboto", value: "Roboto" },
  { label: "Open Sans", value: "Open Sans" },
  { label: "Lato", value: "Lato" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Oswald", value: "Oswald" },
  { label: "Source Sans Pro", value: "Source Sans Pro" },
  { label: "Merriweather", value: "Merriweather" },
  { label: "PT Sans", value: "PT Sans" },
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "Nunito", value: "Nunito" },
  { label: "Lora", value: "Lora" },
  { label: "Poppins", value: "Poppins" },
  { label: "Inter", value: "Inter" },
  { label: "Raleway", value: "Raleway" },
  { label: "Slabo 27px", value: "Slabo 27px" },
];

export function FontPanel({ fontConfig, onUpdate, onSetLivePreview }: FontPanelProps) {
  const { toast } = useToast();


  const previewStyle: React.CSSProperties = {
    fontFamily: fontConfig.fontFamilyQuery,
    fontSize: `${fontConfig.size}px`,
    fontWeight: fontConfig.weight,
    letterSpacing: `${fontConfig.letterSpacing}px`,
    color: fontConfig.color,
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline truncate" style={{ fontFamily: fontConfig.fontFamilyQuery || 'inherit', color: fontConfig.color }}>
          {fontConfig.name || "Enter Font Name"}
        </CardTitle>
        <CardDescription>Adjust properties and see the font in action.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div 
          className="p-4 border rounded-md min-h-[150px] max-h-[250px] overflow-y-auto bg-muted/20 break-words" 
          style={previewStyle}
          aria-label={`Preview of font ${fontConfig.name}`}
        >
          {DEFAULT_SAMPLE_TEXT}
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="font-properties">
            <AccordionTrigger className="text-sm font-medium">Font Properties</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div>
                <Label htmlFor={`${fontConfig.id}-fontName`} className="text-xs">Font Name (from Google Fonts)</Label>
                <Combobox
                  options={popularFonts}
                  value={fontConfig.name}
                  onChange={(value) => onUpdate({ name: value })}
                  placeholder="Select a font..."
                  searchPlaceholder="Search fonts..."
                  notFoundMessage="Font not found."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`${fontConfig.id}-fontSize`} className="text-xs flex items-center"><Baseline className="mr-1 h-4 w-4" />Size (px)</Label>
                  <Input
                    id={`${fontConfig.id}-fontSize`}
                    type="number"
                    value={fontConfig.size}
                    onChange={(e) => onUpdate({ size: parseInt(e.target.value, 10) || 0 })}
                    min="8"
                    max="128"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`${fontConfig.id}-fontWeight`} className="text-xs flex items-center"><Bold className="mr-1 h-4 w-4" />Weight</Label>
                  <Select
                    value={String(fontConfig.weight)}
                    onValueChange={(value) => onUpdate({ weight: parseInt(value, 10) })}
                  >
                    <SelectTrigger id={`${fontConfig.id}-fontWeight`} className="mt-1">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontWeights.map(w => (
                        <SelectItem key={w.value} value={String(w.value)}>{w.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <Label htmlFor={`${fontConfig.id}-letterSpacing`} className="text-xs flex items-center"><MoveHorizontal className="mr-1 h-4 w-4" />Spacing (px)</Label>
                  <Input
                    id={`${fontConfig.id}-letterSpacing`}
                    type="number"
                    value={fontConfig.letterSpacing}
                    onChange={(e) => onUpdate({ letterSpacing: parseFloat(e.target.value) || 0 })}
                    step="0.1"
                    min="-5"
                    max="20"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`${fontConfig.id}-color`} className="text-xs flex items-center"><Palette className="mr-1 h-4 w-4" />Color</Label>
                  <Input
                    id={`${fontConfig.id}-color`}
                    type="color"
                    value={fontConfig.color}
                    onChange={(e) => onUpdate({ color: e.target.value })}
                    className="mt-1 w-full h-10 p-1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <Button onClick={onSetLivePreview} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Copy className="mr-2 h-4 w-4" />
          Apply to Live Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
