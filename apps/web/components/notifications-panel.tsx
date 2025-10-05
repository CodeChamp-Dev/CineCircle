"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Bell } from "lucide-react"

interface Notification {
  id: number
  type: "activity" | "friend_request" | "comment" | "view" | "watched" | "reply"
  user: string
  avatar: string
  message: string
  time: string
  actions?: { accept?: boolean; decline?: boolean }
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "activity",
    user: "Ayesha",
    avatar: "/diverse-user-avatars.png",
    message: "started watching Inception from your CineBoard",
    time: "2h ago",
  },
  {
    id: 2,
    type: "friend_request",
    user: "Michael",
    avatar: "/diverse-user-avatars.png",
    message: "sent you a friend request",
    time: "4h ago",
    actions: { accept: true, decline: true },
  },
  {
    id: 3,
    type: "comment",
    user: "Sarah",
    avatar: "/diverse-user-avatars.png",
    message: "commented on your Parasite recommendation",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "view",
    user: "",
    avatar: "",
    message: "Your CineBoard 'Oscar Winners' was viewed 12 times",
    time: "2 days ago",
  },
  {
    id: 5,
    type: "watched",
    user: "Jordan",
    avatar: "/diverse-user-avatars.png",
    message: "marked The Godfather as watched",
    time: "3 days ago",
  },
  {
    id: 6,
    type: "reply",
    user: "Alex",
    avatar: "/alex-kim.jpg",
    message: "replied to your comment on Tenet",
    time: "1 week ago",
  },
]

interface NotificationsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationsPanel({ open, onOpenChange }: NotificationsPanelProps) {
  const [notificationList, setNotificationList] = useState(notifications)

  const handleFriendRequest = (notificationId: number, action: "accept" | "decline") => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  const markAllRead = () => {
    // In a real app, this would update the read status
    onOpenChange(false)
  }

  if (!open) return null

  const todayNotifications = notificationList.filter(
    (n) => n.time.includes("ago") && !n.time.includes("days") && !n.time.includes("week"),
  )

  const thisWeekNotifications = notificationList.filter(
    (n) => n.time.includes("Yesterday") || n.time.includes("days ago") || n.time.includes("week ago"),
  )

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-foreground" />
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={markAllRead}>
            Mark all read
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {/* Today Section */}
        {todayNotifications.length > 0 && (
          <div>
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">TODAY</div>
            <div className="space-y-1">
              {todayNotifications.map((notification) => (
                <div key={notification.id} className="px-4 py-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    {notification.avatar && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{notification.user[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    {!notification.avatar && notification.type === "view" && (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        {notification.user && <span className="font-medium">{notification.user} </span>}
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      {notification.actions && (
                        <div className="flex space-x-2 mt-2">
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground h-7 px-3"
                            onClick={() => handleFriendRequest(notification.id, "accept")}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-3 bg-transparent"
                            onClick={() => handleFriendRequest(notification.id, "decline")}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* This Week Section */}
        {thisWeekNotifications.length > 0 && (
          <div>
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              THIS WEEK
            </div>
            <div className="space-y-1">
              {thisWeekNotifications.map((notification) => (
                <div key={notification.id} className="px-4 py-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    {notification.avatar && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{notification.user[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    {!notification.avatar && notification.type === "view" && (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        {notification.user && <span className="font-medium">{notification.user} </span>}
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
