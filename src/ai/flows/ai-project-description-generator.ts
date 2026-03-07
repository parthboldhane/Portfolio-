'use server';
/**
 * @fileOverview An AI agent for generating or refining project and experience descriptions.
 *
 * - generateProjectDescription - A function that handles the generation or refinement of project descriptions.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the project or experience.'),
  existingDescription: z.string().optional().describe('An optional existing description to refine.'),
  keyFeaturesOrDetails: z.array(z.string()).describe('A list of key features, achievements, or details about the project/experience.'),
  targetAudience: z.string().optional().describe('The intended audience for the description (e.g., recruiters, potential clients).'),
  tone: z.string().optional().describe('The desired tone for the description (e.g., professional, enthusiastic, concise, technical).'),
});
export type GenerateProjectDescriptionInput = z.infer<typeof GenerateProjectDescriptionInputSchema>;

const GenerateProjectDescriptionOutputSchema = z.object({
  generatedDescription: z.string().describe('The AI-generated or refined compelling description for the project/experience.'),
  wordCount: z.number().describe('The word count of the generated description.'),
});
export type GenerateProjectDescriptionOutput = z.infer<typeof GenerateProjectDescriptionOutputSchema>;

export async function generateProjectDescription(input: GenerateProjectDescriptionInput): Promise<GenerateProjectDescriptionOutput> {
  return aiProjectDescriptionGeneratorFlow(input);
}

const projectDescriptionPrompt = ai.definePrompt({
  name: 'projectDescriptionPrompt',
  input: { schema: GenerateProjectDescriptionInputSchema },
  output: { schema: GenerateProjectDescriptionOutputSchema },
  prompt: `You are an expert content writer specialized in creating compelling and professional descriptions for projects and experiences for a portfolio website.

Your task is to generate or refine a description based on the provided information, ensuring it highlights key achievements and is engaging for the target audience.

Project Title: {{{title}}}

{{#if existingDescription}}Existing Description to Refine: {{{existingDescription}}}

{{/if}}Key Features and Details:
{{#each keyFeaturesOrDetails}}- {{{this}}}
{{/each}}

{{#if targetAudience}}Target Audience: {{{targetAudience}}}
{{/if}}
{{#if tone}}Desired Tone: {{{tone}}}
{{/if}}

Instructions:
- If an 'existingDescription' is provided, use it as a base and make it more professional, concise, and impactful.
- If no 'existingDescription' is provided, generate a new description from scratch.
- Focus on quantifiable results and achievements where possible.
- Ensure the description is compelling, professional, and tailored to the target audience and desired tone.
- Keep the description to a reasonable length, typically between 100-250 words, unless a specific tone implies brevity.

Please provide only the JSON output without any conversational text.`,
});

const aiProjectDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'aiProjectDescriptionGeneratorFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await projectDescriptionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate project description.');
    }
    return output;
  }
);
