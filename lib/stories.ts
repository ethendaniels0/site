// Story data structure
export interface Story {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  category?: string
  readTime?: string
}

// Dynamically import all markdown files from the stories directory
const storyModules = import.meta.glob('../content/stories/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
}) as Record<string, string>

// Helper function to parse frontmatter
function parseFrontmatter(content: string, fileSlug: string): Story {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      slug: fileSlug,
      title: fileSlug,
      date: new Date().toISOString(),
      excerpt: '',
      content: content,
      category: 'General',
      readTime: '5 min read'
    }
  }
  
  const frontmatter = match[1]
  const markdownContent = content.replace(frontmatterRegex, '').trim()
  
  // Parse frontmatter fields
  const title = frontmatter.match(/title:\s*(.+)/)?.[1] || fileSlug
  const date = frontmatter.match(/date:\s*(.+)/)?.[1] || new Date().toISOString()
  const excerpt = frontmatter.match(/excerpt:\s*(.+)/)?.[1] || ''
  const customSlug = frontmatter.match(/slug:\s*(.+)/)?.[1] // Custom slug from frontmatter
  const category = frontmatter.match(/category:\s*(.+)/)?.[1] || 'General'
  const readTime = frontmatter.match(/readTime:\s*(.+)/)?.[1] || '5 min read'
  
  return {
    slug: customSlug || fileSlug, // Use custom slug if provided, otherwise use filename
    title,
    date,
    excerpt,
    category,
    readTime,
    content: markdownContent
  }
}

// Parse all stories dynamically
const stories: Story[] = Object.entries(storyModules)
  .map(([path, content]) => {
    // Extract slug from file path (e.g., '../content/stories/my-story.md' -> 'my-story')
    const slug = path.split('/').pop()?.replace('.md', '') || ''
    return parseFrontmatter(content, slug)
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllStories(): Story[] {
  return stories
}

export function getStoryBySlug(slug: string): Story | null {
  return stories.find(story => story.slug === slug) || null
}