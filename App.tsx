import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./components/ui/sidebar"
import { 
  BookOpen, 
  FolderOpen, 
  Mail, 
  FileText,
  Github,
  Linkedin
} from "lucide-react"
import { BlogSection } from "./components/BlogSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { ContactSection } from "./components/ContactSection"
import { StoriesSection } from "./components/StoriesSection"
// import { BookshelfSection } from "./components/BookshelfSection"
import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"
import { Analytics } from "@vercel/analytics/react"

const navigation = [
  {
    id: "blog",
    title: "Blog",
    icon: FileText,
    component: BlogSection
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderOpen,
    component: ProjectsSection
  },
  {
    id: "stories",
    title: "Stories",
    icon: BookOpen,
    component: StoriesSection
  },
  // {
  //   id: "bookshelf",
  //   title: "Bookshelf",
  //   icon: Library,
  //   component: BookshelfSection
  // },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    component: ContactSection
  }
]

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/ethendaniels0?tab=repositories",
    username: "@ethendaniels0"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/ethen-daniels/",
    username: "Ethen Daniels"
  }
]

function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  // Get the base section from the path (blog, stories, projects, etc.)
  let activeSection = location.pathname.split('/')[1] || 'blog'
  // Handle root path as blog
  if (location.pathname === '/' || activeSection === '') {
    activeSection = 'blog'
  }
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex flex-col items-center space-y-3">
          <img 
            src="/favicon.png" 
            alt="Profile" 
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-lg">Ethen Daniels</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.id === 'blog' ? '/' : `/${item.id}`)}
                    isActive={activeSection === item.id}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="space-y-4">
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-3">Connect with me</p>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 px-2"
                  asChild
                >
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="text-xs">{link.username}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function App() {
  const location = useLocation()
  const isSplitView = location.pathname.startsWith('/blog') || location.pathname === '/' || location.pathname.startsWith('/stories')

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          {isSplitView ? (
            <div className="h-screen overflow-hidden py-6 px-6">
              <Routes>
                <Route path="/" element={<BlogSection />} />
                <Route path="/blog" element={<BlogSection />} />
                <Route path="/blog/:slug" element={<BlogSection />} />
                <Route path="/stories" element={<StoriesSection />} />
                <Route path="/stories/:slug" element={<StoriesSection />} />
                <Route path="/projects" element={<ProjectsSection />} />
                {/* <Route path="/bookshelf" element={<BookshelfSection />} /> */}
                <Route path="/contact" element={<ContactSection />} />
              </Routes>
            </div>
          ) : (
            <div className="container max-w-4xl mx-auto p-6 overflow-auto h-screen">
              <Routes>
                <Route path="/" element={<BlogSection />} />
                <Route path="/blog" element={<BlogSection />} />
                <Route path="/blog/:slug" element={<BlogSection />} />
                <Route path="/stories" element={<StoriesSection />} />
                <Route path="/stories/:slug" element={<StoriesSection />} />
                <Route path="/projects" element={<ProjectsSection />} />
                {/* <Route path="/bookshelf" element={<BookshelfSection />} /> */}
                <Route path="/contact" element={<ContactSection />} />
              </Routes>
            </div>
          )}
        </main>
      </div>
      <Analytics />
    </SidebarProvider>
  )
}