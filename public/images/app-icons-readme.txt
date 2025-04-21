# App Icon Creation Guide

This file provides guidance for creating the various app icons required for Panacureo.

## Required Icon Files

All icons should be placed in the `/public` directory:

1. **favicon.ico** (Multi-size ICO file with the following dimensions):
   - 16x16
   - 32x32
   - 48x48
   - 64x64

2. **logo192.png** (192x192 pixels)
   - Used for PWA icons and touch icons on various devices
   - Should be clear and recognizable at small sizes

3. **logo512.png** (512x512 pixels)
   - High-resolution version for app stores and larger displays
   - Ensure it looks good when scaled down

4. **maskable_icon.png** (192x192 pixels)
   - Special adaptive icon for Android devices
   - Design with a safe zone (keep main content in the center ~80%)
   - Allows the icon to be displayed in different shapes on various devices

5. **og-image.png** (1200x630 pixels)
   - Used for social media sharing
   - Include logo, app name, and tagline
   - Make text large enough to be readable at smaller sizes

## Design Guidelines

- Use consistent branding elements (colors, font, logo)
- Primary brand color: #38A169 (green)
- Make sure icons are recognizable at small sizes
- Use a simple, clean design with good contrast
- Include padding around the icon (approximately 10% of width/height)

## Tools for Icon Creation

- Adobe Illustrator or Photoshop
- Figma
- Sketch
- Online tools like favicon.io or realfavicongenerator.net

## Testing

After creating and placing the icons, test them by:
1. Viewing your site in different browsers
2. Adding to home screen on mobile devices
3. Testing social media card previews with sharing debuggers
4. Validating PWA with Lighthouse 