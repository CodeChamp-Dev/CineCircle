"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, MoreHorizontal, Send, Heart, Play } from "lucide-react"

interface Message {
  id: string
  type: "message" | "system" | "reaction"
  sender?: string
  content: string
  timestamp: string
  avatar?: string
  isCurrentUser?: boolean
  reactionData?: {
    user: string
    emoji: string
    target: string
  }
}

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  contact: {
    name: string
    status: string
    avatar: string
  }
}

const messages: Message[] = [
  {
    id: "1",
    type: "system",
    content: "Sarah started watching Parasite",
    timestamp: "Today, 2:45 PM",
  },
  {
    id: "2",
    type: "message",
    sender: "Sarah Johnson",
    content: "Hey! Thanks for recommending Parasite. I'm about 30 minutes in and it's fantastic already!",
    timestamp: "2:45 PM",
    avatar: "/diverse-user-avatars.png",
    isCurrentUser: false,
  },
  {
    id: "3",
    type: "message",
    sender: "You",
    content: "I'm so glad you're enjoying it! The director's use of visual storytelling is incredible.",
    timestamp: "2:48 PM",
    isCurrentUser: true,
  },
  {
    id: "4",
    type: "message",
    sender: "Sarah Johnson",
    content: "The contrast between the two families is so well done. I can already see why it won Best Picture!",
    timestamp: "2:51 PM",
    avatar: "/diverse-user-avatars.png",
    isCurrentUser: false,
  },
  {
    id: "5",
    type: "reaction",
    content: "",
    timestamp: "",
    reactionData: {
      user: "Sarah",
      emoji: "❤️",
      target: "Parasite",
    },
  },
  {
    id: "6",
    type: "message",
    sender: "You",
    content: "Exactly! Let me know when you finish it - there's an amazing twist I can't wait to discuss!",
    timestamp: "3:02 PM",
    isCurrentUser: true,
  },
]

export default function ChatInterface({ isOpen, onClose, contact }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg w-full max-w-4xl h-[80vh] flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-card border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-primary-foreground fill-current" />
              </div>
              <div>
                <div className="font-semibold text-foreground">CineCircle</div>
                <div className="text-sm text-foreground">CineBoard</div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-sm">Chat is now</div>
              <div className="text-sm">open</div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-card border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-foreground">{contact.name}</div>
                <div className="text-sm text-primary flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  {contact.status}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              if (message.type === "system") {
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{message.timestamp}</div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <Play className="w-3 h-3 mr-1" />
                        {message.content}
                      </Badge>
                    </div>
                  </div>
                )
              }

              if (message.type === "reaction") {
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                      <span>
                        {message.reactionData?.user} reacted with {message.reactionData?.emoji} to{" "}
                        {message.reactionData?.target}
                      </span>
                    </div>
                  </div>
                )
              }

              return (
                <div key={message.id} className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex space-x-3 max-w-[70%] ${message.isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    {!message.isCurrentUser && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`space-y-1 ${message.isCurrentUser ? "items-end" : "items-start"} flex flex-col`}>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-muted-foreground">{message.timestamp}</div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-[70%]">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-background border-border"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
