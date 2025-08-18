import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Calendar } from "lucide-react"
import { getAllPosts, getPostBySlug, BlogPost } from "../lib/posts"
import { BlogPostView } from "./BlogPostView"
import { NewsletterForm } from "./NewsletterForm"

export function BlogSection() {
  const posts = getAllPosts()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  
  // Handle slug-based selection or auto-select the most recent post
  useEffect(() => {
    if (slug) {
      const post = getPostBySlug(slug)
      if (post) {
        setSelectedPost(post)
      } else {
        // If slug doesn't exist, redirect to blog home
        navigate('/blog')
      }
    } else if (posts.length > 0) {
      setSelectedPost(posts[0])
      // Update URL to include the slug of the first post
      navigate(`/blog/${posts[0].slug}`, { replace: true })
    }
  }, [slug, posts, navigate])
  
  if (posts.length === 0) {
    return (
      <div className="bg-muted/50 p-8 rounded-lg text-center">
        <p className="text-muted-foreground">
          No blog posts yet. Add markdown files to <code className="text-sm bg-muted px-2 py-1 rounded">content/blog/</code> to get started.
        </p>
      </div>
    )
  }
  
  return (
    <div className="flex h-full gap-6">
      {/* Posts list sidebar */}
      <div className="w-80 flex-shrink-0">
        <div className="sticky top-0 pl-2">
          <h2 className="text-lg font-semibold mb-4">Posts</h2>
          <div className="space-y-2 pr-4 mb-6">
            {posts.map((post) => (
              <button
                key={post.slug}
                onClick={() => {
                  setSelectedPost(post)
                  navigate(`/blog/${post.slug}`)
                }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  selectedPost?.slug === post.slug 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-muted"
                }`}
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-sm leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Newsletter subscription */}
          <div className="pr-4">
            <NewsletterForm />
          </div>
        </div>
      </div>
      
      {/* Post content */}
      <div className="flex-1 overflow-y-auto pr-6 blog-content-scroll" style={{ height: 'calc(100vh - 6rem)' }}>
        <div className="max-w-5xl mx-auto px-8">
          {selectedPost && (
            <BlogPostView 
              post={selectedPost} 
              onBack={() => {}} // No-op since we don't need back functionality
            />
          )}
        </div>
      </div>
    </div>
  )
}