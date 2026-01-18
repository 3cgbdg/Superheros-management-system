'use client';

import React from 'react';
import { Control, Controller, FieldErrors, useFieldArray } from 'react-hook-form';
import { TextField, Button, IconButton, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { HeroFormData } from '@/schemas/heroSchema';

interface HeroFormSuperpowersProps {
    control: Control<HeroFormData>;
    errors: FieldErrors<HeroFormData>;
    suggestions: string[];
}

export default function HeroFormSuperpowers({ control, errors, suggestions }: HeroFormSuperpowersProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "superpowers",
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Superpowers</h2>
            <div className="space-y-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <Controller
                            name={`superpowers.${index}.value` as const}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Autocomplete
                                    freeSolo
                                    options={value.length >= 2 ? suggestions.filter(s => s.toLowerCase().startsWith(value.toLowerCase())) : []}
                                    value={value}
                                    onInputChange={(_, newValue) => onChange(newValue)}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="e.g. Flight, Strength"
                                            size="small"
                                            error={!!errors.superpowers?.[index]?.value}
                                            helperText={errors.superpowers?.[index]?.value?.message}
                                        />
                                    )}
                                />
                            )}
                        />
                        <IconButton onClick={() => remove(index)} color="error" disabled={fields.length === 1}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => append({ value: '' })}
                    className="normal-case text-blue-600 hover:bg-blue-50"
                    variant="text"
                >
                    Add Superpower
                </Button>
                {(errors.superpowers as any)?.root?.message && (
                    <p className="text-xs text-red-500 mt-1">{(errors.superpowers as any).root.message}</p>
                )}
            </div>
        </div>
    );
}
