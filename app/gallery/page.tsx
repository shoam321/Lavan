'use client'

import React, { useState } from 'react'
import ModernGallery from '@/components/modern-gallery'

export default function GalleryPage() {
  // Easy photo management: just add/remove items from this array
  const [images] = useState([
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      title: 'Mountain Peak',
      subtitle: 'Majestic views at sunrise'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
      title: 'Ocean Waves',
      subtitle: 'Crashing waves at dusk'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      title: 'Portrait',
      subtitle: 'Candid moment captured'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1514080267045-ad881b06b470?w=800&h=600&fit=crop',
      title: 'City Lights',
      subtitle: 'Urban landscape at night'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop',
      title: 'Forest Path',
      subtitle: 'Nature\'s quiet sanctuary'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      title: 'Sunset',
      subtitle: 'Golden hour magic'
    },
  ])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ModernGallery images={images} autoplay={true} />
    </div>
  )
}
