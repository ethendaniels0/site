import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Clock, Heart } from "lucide-react"

const mockStories = [
  {
    id: 1,
    title: "The Mountain That Changed My Perspective",
    excerpt: "How a solo hiking trip taught me more about myself than years of self-reflection.",
    readTime: "5 min read",
    category: "Travel",
    likes: 24,
    date: "2024-03-12"
  },
  {
    id: 2,
    title: "Finding Joy in Small Moments",
    excerpt: "Lessons learned from paying attention to the everyday magic around us.",
    readTime: "3 min read",
    category: "Life",
    likes: 18,
    date: "2024-03-08"
  },
  {
    id: 3,
    title: "The Art of Learning from Failure",
    excerpt: "Why my biggest mistakes became my greatest teachers.",
    readTime: "7 min read",
    category: "Growth",
    likes: 31,
    date: "2024-03-03"
  },
  {
    id: 4,
    title: "Coffee Shop Conversations",
    excerpt: "The unexpected wisdom from a stranger's story over morning coffee.",
    readTime: "4 min read",
    category: "People",
    likes: 15,
    date: "2024-02-28"
  }
]

export function StoriesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Stories</h1>
        <p className="text-muted-foreground">Personal experiences and life lessons worth sharing.</p>
      </div>
      
      <div className="grid gap-4">
        {mockStories.map((story) => (
          <Card key={story.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="hover:text-primary transition-colors mb-2">
                    {story.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{story.excerpt}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{story.category}</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {story.readTime}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  {story.likes}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">
          More stories coming soon. Each one tells a piece of the journey.
        </p>
      </div>
    </div>
  )
}