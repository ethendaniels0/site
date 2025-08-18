import { useState } from "react"
import { Mail, Loader2, CheckCircle } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    setStatus("loading")
    setMessage("")
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus("success")
        setMessage("Thanks for subscribing! Check your email to confirm.")
        setEmail("")
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again later.")
    }
  }
  
  return (
    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5" />
        <h3 className="font-semibold">Subscribe to Updates</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Get notified when I publish new posts. No spam, unsubscribe anytime.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={status === "loading" || status === "success"}
            required
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "success" && <CheckCircle className="h-4 w-4" />}
            {status === "idle" || status === "error" ? "Subscribe" : status === "loading" ? "Subscribing..." : "Subscribed!"}
          </button>
        </div>
        
        {message && (
          <p className={`text-sm ${status === "error" ? "text-red-500" : "text-green-600"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}