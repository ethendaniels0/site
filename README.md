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

## Newsletter Subscription Setup

The blog includes a newsletter subscription form using Resend Audiences. To enable it:

1. **Create an Audience in Resend**:
   - Go to [Resend Dashboard](https://resend.com/audiences)
   - Click "Create Audience"
   - Name it (e.g., "Blog Subscribers")
   - Copy the Audience ID

2. **Add Environment Variable**:
   - In Vercel Dashboard, add:
     - `RESEND_AUDIENCE_ID`: Your Audience ID from step 1

3. **Features**:
   - Subscribers are automatically added to your Resend Audience
   - Welcome email sent to new subscribers
   - Duplicate subscriptions handled gracefully
   - You can send broadcasts from Resend Dashboard

4. **Sending Newsletter Updates**:
   - Go to Resend Dashboard → Broadcasts
   - Select your audience
   - Compose and send your newsletter
   - All subscribers will receive the update

5. **Managing Subscribers**:
   - View all subscribers in Resend Dashboard → Audiences
   - Handle unsubscribes automatically via Resend
   - Export subscriber list anytime

**Note**: Without `RESEND_AUDIENCE_ID`, subscriptions will be emailed to you for manual processing.

## Automatic Newsletter Notifications

You have three options to automatically notify subscribers when you publish new content:

### Option 1: GitHub Actions (Automatic)
The `.github/workflows/newsletter-notification.yml` workflow automatically sends notifications when you push new markdown files to GitHub.

**Setup:**
1. Add these secrets to your GitHub repository (Settings → Secrets):
   - `RESEND_API_KEY`: Your Resend API key
   - `RESEND_AUDIENCE_ID`: Your Audience ID from Resend
2. Update the domain in the workflow file
3. Push new content to trigger notifications

### Option 2: Build-Time Script (Semi-Automatic)
Run `npm run build:notify` instead of `npm run build` to check for new posts and notify subscribers during deployment.

**Setup:**
1. Add to Vercel environment variables:
   - `SITE_URL`: Your website URL (e.g., https://yourdomain.com)
   - `ADMIN_TOKEN`: A secret token for API authentication
2. Deploy with the build:notify command

### Option 3: Manual Trigger
Use the `/api/notify-subscribers` endpoint to manually send notifications after publishing.

**Example:**
```bash
curl -X POST https://yourdomain.com/api/notify-subscribers \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Post Title",
    "excerpt": "Post description",
    "url": "https://yourdomain.com/blog/post-slug",
    "type": "blog"
  }'
```

**Tracking:** The `.last-notification-check` file tracks when notifications were last sent to avoid duplicates.