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
slug: custom-url-slug  # Optional: defaults to filename
---

# Your Markdown Content Here

Write your post using standard markdown...
```

That's it! Your new post will be automatically loaded and displayed on the blog. 

**URL Routing:**
- By default, the filename (without `.md`) becomes the post's URL: `/blog/your-filename`
- You can override this by adding `slug: custom-slug` in the frontmatter
- Each post gets its own unique URL that can be bookmarked and shared

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
slug: custom-url-slug  # Optional: defaults to filename
---

# Your Story Content Here

Write your story using standard markdown...
```

That's it! Your new story will be automatically loaded and displayed in the stories section.

**URL Routing:**
- By default, the filename (without `.md`) becomes the story's URL: `/stories/your-filename`
- You can override this by adding `slug: custom-slug` in the frontmatter
- Each story gets its own unique URL that can be bookmarked and shared

### Markdown Features Supported

- **Headers** (h1-h6)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- `Code blocks` with syntax highlighting
- [Links](https://example.com)
- **Images** with captions
- Blockquotes
- Tables
- GitHub Flavored Markdown

### Adding Images

You can add images to your posts and stories:

```markdown
![Image description](/images/blog/your-image.jpg)
```

- Store blog images in `/public/images/blog/`
- Store story images in `/public/images/stories/`
- Images are responsive and include automatic captions from alt text
- See `IMAGE_GUIDE.md` for detailed instructions

### Publishing

Simply run `npm run build` and deploy to Vercel. Your posts will be statically generated at build time for optimal performance.

### Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
```

## Contact Form Setup

The contact form uses Resend to send emails. To set it up:

1. **Get a Resend API Key**:
   - Sign up at [Resend](https://resend.com)
   - Go to [API Keys](https://resend.com/api-keys) and create a new API key

2. **Set Environment Variables**:
   - In Vercel Dashboard, go to Settings → Environment Variables
   - Add the following variables:
     - `RESEND_API_KEY`: Your Resend API key
     - `TO_EMAIL`: Your email address where you want to receive messages

3. **Configure Domain (Optional)**:
   - For production, verify your domain in Resend
   - Update the `from` email in `/api/send-email.ts` to use your domain

4. **Local Development**:
   - Copy `.env.example` to `.env.local`
   - Fill in your API key and email address
   - Note: Contact form will only work when deployed to Vercel