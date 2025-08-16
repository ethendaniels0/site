import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Calendar, Tag } from "lucide-react"
import { getAllPosts, BlogPost } from "../lib/posts"
import { BlogPostView } from "./BlogPostView"

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const posts = getAllPosts()
  
  if (selectedPost) {
    return (
      <BlogPostView 
        post={selectedPost} 
        onBack={() => setSelectedPost(null)} 
      />
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Blog</h1>
        <p className="text-muted-foreground">Thoughts, experiences, and musings from my journey.</p>
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Card 
            key={post.slug} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">{post.excerpt}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-1 bg-muted rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="bg-muted/50 p-8 rounded-lg text-center">
          <p className="text-muted-foreground">
            No blog posts yet. Add markdown files to <code className="text-sm bg-muted px-2 py-1 rounded">content/blog/</code> to get started.
          </p>
        </div>
      )}
    </div>
  )
}