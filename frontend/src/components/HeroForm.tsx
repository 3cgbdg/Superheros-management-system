'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Alert
} from '@mui/material';
import { toast } from 'react-toastify';
import { heroSchema, HeroFormData } from '@/schemas/heroSchema';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import herosService from '@/services/herosService';
import { IHero } from '@/types/heros';
import HeroFormBasicInfo from './HeroFormBasicInfo';
import HeroFormDetails from './HeroFormDetails';
import HeroFormSuperpowers from './HeroFormSuperpowers';
import HeroFormImages from './HeroFormImages';

interface HeroFormProps {
    initialData?: IHero;
    isEdit?: boolean;
}

export default function HeroForm({ initialData, isEdit }: HeroFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<HeroFormData>({
        resolver: zodResolver(heroSchema),
        defaultValues: initialData ? {
            ...initialData,
            superpowers: initialData.superpowers.map(p => typeof p === 'string' ? { value: p } : p),
            images: initialData.images.map(i => typeof i === 'string' ? { value: i } : i),
        } : {
            nickname: '',
            real_name: '',
            origin_description: '',
            catch_phrase: 'No catch phrase',
            superpowers: [{ value: '' }],
            images: [{ value: '' }],
        },
    });

    const { data: suggestionsData } = useQuery({
        queryKey: ['superpowers'],
        queryFn: () => herosService.getSuperpowers(),
    });

    const suggestions = suggestionsData?.data || [];

    const mutation = useMutation({
        mutationFn: (formData: HeroFormData) => {
            const data = {
                ...formData,
                superpowers: formData.superpowers.map(p => p.value),
                images: formData.images.map(i => i.value),
            };
            if (isEdit && initialData?.id) {
                return herosService.updateHero(initialData.id, data as any);
            }
            return herosService.createHero(data as any);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['heros'] });
            if (isEdit) {
                queryClient.invalidateQueries({ queryKey: ['hero', initialData?.id] });
            }
            toast.success(isEdit ? 'Hero updated successfully!' : 'Hero created successfully!');
            router.push('/heros');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const message = error.response?.data?.message || 'Something went wrong';
            setServerError(message);
        },
    });

    const onSubmit = (data: HeroFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {serverError && <Alert severity="error" className="mb-4">{serverError}</Alert>}

            <HeroFormBasicInfo control={control} errors={errors} />

            <HeroFormDetails control={control} errors={errors} />

            <HeroFormSuperpowers
                control={control}
                errors={errors}
                suggestions={suggestions}
            />

            <HeroFormImages control={control} errors={errors} />

            <div className="flex justify-end gap-4 pt-4">
                <Button
                    onClick={() => router.back()}
                    disabled={mutation.isPending}
                    className="normal-case text-gray-600"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={mutation.isPending}
                    className="px-8 py-2 normal-case font-bold shadow-md bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                    {mutation.isPending ? 'Saving...' : (isEdit ? 'Update Hero' : 'Create Hero')}
                </Button>
            </div>
        </form>
    );
}
