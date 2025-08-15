import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Contact</h1>
        <p className="text-muted-foreground">Get in touch! I'd love to hear from you.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What's this about?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Your message here..." 
                className="min-h-[120px]"
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm">Email</p>
                <p className="text-muted-foreground">hello@yourname.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm">Location</p>
                <p className="text-muted-foreground">Your City, Country</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm">Phone</p>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                Available for freelance work and interesting projects.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}