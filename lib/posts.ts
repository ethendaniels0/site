// Blog post data structure
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
}

// Dynamically import all markdown files from the blog directory
const blogPostModules = import.meta.glob('../content/blog/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
}) as Record<string, string>

// Helper function to parse frontmatter
function parseFrontmatter(content: string, fileSlug: string): BlogPost {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      slug: fileSlug,
      title: fileSlug,
      date: new Date().toISOString(),
      excerpt: '',
      content: content,
      tags: []
    }
  }
  
  const frontmatter = match[1]
  const markdownContent = content.replace(frontmatterRegex, '').trim()
  
  // Parse frontmatter fields
  const title = frontmatter.match(/title:\s*(.+)/)?.[1] || fileSlug
  const date = frontmatter.match(/date:\s*(.+)/)?.[1] || new Date().toISOString()
  const excerpt = frontmatter.match(/excerpt:\s*(.+)/)?.[1] || ''
  const customSlug = frontmatter.match(/slug:\s*(.+)/)?.[1] // Custom slug from frontmatter
  const tagsMatch = frontmatter.match(/tags:\s*\[(.+)\]/)
  const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : []
  
  return {
    slug: customSlug || fileSlug, // Use custom slug if provided, otherwise use filename
    title,
    date,
    excerpt,
    tags,
    content: markdownContent
  }
}

// Parse all posts dynamically
const posts: BlogPost[] = Object.entries(blogPostModules)
  .map(([path, content]) => {
    // Extract slug from file path (e.g., '../content/blog/my-post.md' -> 'my-post')
    const slug = path.split('/').pop()?.replace('.md', '') || ''
    return parseFrontmatter(content, slug)
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  return posts.find(post => post.slug === slug) || null
}