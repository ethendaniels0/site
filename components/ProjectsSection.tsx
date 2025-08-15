import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "./ui/button"

const mockProjects = [
  {
    id: 1,
    title: "Personal Website",
    description: "A clean, responsive personal website built with React and Tailwind CSS. Features a blog, project showcase, and contact form.",
    technologies: "React, Tailwind CSS, TypeScript",
    githubUrl: "https://github.com/yourusername/personal-website",
    liveUrl: "https://yourwebsite.com",
    status: "Active"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A minimalist task management application with drag-and-drop functionality and local storage persistence.",
    technologies: "React, React DnD, Local Storage",
    githubUrl: "https://github.com/yourusername/task-app",
    liveUrl: "https://your-task-app.com",
    status: "Completed"
  },
  {
    id: 3,
    title: "Reading Tracker",
    description: "A web application to track books, reading progress, and personal reviews. Integrates with Google Books API.",
    technologies: "React, Google Books API, Chart.js",
    githubUrl: "https://github.com/yourusername/reading-tracker",
    liveUrl: null,
    status: "In Progress"
  }
]

export function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Projects</h1>
        <p className="text-muted-foreground">A collection of things I've built and am working on.</p>
      </div>
      
      <div className="grid gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.status}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{project.description}</p>
              <p className="text-sm text-muted-foreground">
                <strong>Technologies:</strong> {project.technologies}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}