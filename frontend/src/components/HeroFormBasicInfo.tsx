'use client';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import { HeroFormData } from '@/schemas/heroSchema';

interface HeroFormBasicInfoProps {
    control: Control<HeroFormData>;
    errors: FieldErrors<HeroFormData>;
}

export default function HeroFormBasicInfo({ control, errors }: HeroFormBasicInfoProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="nickname"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Nickname"
                            fullWidth
                            error={!!errors.nickname}
                            helperText={errors.nickname?.message}
                        />
                    )}
                />
                <Controller
                    name="real_name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Real Name"
                            fullWidth
                            error={!!errors.real_name}
                            helperText={errors.real_name?.message}
                        />
                    )}
                />
            </div>
        </div>
    );
}
