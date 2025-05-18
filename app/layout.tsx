import type React from "react"
import "./reset.css"
import Navigation from "@/components/Navigation/Navigation"
import VoiceAssistant from "@/components/VoiceAssistant/VoiceAssistant"
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider"
import ChatbotWidget from "@/components/Chatbot/ChatbotWidget"
import EnhancedSearch from "@/components/Search/EnhancedSearch"
import { Suspense } from "react"
import NotificationSystem from "@/components/Notifications/NotificationSystem"
import PageTransition from "@/components/PageTransition/PageTransition"
import CustomCursor from "@/components/CustomCursor/CustomCursor"
import Footer from "@/components/Footer/Footer"

import "./custom-cursor.css"

export const metadata = {
  title: "CardVerse | Interactive Card Experience",
  description: "A feature-rich interactive card experience with voice navigation",
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          <PageTransition>
            <div className="app-container">
              <Navigation />
              <div className="global-search-container">
                <div className="container">
                  <Suspense>
                    <EnhancedSearch />
                  </Suspense>
                </div>
              </div>
              <VoiceAssistant />
              <main className="main-content">{children}</main>
              <ChatbotWidget />
              <NotificationSystem />
              <CustomCursor />
              <Footer />
            </div>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
