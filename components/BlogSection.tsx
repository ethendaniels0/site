import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Calendar } from "lucide-react"

const mockBlogPosts = [
  {
    id: 1,
    title: "Getting Started with Personal Blogging",
    excerpt: "Thoughts on why I decided to start writing and sharing my experiences online.",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Reflections on Learning in Public",
    excerpt: "How sharing your learning journey can benefit both yourself and others.",
    date: "2024-03-10"
  },
  {
    id: 3,
    title: "The Power of Simple Solutions",
    excerpt: "Why sometimes the most elegant solution is the simplest one.",
    date: "2024-03-05"
  }
]

export function BlogSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Blog</h1>
        <p className="text-muted-foreground">Thoughts, experiences, and musings from my journey.</p>
      </div>
      
      <div className="space-y-4">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
            <CardContent>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Note:</strong> This blog section is ready for your markdown files. 
          Simply add your markdown posts and they'll be displayed here with proper formatting.
        </p>
      </div>
    </div>
  )
}