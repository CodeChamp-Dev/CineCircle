"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Film, Eye, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { Sidebar, MobileMenuButton } from "@/components/sidebar"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("created")

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
      <Sidebar currentPage="profile" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MobileMenuButton onClick={() => {}} />
              <h1 className="text-lg lg:text-2xl font-bold text-foreground">Profile</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Profile Header */}
          <div className="bg-card border-b border-border p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Avatar */}
              <div className="relative">
                <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-lg lg:text-2xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-primary rounded-full flex items-center justify-center">
                  <Edit className="w-3 h-3 lg:w-3 lg:h-3 text-primary-foreground" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">Member since today</p>
              </div>

              <Button variant="outline" className="border-border hover:bg-muted bg-transparent w-full sm:w-auto">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="p-4 lg:p-6 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Film className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl lg:text-2xl font-bold text-foreground">42</p>
                    <p className="text-sm text-muted-foreground">Films Recommended</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xl lg:text-2xl font-bold text-foreground">78</p>
                    <p className="text-sm text-muted-foreground">Films Watched</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xl lg:text-2xl font-bold text-foreground">16</p>
                    <p className="text-sm text-muted-foreground">Active Friends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="p-4 lg:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 lg:space-y-6">
              <TabsList className="bg-muted w-full sm:w-auto">
                <TabsTrigger
                  value="created"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 sm:flex-none"
                >
                  CineBoards You Created
                </TabsTrigger>
                <TabsTrigger
                  value="shared"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 sm:flex-none"
                >
                  Shared With You
                </TabsTrigger>
              </TabsList>

              <TabsContent value="created" className="space-y-4 lg:space-y-6">
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-12 lg:py-16 text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Create New CineBoard</h3>
                  <p className="text-muted-foreground mb-6">Share your film recommendations</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Create CineBoard
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="shared" className="space-y-4 lg:space-y-6">
                {/* Empty State for Shared */}
                <div className="flex flex-col items-center justify-center py-12 lg:py-16 text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 lg:w-8 lg:h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Shared CineBoards</h3>
                  <p className="text-muted-foreground">CineBoards shared with you will appear here</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Must-Watch Classics Section */}
            <div className="mt-8 lg:mt-12 pt-4 lg:pt-6 border-t border-border">
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 border-l-4 border-l-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Must-Watch Classics</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>13 films • 8 watched</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Updated 2 days ago</p>
                  </div>
                  <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
