'use client';

import React from 'react';

interface HeroSuperpowersProps {
    superpowers: string[];
}

export default function HeroSuperpowers({ superpowers }: HeroSuperpowersProps) {
    return (
        <>
            <hr className="my-6 border-gray-100" />
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-3">Superpowers</span>
            <div className="flex flex-wrap gap-2">
                {superpowers && superpowers.length > 0 ? (
                    superpowers.map((power, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                            {power}
                        </span>
                    ))
                ) : (
                    <p className="text-gray-400 text-sm italic">No superpowers listed</p>
                )}
            </div>
        </>
    );
}
