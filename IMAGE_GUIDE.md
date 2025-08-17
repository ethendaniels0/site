# Image Usage Guide

## Adding Images to Blog Posts and Stories

You can now include images in your markdown content! Here's how:

### 1. Where to Store Images

Place your images in the appropriate public directory:
- **Blog images**: `/public/images/blog/`
- **Story images**: `/public/images/stories/`

### 2. How to Add Images in Markdown

Use standard markdown image syntax:

```markdown
![Image description](/images/blog/your-image.jpg)
```

Or for stories:

```markdown
![A beautiful sunset](/images/stories/sunset.jpg)
```

### 3. Image Features

- **Responsive**: Images automatically scale to fit the content width
- **Styled**: Images have rounded corners and subtle shadows
- **Captions**: The alt text appears as a caption below the image
- **Lazy Loading**: Images load as users scroll for better performance

### 4. Examples

#### Basic Image
```markdown
![Mountain landscape](/images/blog/mountain.jpg)
```

#### Image without Caption
```markdown
![](/images/blog/diagram.png)
```
(Leave alt text empty to hide the caption)

#### Inline with Text
```markdown
Here's an interesting photo I took last week:

![Coffee shop in Tokyo](/images/stories/tokyo-coffee.jpg)

As you can see, the atmosphere was incredible.
```

### 5. Best Practices

1. **File Names**: Use descriptive, kebab-case names (e.g., `my-vacation-photo.jpg`)
2. **Image Size**: Optimize images before uploading (aim for < 500KB per image)
3. **Formats**: Use `.jpg` for photos, `.png` for graphics/screenshots
4. **Alt Text**: Always provide descriptive alt text for accessibility
5. **Organization**: Create subfolders for different posts if needed:
   - `/public/images/blog/2024-travel/photo1.jpg`
   - `/public/images/stories/mountain-trip/view.jpg`

### 6. External Images

You can also use external image URLs:

```markdown
![Description](https://example.com/image.jpg)
```

However, local images are preferred for:
- Better performance
- Reliability (no broken links)
- Consistent loading times

### 7. Image Optimization Tips

Before adding images:
1. Resize large images (max width ~1920px is usually sufficient)
2. Compress JPGs (use tools like TinyPNG or Squoosh)
3. Consider using WebP format for better compression

### Note for Development

During local development (`npm run dev`), images in the `/public` folder are served directly. After building (`npm run build`), they're copied to the `dist` folder and deployed with your site.