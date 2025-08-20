import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Calendar, X, List } from "lucide-react"
import { getAllPosts, getPostBySlug, BlogPost } from "../lib/posts"
import { BlogPostView } from "./BlogPostView"
import { NewsletterForm } from "./NewsletterForm"
import { SidebarTrigger } from "../components/ui/sidebar"

export function BlogSection() {
  const posts = getAllPosts()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  
  // Handle slug-based selection or auto-select the most recent post
  useEffect(() => {
    if (slug) {
      const post = getPostBySlug(slug)
      if (post) {
        setSelectedPost(post)
        setShowMobileSidebar(false) // Close mobile sidebar when post is selected
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
    <>
      {/* Mobile Header - only visible on mobile */}
      <div className="lg:hidden flex items-center justify-between p-2 border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="p-2" />
          {selectedPost && (
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {selectedPost.title}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="flex items-center gap-1 text-sm font-medium p-2 hover:bg-muted rounded-md"
        >
          <List className="h-5 w-5" />
          <span>Posts</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-background border-r shadow-lg">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Posts</h2>
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-2 rounded-md hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Newsletter Form */}
              <div className="p-4 border-b">
                <NewsletterForm />
              </div>

              {/* Posts List */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {posts.map((post) => (
                    <button
                      key={post.slug}
                      onClick={() => {
                        setSelectedPost(post)
                        navigate(`/blog/${post.slug}`)
                        setShowMobileSidebar(false)
                      }}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex h-full gap-6">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-0">
            {/* Newsletter subscription */}
            <div className="mb-6">
              <NewsletterForm />
            </div>
            
            <h2 className="text-lg font-semibold mb-4">Posts</h2>
            <div className="space-y-2">
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
          </div>
        </div>
        
        {/* Post content - responsive padding */}
        <div className="flex-1 overflow-y-auto lg:pr-6 blog-content-scroll" style={{ height: 'calc(100vh - 6rem)' }}>
          <div className="max-w-5xl mx-auto px-4 lg:px-8">
            {selectedPost && (
              <BlogPostView 
                post={selectedPost} 
                onBack={() => setShowMobileSidebar(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}