'use client';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import { HeroFormData } from '@/schemas/heroSchema';

interface HeroFormDetailsProps {
    control: Control<HeroFormData>;
    errors: FieldErrors<HeroFormData>;
}

export default function HeroFormDetails({ control, errors }: HeroFormDetailsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Hero Details</h2>
            <div className="flex flex-col gap-4">
                <Controller
                    name="catch_phrase"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Catch Phrase"
                            fullWidth
                            error={!!errors.catch_phrase}
                            helperText={errors.catch_phrase?.message}
                        />
                    )}
                />

                <Controller
                    name="origin_description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Origin Description"
                            fullWidth
                            multiline
                            rows={4}
                            error={!!errors.origin_description}
                            helperText={errors.origin_description?.message}
                        />
                    )}
                />
            </div>
        </div>
    );
}
