"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import "./NotificationSystem.css"

export interface Notification {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
}

// Create a global notification system
let notifyFunction: (notification: Omit<Notification, "id">) => void = () => {}

// Export the notify function to be used anywhere in the app
export const notify = (notification: Omit<Notification, "id">) => {
  notifyFunction(notification)
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Set the global notify function
    notifyFunction = (notification) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newNotification = {
        ...notification,
        id,
        duration: notification.duration || 3000,
      }

      setNotifications((prev) => [...prev, newNotification])

      // Auto remove notification after duration
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return () => {
      notifyFunction = () => {}
    }
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  if (!mounted) return null

  // Use createPortal to render notifications at the root level
  return createPortal(
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="notification-icon">
            {notification.type === "success" && "✓"}
            {notification.type === "error" && "✕"}
            {notification.type === "info" && "ℹ"}
            {notification.type === "warning" && "⚠"}
          </div>
          <div className="notification-message">{notification.message}</div>
          <button
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation()
              removeNotification(notification.id)
            }}
          >
            ✕
          </button>
          <div className="notification-progress" style={{ animationDuration: `${notification.duration}ms` }}></div>
        </div>
      ))}
    </div>,
    document.body,
  )
}
