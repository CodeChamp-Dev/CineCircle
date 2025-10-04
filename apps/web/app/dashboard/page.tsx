"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateCineLinkModal } from "@/components/create-cinelink-modal"
import { NotificationsPanel } from "@/components/notifications-panel"
import { useAuth } from "@/components/auth-provider"
import { Sidebar, MobileMenuButton } from "@/components/sidebar"

const cineLinks = [
  {
    id: 1,
    title: "Kunal's CineBoard for You",
    films: 7,
    watched: 3,
    updated: "Updated 2 days ago",
    borderColor: "border-l-primary",
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: 2,
    title: "Sarah's Must-Watch List",
    films: 5,
    watched: 1,
    updated: "Updated yesterday",
    borderColor: "border-l-purple-500",
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: 3,
    title: "Movie Night with Jordan",
    films: 12,
    watched: 8,
    updated: "Updated 5 days ago",
    borderColor: "border-l-orange-500",
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: 4,
    title: "Ayesha's Recommendations",
    films: 3,
    watched: 0,
    updated: "Updated 1 week ago",
    borderColor: "border-l-primary",
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: 5,
    title: "Sci-Fi Picks from Miguel",
    films: 6,
    watched: 2,
    updated: "Updated 3 days ago",
    borderColor: "border-l-blue-500",
    avatar: "/diverse-user-avatars.png",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/signin')
    }
  }, [isAuthenticated, isLoading, router])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar currentPage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MobileMenuButton onClick={() => {}} />
              <h1 className="text-lg lg:text-2xl font-bold text-foreground truncate">
                Hi {user.name.split(' ')[0]}, here are your CineLinks
              </h1>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search films..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-48 lg:w-64 bg-background border-border"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden text-muted-foreground hover:text-foreground"
                onClick={() => {
                  // You can implement a mobile search modal here
                  console.log('Mobile search clicked')
                }}
              >
                <Search className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground relative"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </div>
                </Button>
                <NotificationsPanel open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-4 lg:space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New CineLink
              </Button>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <Select defaultValue="recently-updated">
                  <SelectTrigger className="w-full sm:w-40 bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recently-updated">Recently updated</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="most-films">Most films</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* CineLinks List */}
            <div className="space-y-3 lg:space-y-4">
              {cineLinks.map((link) => (
                <a
                  key={link.id}
                  href={`/cinelink/${link.id}`}
                  className={`block bg-card border border-border rounded-lg p-4 lg:p-6 hover:bg-muted/50 transition-colors border-l-4 ${link.borderColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg font-semibold text-foreground mb-1 lg:mb-2 truncate">{link.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>
                          {link.films} films • {link.watched} watched
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 lg:mt-2">{link.updated}</p>
                    </div>
                    <Avatar className="w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0">
                      <AvatarImage src={link.avatar || "/placeholder.svg"} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Create CineLink Modal */}
      <CreateCineLinkModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  )
}
