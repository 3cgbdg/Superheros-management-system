import { z } from 'zod';

export const heroSchema = z.object({
    nickname: z.string().min(2, 'Nickname must be at least 2 characters'),
    real_name: z.string().min(2, 'Real name must be at least 2 characters'),
    origin_description: z.string().min(10, 'Description must be at least 10 characters'),
    catch_phrase: z.string().min(1),
    superpowers: z.array(z.object({ value: z.string().min(1, 'Superpower cannot be empty') }))
        .min(1, 'At least one superpower is required')
        .refine((items) => {
            const values = items.map(i => i.value.toLowerCase().trim());
            return new Set(values).size === values.length;
        }, { message: 'Superpowers must be unique' }),
    images: z.array(z.object({ value: z.string().url('Invalid image URL') })).min(1, 'At least one image URL is required'),
});

export type HeroFormData = z.infer<typeof heroSchema>;
