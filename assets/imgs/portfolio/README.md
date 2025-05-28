# Portfolio Media Structure

This directory contains all media files for the portfolio section of the website. The structure is organized by category and media type for easy management and maintenance.

## Directory Structure

```
portfolio/
├── branding/
│   ├── thumbnails/    # Small images for portfolio cards (600x400px)
│   ├── full-size/     # High-resolution images
│   └── videos/        # Video content
├── graphic-design/
├── illustrations/
├── motion-graphics/
├── photography/
└── web-design/
```

## Naming Convention

All files should follow this naming pattern:
```
[category]-[project-number]-[type]-[sequence].extension

Examples:
- branding-01-thumb-01.jpg
- graphic-design-02-full-01.jpg
- photography-03-video-01.mp4
```

### Components:
- `category`: branding, graphic-design, illustrations, motion-graphics, photography, web-design
- `project-number`: 01, 02, 03, etc.
- `type`: thumb (thumbnail), full (full-size), video
- `sequence`: 01, 02, 03, etc. (for multiple images/videos in same project)

## File Requirements

### Thumbnails
- Size: 600x400px recommended
- Format: JPG or PNG
- Optimization: Compressed for web
- Purpose: Used in portfolio cards and previews

### Full-size Images
- Format: JPG or PNG
- Resolution: High quality, but optimized for web
- Purpose: Used in project modals and detailed views

### Videos
- Format: MP4
- Size: Keep under 10MB for web performance
- Resolution: 1080p maximum
- Purpose: Project demonstrations and process videos

## Usage in HTML

```html
<!-- For thumbnails in portfolio cards -->
<img src="../assets/imgs/portfolio/branding/thumbnails/branding-01-thumb-01.jpg" alt="Branding Project 1">

<!-- For full-size images in modals -->
<img src="../assets/imgs/portfolio/branding/full-size/branding-01-full-01.jpg" alt="Branding Project 1 Full View">

<!-- For videos -->
<video src="../assets/imgs/portfolio/branding/videos/branding-01-video-01.mp4"></video>
```

## Maintenance

1. Always optimize images before adding them to the repository
2. Keep file names consistent with the naming convention
3. Update this README if the structure changes
4. Regularly check for and remove unused media files 