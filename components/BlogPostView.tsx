import { Calendar, Tag } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { BlogPost } from "../lib/posts"

interface BlogPostViewProps {
  post: BlogPost
  onBack: () => void
}

export function BlogPostView({ post }: BlogPostViewProps) {
  return (
    <article className="space-y-6">
      <header className="space-y-4 pb-6 border-b">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-muted rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {post.excerpt && (
          <p className="text-lg text-muted-foreground italic">
            {post.excerpt}
          </p>
        )}
      </header>
      
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mt-6 mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            ),
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              const isInline = !match
              
              if (isInline) {
                return (
                  <code className="px-1.5 py-0.5 bg-muted rounded text-sm" {...props}>
                    {children}
                  </code>
                )
              }
              
              return (
                <div className="relative">
                  <div className="absolute top-0 right-0 px-2 py-1 text-xs text-muted-foreground">
                    {match[1]}
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm" {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              )
            },
            a: ({ href, children }) => (
              <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                {children}
              </a>
            ),
            hr: () => <hr className="my-8 border-t" />,
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="border-b-2 border-border">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="text-left p-2 font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="p-2 border-t border-border">
                {children}
              </td>
            ),
            img: ({ src, alt }) => (
              <figure className="my-8">
                <img 
                  src={src} 
                  alt={alt || ''} 
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                />
                {alt && (
                  <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}