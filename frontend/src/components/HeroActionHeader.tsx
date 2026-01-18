'use client';

import React from 'react';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeroActionHeaderProps {
    id: string;
    onDelete: () => void;
    isDeleting: boolean;
}

export default function HeroActionHeader({ id, onDelete, isDeleting }: HeroActionHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex items-center mb-6">
            <IconButton onClick={() => router.push('/heros')} className="mr-4">
                <ArrowBackIcon />
            </IconButton>
            <h1 className="text-3xl font-bold text-gray-800">Hero Details</h1>
            <div className="flex-grow" />
            <div className="flex gap-2">
                <Link href={`/heros/${id}/edit`} passHref legacyBehavior>
                    <Button variant="outlined" color="primary" startIcon={<EditIcon />} className="normal-case">
                        Edit
                    </Button>
                </Link>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="normal-case"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </div>
    );
}
