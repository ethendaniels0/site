// Blog post data structure
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
}

// Import markdown files
import gettingStartedRaw from '../content/blog/getting-started-with-blogging.md?raw'
import learningInPublicRaw from '../content/blog/learning-in-public.md?raw'
import simpleSolutionsRaw from '../content/blog/simple-solutions.md?raw'

// Helper function to parse frontmatter
function parseFrontmatter(content: string, slug: string): BlogPost {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      slug,
      title: slug,
      date: new Date().toISOString(),
      excerpt: '',
      content: content,
      tags: []
    }
  }
  
  const frontmatter = match[1]
  const markdownContent = content.replace(frontmatterRegex, '').trim()
  
  // Parse frontmatter fields
  const title = frontmatter.match(/title:\s*(.+)/)?.[1] || slug
  const date = frontmatter.match(/date:\s*(.+)/)?.[1] || new Date().toISOString()
  const excerpt = frontmatter.match(/excerpt:\s*(.+)/)?.[1] || ''
  const tagsMatch = frontmatter.match(/tags:\s*\[(.+)\]/)
  const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : []
  
  return {
    slug,
    title,
    date,
    excerpt,
    tags,
    content: markdownContent
  }
}

// Define all posts
const rawPosts = [
  { slug: 'getting-started-with-blogging', content: gettingStartedRaw },
  { slug: 'learning-in-public', content: learningInPublicRaw },
  { slug: 'simple-solutions', content: simpleSolutionsRaw }
]

// Parse all posts
const posts: BlogPost[] = rawPosts.map(({ slug, content }) => 
  parseFrontmatter(content, slug)
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  return posts.find(post => post.slug === slug) || null
}