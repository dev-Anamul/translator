import { z } from 'zod';

export const TranslateSchema = z.object({
    text: z.string(),
    targetLanguage: z.string(),
});

export type TranslateType = z.infer<typeof TranslateSchema>;
