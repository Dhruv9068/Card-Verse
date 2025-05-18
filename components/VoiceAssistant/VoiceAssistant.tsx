"use client"

import { useState, useRef } from "react"
import "./VoiceAssistant.css"

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  const recognitionRef = useRef<any>(null)

  // Simple function to start listening
  const startListening = () => {
    console.log("Starting voice recognition...")

    // Initialize speech recognition if not already done
    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition

      if (!SpeechRecognition) {
        console.error("Speech recognition not supported in this browser")
        return
      }

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      // Set up event handlers
      recognitionRef.current.onstart = () => {
        console.log("Voice recognition started")
        setIsListening(true)
        setShowFeedback(true)
        setTranscript("Listening...")
      }

      recognitionRef.current.onresult = (event: any) => {
        const finalTranscript = event.results[0][0].transcript
        console.log("Heard:", finalTranscript)
        setTranscript(finalTranscript)

        // Process the command immediately
        processCommand(finalTranscript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Recognition error:", event.error)
        setIsListening(false)
        setTranscript("Error: " + event.error)
      }

      recognitionRef.current.onend = () => {
        console.log("Voice recognition ended")
        setIsListening(false)
      }
    }

    // Start listening
    try {
      recognitionRef.current.start()
    } catch (error) {
      console.error("Error starting recognition:", error)
    }
  }

  // Simple function to process commands
  const processCommand = (command: string) => {
    if (!command) return

    const lowerCommand = command.toLowerCase()
    console.log("Processing command:", lowerCommand)

    // Very simple keyword matching
    let destination = ""

    if (lowerCommand.includes("home")) {
      destination = "/"
      speak("Going to home page")
    } else if (lowerCommand.includes("explore")) {
      destination = "/explore"
      speak("Going to explore page")
    } else if (lowerCommand.includes("favorite")) {
      destination = "/favorites"
      speak("Going to favorites page")
    } else if (lowerCommand.includes("bookmark")) {
      destination = "/bookmarks"
      speak("Going to bookmarks page")
    } else if (lowerCommand.includes("collection")) {
      destination = "/collections"
      speak("Going to collections page")
    } else if (lowerCommand.includes("challenge")) {
      destination = "/challenges"
      speak("Going to challenges page")
    } else if (lowerCommand.includes("profile")) {
      destination = "/profile"
      speak("Going to profile page")
    } else if (lowerCommand.includes("leaderboard")) {
      destination = "/leaderboard"
      speak("Going to leaderboard page")
    } else if (lowerCommand.includes("dark")) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
      speak("Dark mode activated")
    } else if (lowerCommand.includes("light")) {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
      speak("Light mode activated")
    } else {
      speak("I didn't understand that command")
    }

    // Navigate if we have a destination
    if (destination) {
      console.log("NAVIGATING TO:", destination)

      // Use a slight delay to allow the speech to start
      setTimeout(() => {
        // Direct navigation - most basic approach
        window.location.href = destination
      }, 500)
    }
  }

  // Simple function to speak text
  const speak = (text: string) => {
    console.log("Speaking:", text)
    setTranscript(text)

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <>
      <button
        className={`voice-assistant-button ${isListening ? "listening" : ""}`}
        onClick={startListening}
        aria-label="Voice assistant"
      >
        <div className="mic-icon">
          <div className="mic-body"></div>
          <div className="mic-stand"></div>
          <div className="mic-base"></div>
        </div>
      </button>

      {showFeedback && (
        <div className="voice-feedback">
          <div className="voice-feedback-content">
            {isListening ? (
              <>
                <div className="listening-indicator">
                  <div className="listening-dot"></div>
                  <div className="listening-dot"></div>
                  <div className="listening-dot"></div>
                </div>
                <p>Listening...</p>
              </>
            ) : (
              <p>{transcript}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
