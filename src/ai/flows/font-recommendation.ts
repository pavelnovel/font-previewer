// FontRecommendation.tsx
'use server';

/**
 * @fileOverview Provides AI-powered font recommendations based on the font's characteristics.
 *
 * - getFontRecommendation - A function that takes a font name and returns a recommendation for its use.
 * - FontRecommendationInput - The input type for the getFontRecommendation function.
 * - FontRecommendationOutput - The return type for the getFontRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FontRecommendationInputSchema = z.object({
  fontName: z.string().describe('The name of the font to provide a recommendation for.'),
});
export type FontRecommendationInput = z.infer<typeof FontRecommendationInputSchema>;

const FontRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe('An AI-powered recommendation for the font, including the type of content or design style it is best suited for.'),
});
export type FontRecommendationOutput = z.infer<typeof FontRecommendationOutputSchema>;

export async function getFontRecommendation(input: FontRecommendationInput): Promise<FontRecommendationOutput> {
  return fontRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fontRecommendationPrompt',
  input: {schema: FontRecommendationInputSchema},
  output: {schema: FontRecommendationOutputSchema},
  prompt: `You are an AI assistant that specializes in providing recommendations for fonts. Given a font name, you will provide a recommendation for the font, including the type of content or design style it is best suited for.

Font Name: {{{fontName}}}
Recommendation: `,
});

const fontRecommendationFlow = ai.defineFlow(
  {
    name: 'fontRecommendationFlow',
    inputSchema: FontRecommendationInputSchema,
    outputSchema: FontRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
