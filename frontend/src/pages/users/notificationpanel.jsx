"use client"

import { useState } from "react"
import { Bell, X, Check } from "lucide-react"
import "../../styles/notification.css"

const NotificationsPanel = ({ isOpen, onClose }) => {
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_pet",
      title: "New pets available",
      message: "5 new pets were added in your area",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "application",
      title: "Application Update",
      message: "Your application for adopting Max has been approved",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "event",
      title: "Upcoming Event",
      message: "Pet adoption day this weekend in Frankfurt",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "system",
      title: "Profile Updated",
      message: "Your profile information has been updated successfully",
      time: "1 week ago",
      read: true,
    },
  ])

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!isOpen) return null

  return (
    <div className="notifications-overlay" onClick={onClose}>
      <div className="notifications-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notifications-header">
          <div className="notifications-title">
            <h2>Notifications</h2>
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </div>
          <div className="notifications-actions">
            {unreadCount > 0 && (
              <button className="mark-read-button" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
            <button className="close-notifications-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <Bell size={40} />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? "unread" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
                {!notification.read && (
                  <button
                    className="mark-read-icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      markAsRead(notification.id)
                    }}
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPanel
