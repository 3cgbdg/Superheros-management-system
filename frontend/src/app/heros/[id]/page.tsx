'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Button,
    CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import herosService from '@/services/herosService';
import { useParams, useRouter } from 'next/navigation';
import HeroActionHeader from '@/components/HeroActionHeader';
import HeroInfoSection from '@/components/HeroInfoSection';
import HeroSuperpowers from '@/components/HeroSuperpowers';
import HeroImageGallery from '@/components/HeroImageGallery';

export default function HeroDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['hero', id],
        queryFn: () => herosService.getHero(id as string),
        enabled: !!id,
    });

    const deleteMutation = useMutation({
        mutationFn: () => herosService.deleteHero(id as string),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['heros'] });
            router.push('/heros');
        },
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this hero?')) {
            deleteMutation.mutate();
        }
    };

    const hero = data?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-vh-50 py-20">
                <CircularProgress />
            </div>
        );
    }

    if (error || !hero) {
        return (
            <div className="container mx-auto py-10 px-4">
                <p className="text-red-500 mb-4">Error loading superhero details</p>
                <Button startIcon={<ArrowBackIcon />} onClick={() => router.push('/heros')} className="normal-case">
                    Back to List
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <HeroActionHeader
                id={id as string}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="min-w-0">
                        <HeroInfoSection
                            nickname={hero.nickname}
                            realName={hero.real_name}
                            catchPhrase={hero.catch_phrase}
                            description={hero.origin_description}
                        />
                        <HeroSuperpowers superpowers={hero.superpowers} />
                    </div>

                    <HeroImageGallery
                        images={hero.images}
                        nickname={hero.nickname}
                    />
                </div>
            </div>
        </div>
    );
}

