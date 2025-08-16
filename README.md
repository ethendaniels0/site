# Personal Site

## Markdown Blog System

Your blog now supports markdown posts! Here's how to use it:

### Adding New Blog Posts

1. Create a new `.md` file in `/content/blog/`
2. Add frontmatter at the top with metadata:

```markdown
---
title: Your Post Title
date: 2024-03-20
excerpt: A brief description of your post
tags: [tag1, tag2, tag3]
---

# Your Markdown Content Here

Write your post using standard markdown...
```

That's it! Your new post will be automatically loaded and displayed on the blog. The filename (without `.md`) becomes the post's URL slug.

## Stories System

Your site also supports personal stories with the same automatic loading system!

### Adding New Stories

1. Create a new `.md` file in `/content/stories/`
2. Add frontmatter at the top with metadata:

```markdown
---
title: Your Story Title
date: 2024-03-20
excerpt: A brief description of your story
category: Travel, Life, Growth, People, etc.
readTime: 5 min read
likes: 0
---

# Your Story Content Here

Write your story using standard markdown...
```

That's it! Your new story will be automatically loaded and displayed in the stories section. The filename (without `.md`) becomes the story's URL slug.

### Markdown Features Supported

- **Headers** (h1-h6)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- `Code blocks` with syntax highlighting
- [Links](https://example.com)
- Blockquotes
- Tables
- GitHub Flavored Markdown

### Publishing

Simply run `npm run build` and deploy to Vercel. Your posts will be statically generated at build time for optimal performance.

### Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
```