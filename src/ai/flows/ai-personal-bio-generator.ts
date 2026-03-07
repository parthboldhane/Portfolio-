'use server';
/**
 * @fileOverview An AI agent to help draft a compelling personal biography for a portfolio.
 *
 * - generatePersonalBio - A function that handles the personal biography generation process.
 * - AIPersonalBioGeneratorInput - The input type for the generatePersonalBio function.
 * - AIPersonalBioGeneratorOutput - The return type for the generatePersonalBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPersonalBioGeneratorInputSchema = z.object({
  name: z.string().describe("The portfolio owner's name."),
  role: z.string().describe("The portfolio owner's current role or desired role."),
  skills: z.array(z.string()).describe('A list of technical skills and programming languages the portfolio owner is proficient in.'),
  experiences: z.array(z.string()).describe('A list of past experiences and projects, including descriptions, roles, and relevant links.'),
});
export type AIPersonalBioGeneratorInput = z.infer<typeof AIPersonalBioGeneratorInputSchema>;

const AIPersonalBioGeneratorOutputSchema = z.object({
  bio: z.string().describe('A compelling and professional personal biography.'),
});
export type AIPersonalBioGeneratorOutput = z.infer<typeof AIPersonalBioGeneratorOutputSchema>;

export async function generatePersonalBio(input: AIPersonalBioGeneratorInput): Promise<AIPersonalBioGeneratorOutput> {
  return aiPersonalBioGeneratorFlow(input);
}

const aiPersonalBioGeneratorPrompt = ai.definePrompt({
  name: 'aiPersonalBioGeneratorPrompt',
  input: {schema: AIPersonalBioGeneratorInputSchema},
  output: {schema: AIPersonalBioGeneratorOutputSchema},
  prompt: `You are an expert copywriter specializing in crafting professional and compelling personal biographies for portfolio websites.
Your goal is to create a concise, engaging, and professional self-introduction based on the provided information.
Highlight the individual's expertise, key skills, and relevant experiences to showcase their capabilities and aspirations.

Here is the information about the individual:

Name: {{{name}}}
Role: {{{role}}}

Skills:
{{#each skills}}- {{{this}}}
{{/each}}

Experiences/Projects:
{{#each experiences}}- {{{this}}}
{{/each}}

Based on the above, draft a compelling personal biography (around 100-150 words) that can be used on a professional portfolio website.
Focus on creating a narrative that connects their skills and experiences to their professional identity and future goals.
The output should be a JSON object with a single field 'bio' containing the generated biography.`,
});

const aiPersonalBioGeneratorFlow = ai.defineFlow(
  {
    name: 'aiPersonalBioGeneratorFlow',
    inputSchema: AIPersonalBioGeneratorInputSchema,
    outputSchema: AIPersonalBioGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await aiPersonalBioGeneratorPrompt(input);
    return output!;
  }
);
