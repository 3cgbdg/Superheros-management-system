'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Typography, Container, Box, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useRouter } from 'next/navigation';
import HeroForm from '@/components/HeroForm';
import herosService from '@/services/herosService';

export default function EditHeroPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
        queryKey: ['hero', id],
        queryFn: () => herosService.getHero(id as string),
        enabled: !!id,
    });

    const hero = data?.data;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !hero) {
        return (
            <Container className="py-10">
                <Typography color="error">Error loading superhero details</Typography>
                <IconButton onClick={() => router.push('/heros')} className="mt-4">
                    <ArrowBackIcon />
                </IconButton>
            </Container>
        );
    }

    return (
        <Container className="py-10 max-w-2xl mx-auto">
            <Box display="flex" alignItems="center" className="mb-8">
                <IconButton onClick={() => router.push(`/heros/${id}`)} className="mr-4">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" className="font-bold text-gray-800">
                    Edit Superhero
                </Typography>
            </Box>

            <HeroForm initialData={hero} isEdit />
        </Container>
    );
}
