import { Calendar, Clock, Heart } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Story } from "../lib/stories"

interface StoryViewProps {
  story: Story
  onBack: () => void
}

export function StoryView({ story }: StoryViewProps) {
  return (
    <article className="space-y-6">
      <header className="space-y-4 pb-6 border-b">
        <h1 className="text-3xl font-bold">{story.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(story.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          
          {story.category && (
            <span className="px-2 py-1 bg-muted rounded-md">
              {story.category}
            </span>
          )}
          
          {story.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {story.readTime}
            </div>
          )}
          
          {story.likes !== undefined && story.likes > 0 && (
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {story.likes}
            </div>
          )}
        </div>
        
        {story.excerpt && (
          <p className="text-lg text-muted-foreground italic">
            {story.excerpt}
          </p>
        )}
      </header>
      
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
            h2: ({children}) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
            h3: ({children}) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
            p: ({children}) => <p className="mb-4 leading-7">{children}</p>,
            ul: ({children}) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
            ol: ({children}) => <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>,
            li: ({children}) => <li className="leading-7">{children}</li>,
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-muted-foreground/30 pl-4 my-4 italic text-muted-foreground">
                {children}
              </blockquote>
            ),
            code: ({className, children, ...props}) => {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            },
            a: ({children, href}) => (
              <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            hr: () => <hr className="my-8 border-border" />,
            table: ({children}) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-border">
                  {children}
                </table>
              </div>
            ),
            th: ({children}) => (
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({children}) => (
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {children}
              </td>
            ),
          }}
        >
          {story.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}