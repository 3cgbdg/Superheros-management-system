'use client';

import { useQuery } from '@tanstack/react-query';
import {
    Button,
    Pagination,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import herosService from '@/services/herosService';
import Link from 'next/link';
import HeroCard from '@/components/HeroCard';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITEMS_PER_PAGE } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


import { Suspense } from 'react';
import { IHero } from '@/types/heros';

function HerosListContent() {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1;
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['heros', page],
        queryFn: () => herosService.getHeros(page, ITEMS_PER_PAGE),
    });

    const deleteHeroMutation = useMutation({
        mutationFn: (id: string) => herosService.deleteHero(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['heros'] });
            toast.success('Hero deleted successfully!');
        },
    });

    const heros = data?.data?.data || [];
    const totalItems = data?.data?.total || 0;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`/heros?page=${value}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-vh-50 py-20">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-10 px-4">
                <p className="text-red-500">Error loading superheroes</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                    Superheroes
                </h1>
                <Link href="/heros/create" passHref >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        className="normal-case font-bold shadow-lg bg-blue-600 hover:bg-blue-700"
                    >
                        Create Superhero
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                {heros.map((hero: IHero) => (
                    <HeroCard key={hero.id} hero={hero} onDelete={() => deleteHeroMutation.mutate(hero.id)} />
                ))}
            </div>

            {heros.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No superheroes found. Create your first one!</p>
                </div>
            )}

            {totalItems > ITEMS_PER_PAGE && (
                <div className="flex justify-center mt-12 bg-white/50 backdrop-blur-sm p-4 rounded-full border border-gray-100 w-fit mx-auto shadow-sm">
                    <Pagination
                        count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </div>
            )}
        </div>
    );
}

// general loading before component is loaded
export default function HerosListPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        }>
            <HerosListContent />
        </Suspense>
    );
}

