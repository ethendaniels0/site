import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Star, BookOpen, Calendar } from "lucide-react"
import { Progress } from "./ui/progress"

const mockBooks = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    status: "completed",
    rating: 5,
    dateFinished: "2024-03-10",
    genre: "Design",
    notes: "Excellent insights into user-centered design principles."
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    status: "currently-reading",
    progress: 65,
    genre: "Self-Help",
    notes: "Practical strategies for building good habits."
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    status: "completed",
    rating: 4,
    dateFinished: "2024-02-28",
    genre: "Technology",
    notes: "Timeless advice for software developers."
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    status: "want-to-read",
    genre: "Productivity",
    notes: "Looking forward to learning about focused work strategies."
  },
  {
    id: 5,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    status: "completed",
    rating: 4,
    dateFinished: "2024-02-15",
    genre: "Philosophy",
    notes: "Profound insights into mindfulness and presence."
  }
]

export function BookshelfSection() {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { icon: "✓", label: "Completed" }
      case "currently-reading":
        return { icon: "📖", label: "Currently Reading" }
      case "want-to-read":
        return { icon: "📚", label: "Want to Read" }
      default:
        return { icon: "📘", label: "Unknown" }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Bookshelf</h1>
        <p className="text-muted-foreground">Books that have shaped my thinking and current reads.</p>
      </div>
      
      <div className="grid gap-4">
        {mockBooks.map((book) => {
          const statusInfo = getStatusInfo(book.status)
          return (
            <Card key={book.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="mb-1">{book.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">by {book.author}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{statusInfo.icon} {statusInfo.label}</span>
                    <span>{book.genre}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {book.status === "currently-reading" && book.progress && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        Progress
                      </span>
                      <span className="text-muted-foreground">{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-2" />
                  </div>
                )}
                
                {book.status === "completed" && book.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    {book.dateFinished && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(book.dateFinished).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric'
                        })}
                      </div>
                    )}
                  </div>
                )}
                
                {book.notes && (
                  <p className="text-sm text-muted-foreground italic">"{book.notes}"</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          📚 Currently building my reading habit. Recommendations are always welcome!
        </p>
      </div>
    </div>
  )
}