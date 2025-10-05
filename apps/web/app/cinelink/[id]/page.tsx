"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import ChatInterface from "@/components/chat-interface"
import {
  Home,
  User,
  Compass,
  Bookmark,
  Settings,
  ArrowLeft,
  MoreHorizontal,
  Grid3X3,
  List,
  Search,
  Star,
  MessageCircle,
  Play,
} from "lucide-react"

const movies = [
  {
    id: 1,
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
    genres: ["Thriller", "Drama"],
    rating: 5,
    quote: "You'll love this dark comedy thriller and its incredible cinematography. It won Best Picture for a reason!",
    status: "unwatched",
    poster: "/parasite-movie-poster.png",
  },
  {
    id: 2,
    title: "Everything Everywhere All at Once",
    year: 2022,
    director: "Daniels",
    genres: ["Sci-Fi", "Comedy"],
    rating: 4,
    quote: "This will blow your mind. So creative and emotionally powerful.",
    status: "unwatched",
    poster: "/everything-everywhere-poster.png",
  },
  {
    id: 3,
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    genres: ["Comedy", "Drama"],
    rating: 5,
    quote: "Perfect for when you need something visually stunning and quirky. The color palette is amazing!",
    status: "watching",
    poster: "/the-grand-budapest-hotel-movie-poster.jpg",
  },
]

export default function CineLinkDetailPage({ params }: { params: { id: string } }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-primary-foreground fill-current" />
            </div>
            <span className="text-lg font-bold text-foreground">CineCircle</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <a
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
            <a
              href="/profile"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Compass className="w-5 h-5" />
              <span>Discover</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Bookmark className="w-5 h-5" />
              <span>Watchlist</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/alex-kim.jpg" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Alex Kim</p>
              <p className="text-xs text-muted-foreground truncate">alex@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Kunal's Picks for You</h1>
                <p className="text-sm text-muted-foreground">Created on May 5, 2025 • 7 films</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Filter films..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-48 bg-background border-border"
                />
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex space-x-6">
                  {/* Movie Poster */}
                  <div className="flex-shrink-0">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={`${movie.title} poster`}
                      className="w-24 h-36 object-cover rounded-lg bg-muted"
                    />
                  </div>

                  {/* Movie Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{movie.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-muted-foreground">{movie.year}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{movie.director}</span>
                            <span className="text-muted-foreground">•</span>
                            <div className="flex space-x-1">
                              {movie.genres.map((genre) => (
                                <Badge key={genre} variant="secondary" className="text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            {movie.status === "watching" && (
                              <Badge className="bg-primary text-primary-foreground">Now Watching</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {movie.status === "watching" ? (
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Continue Watching</Button>
                          ) : (
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                              Start Watching
                            </Button>
                          )}
                          <Button variant="ghost" className="text-primary hover:text-primary/80">
                            Mark as Watched
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">{renderStars(movie.rating)}</div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-muted-foreground italic">"{movie.quote}"</blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Floating Chat Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          1
        </span>
      </Button>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        contact={{
          name: "Sarah Johnson",
          status: "Online now",
          avatar: "/diverse-user-avatars.png",
        }}
      />
    </div>
  )
}
