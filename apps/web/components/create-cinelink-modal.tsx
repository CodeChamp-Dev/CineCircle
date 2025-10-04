"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Film, Mail, MessageSquare } from "lucide-react"

interface CreateCineLinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCineLinkModal({ open, onOpenChange }: CreateCineLinkModalProps) {
  const [friendEmail, setFriendEmail] = useState("")
  const [boardName, setBoardName] = useState("")
  const [message, setMessage] = useState("")
  const [selectedFilms, setSelectedFilms] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const resetForm = () => {
    setFriendEmail("")
    setBoardName("")
    setMessage("")
    setSelectedFilms([])
    setError("")
    setIsSubmitting(false)
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // Basic validation
      if (!friendEmail || !boardName) {
        setError("Please fill in all required fields")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(friendEmail)) {
        setError("Please enter a valid email address")
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log({ friendEmail, boardName, message, selectedFilms })
      handleClose(false)
    } catch (err) {
      setError("Failed to create CineLink. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader className="pb-3 border-b border-border">
          <DialogTitle className="text-xl font-semibold text-foreground">Create a CineLink</DialogTitle>
        </DialogHeader>

        <div className="px-6">
          <form id="cinelink-form" onSubmit={handleSubmit} className="space-y-3 pt-3 pb-3">
          {/* Error Display */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Friend's Email */}
          <div className="space-y-2">
            <Label htmlFor="friendEmail" className="text-sm font-medium text-foreground">
              Friend's Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="friendEmail"
                type="email"
                placeholder="email@example.com"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">They'll receive an invitation by email</p>
          </div>

          {/* Board Name */}
          <div className="space-y-2">
            <Label htmlFor="boardName" className="text-sm font-medium text-foreground">
              Board Name
            </Label>
            <Input
              id="boardName"
              placeholder="Movie picks for Sarah"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Give your CineBoard a descriptive name</p>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Personal Message (Optional)
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                placeholder="Here are some films I think you'd enjoy..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                className="pl-10 min-h-[60px] resize-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Add a personal note to your friend</p>
              <span className="text-xs text-muted-foreground">{message.length}/200</span>
            </div>
          </div>

          {/* Add Films */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Add Films</Label>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {selectedFilms.length} selected
              </span>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Film className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">No films selected yet</p>
                  <p className="text-xs text-muted-foreground">Add movies to create your CineBoard</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Films
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!friendEmail || !boardName || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create CineLink"}
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
