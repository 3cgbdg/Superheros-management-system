'use client';

import { Typography, Container, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import HeroForm from '../../../components/HeroForm';

export default function CreateHeroPage() {
    const router = useRouter();

    return (
        <Container className="py-10 max-w-2xl mx-auto">
            <Box display="flex" alignItems="center" className="mb-8">
                <IconButton onClick={() => router.push('/heros')} className="mr-4">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" className="font-bold text-gray-800">
                    New Superhero
                </Typography>
            </Box>

            <HeroForm />
        </Container>
    );
}
