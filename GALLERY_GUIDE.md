# Photo Gallery Integration Guide

## Quick Start

The modern photo gallery is now integrated and ready to use! Access it at `/gallery` route.

## How to Add Photos Easily

### Method 1: Update the gallery page (Recommended)

Edit `app/gallery/page.tsx` and update the `images` array:

```tsx
const [images] = useState([
  {
    id: 1,
    src: '/path-to-your-image.jpg',  // Use local images in /public or external URLs
    title: 'Image Title',
    subtitle: 'Optional subtitle description'
  },
  {
    id: 2,
    src: 'https://example.com/image.jpg',
    title: 'Another Image',
    subtitle: 'Description'
  },
  // Add more images here!
])
```

### Method 2: Use the component anywhere

Import and use `ModernGallery` in any page:

```tsx
import ModernGallery from '@/components/modern-gallery'

export default function MyPage() {
  const photos = [
    {
      id: 1,
      src: '/image1.jpg',
      title: 'Photo 1',
      subtitle: 'Description'
    },
    // ... more photos
  ]

  return <ModernGallery images={photos} autoplay={true} />
}
```

## Gallery Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Horizontal/Vertical Layout**: Automatically switches based on screen size
- **3D Transforms**: Smooth perspective effects on wide screens
- **Keyboard Navigation**: Use arrow keys to navigate
- **Touch/Mouse Drag**: Drag to navigate through images
- **Autoplay**: Automatically cycles through images (can be paused)
- **Thumbnail Navigation**: Jump to images via thumbnail bar
- **Dot Indicators**: Show current position in gallery
- **Download**: Click the download button to open image in new tab
- **Accessibility**: Full keyboard and screen reader support

## Component Props

```tsx
interface ModernGalleryProps {
  images?: GalleryImage[]      // Array of image objects
  autoplay?: boolean            // Enable autoplay (default: true)
}

interface GalleryImage {
  id?: string | number          // Unique identifier
  src: string                   // Image URL (required)
  title?: string                // Display title
  subtitle?: string             // Optional subtitle
}
```

## Local Images

To use local images, place them in the `public/` folder:

```
public/
  └── images/
      ├── photo1.jpg
      ├── photo2.jpg
      └── photo3.jpg
```

Then reference them:

```tsx
{
  id: 1,
  src: '/images/photo1.jpg',
  title: 'My Photo'
}
```

## Customization

### CSS Styling

Edit `components/gallery.css` to customize colors, sizes, and animations. Key classes:

- `.mg-root` - Main container
- `.mg-tiles` - Image tiles container
- `.mg-tile` - Individual image tile
- `.mg-top` / `.mg-bottom` - Header and footer controls
- `.mg-thumbs` - Thumbnail bar

### Example: Change background color

```css
.mg-root {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d44 100%);
}
```

## Files

- `components/modern-gallery.tsx` - Main gallery component
- `components/gallery.css` - Styling and animations
- `app/gallery/page.tsx` - Example gallery page
- `app/gallery/lib/gallery-images.ts` (optional) - Manage images in one place

## Tips

1. **Image Size**: Use images 800x600px or larger for best quality
2. **Performance**: Large galleries (50+ images) work smoothly thanks to lazy loading
3. **CDN**: For external images, use a CDN for better performance
4. **Fallback**: Images with errors display with grayscale filter
5. **Autoplay**: Set `autoplay={false}` to disable autoplay on load

## Example with Local Images

```tsx
'use client'

import React, { useState } from 'react'
import ModernGallery from '@/components/modern-gallery'

export default function GalleryPage() {
  const [images] = useState([
    {
      id: 1,
      src: '/images/photo1.jpg',
      title: 'Local Photo 1',
      subtitle: 'Stored in public/images/'
    },
    {
      id: 2,
      src: '/images/photo2.jpg',
      title: 'Local Photo 2',
      subtitle: 'Easy to manage'
    },
  ])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ModernGallery images={images} autoplay={true} />
    </div>
  )
}
```

## Troubleshooting

**Images not showing?**
- Check that image URLs are correct
- For local images, verify they exist in `public/` folder
- Check browser console for 404 errors

**Gallery not scrolling?**
- Make sure container has `height: 100vh` or explicit height
- Check if JavaScript is enabled

**Autoplay not working?**
- Verify `autoplay={true}` is set on the component
- Check browser's autoplay policies

Enjoy your modern photo gallery! 📸
