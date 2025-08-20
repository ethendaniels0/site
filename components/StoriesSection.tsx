import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Calendar, X, List } from "lucide-react"
import { getAllStories, getStoryBySlug, Story } from "../lib/stories"
import { StoryView } from "./StoryView"
import { SidebarTrigger } from "../components/ui/sidebar"

export function StoriesSection() {
  const stories = getAllStories()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  
  // Handle slug-based selection or auto-select the most recent story
  useEffect(() => {
    if (slug) {
      const story = getStoryBySlug(slug)
      if (story) {
        setSelectedStory(story)
        setShowMobileSidebar(false) // Close mobile sidebar when story is selected
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
    <>
      {/* Mobile Header - only visible on mobile */}
      <div className="lg:hidden flex items-center justify-between p-2 border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="p-2" />
          {selectedStory && (
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {selectedStory.title}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="flex items-center gap-1 text-sm font-medium p-2 hover:bg-muted rounded-md"
        >
          <List className="h-5 w-5" />
          <span>Stories</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-background border-r shadow-lg">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Stories</h2>
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-2 rounded-md hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Stories List */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {stories.map((story) => (
                    <button
                      key={story.slug}
                      onClick={() => {
                        setSelectedStory(story)
                        navigate(`/stories/${story.slug}`)
                        setShowMobileSidebar(false)
                      }}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
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
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex h-full gap-6">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block w-80 flex-shrink-0">
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
        
        {/* Story content - responsive padding */}
        <div className="flex-1 overflow-y-auto lg:pr-6 story-content-scroll" style={{ height: 'calc(100vh - 6rem)' }}>
          <div className="max-w-5xl mx-auto px-4 lg:px-8">
            {selectedStory && (
              <StoryView 
                story={selectedStory} 
                onBack={() => setShowMobileSidebar(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}