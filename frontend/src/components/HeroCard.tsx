'use client';

import Link from 'next/link';
import { IHero } from '@/types/heros';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface HeroCardProps {
    hero: IHero;
    onDelete?: () => void;
}

export default function HeroCard({ hero, onDelete }: HeroCardProps) {
    return (
        <div className="relative group no-underline">
            <Link href={`/heros/${hero.id}`} className="block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform group-hover:-translate-y-1">
                    <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative">
                        {hero.images && hero.images.length > 0 ? (
                            <img
                                src={hero.images[0]}
                                alt={hero.nickname}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium">
                                No Image
                            </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-center bg-white border-t border-gray-50">
                        <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors">
                            {hero.nickname}
                        </h3>
                    </div>
                </div>
            </Link>
            {onDelete && (
                <IconButton
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="absolute top-2 right-2 bg-white hover:bg-red-50 text-red-600 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 border border-gray-100"
                    size="small"
                    sx={{ backgroundColor: 'red' }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )}
        </div>
    );
}
