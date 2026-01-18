'use client';

import React from 'react';

interface HeroImageGalleryProps {
    images: string[];
    nickname: string;
}

export default function HeroImageGallery({ images, nickname }: HeroImageGalleryProps) {
    return (
        <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-4">Images</span>
            <div className="grid grid-cols-2 gap-4">
                {images && images.length > 0 ? (
                    images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                            <img
                                src={img}
                                alt={`${nickname} ${idx}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-sm italic col-span-2">No images available</p>
                )}
            </div>
        </div>
    );
}
