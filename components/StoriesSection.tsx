import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Calendar } from "lucide-react"
import { getAllStories, getStoryBySlug, Story } from "../lib/stories"
import { StoryView } from "./StoryView"

export function StoriesSection() {
  const stories = getAllStories()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  
  // Handle slug-based selection or auto-select the most recent story
  useEffect(() => {
    if (slug) {
      const story = getStoryBySlug(slug)
      if (story) {
        setSelectedStory(story)
      } else {
        // If slug doesn't exist, redirect to stories home
        navigate('/stories')
      }
    } else if (stories.length > 0) {
      setSelectedStory(stories[0])
      // Update URL to include the slug of the first story
      navigate(`/stories/${stories[0].slug}`, { replace: true })
    }
  }, [slug, stories, navigate])
  
  if (stories.length === 0) {
    return (
      <div className="bg-muted/50 p-8 rounded-lg text-center">
        <p className="text-muted-foreground">
          No stories yet. Add markdown files to <code className="text-sm bg-muted px-2 py-1 rounded">content/stories/</code> to get started.
        </p>
      </div>
    )
  }
  
  return (
    <div className="flex h-full gap-6">
      {/* Stories list sidebar */}
      <div className="w-80 flex-shrink-0">
        <div className="sticky top-0 pl-2">
          <h2 className="text-lg font-semibold mb-4">Stories</h2>
          <div className="space-y-2 pr-4">
            {stories.map((story) => (
              <button
                key={story.slug}
                onClick={() => {
                  setSelectedStory(story)
                  navigate(`/stories/${story.slug}`)
                }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  selectedStory?.slug === story.slug 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-muted"
                }`}
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-sm leading-tight">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(story.date).toLocaleDateString('en-US', { 
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
      
      {/* Story content */}
      <div className="flex-1 overflow-y-auto pr-6 story-content-scroll" style={{ height: 'calc(100vh - 6rem)' }}>
        <div className="max-w-5xl mx-auto px-8">
          {selectedStory && (
            <StoryView 
              story={selectedStory} 
              onBack={() => {}} // No-op since we don't need back functionality
            />
          )}
        </div>
      </div>
    </div>
  )
}