'use client';

import { Control, Controller, FieldErrors, useFieldArray } from 'react-hook-form';
import { TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { HeroFormData } from '@/schemas/heroSchema';

interface HeroFormImagesProps {
    control: Control<HeroFormData>;
    errors: FieldErrors<HeroFormData>;
}

export default function HeroFormImages({ control, errors }: HeroFormImagesProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "images",
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Images (URLs)</h2>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Controller
                                name={`images.${index}.value` as const}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        placeholder="https://example.com/image.jpg"
                                        fullWidth
                                        size="small"
                                        error={!!errors.images?.[index]?.value}
                                        helperText={errors.images?.[index]?.value?.message}
                                    />
                                )}
                            />
                            <IconButton onClick={() => remove(index)} color="error" disabled={fields.length === 1}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                ))}
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => append({ value: '' })}
                    className="normal-case text-blue-600 hover:bg-blue-50"
                    variant="text"
                >
                    Add Image URL
                </Button>
                {(errors.images as any)?.root?.message && (
                    <p className="text-xs text-red-500 mt-1">{(errors.images as any).root.message}</p>
                )}
            </div>
        </div>
    );
}
