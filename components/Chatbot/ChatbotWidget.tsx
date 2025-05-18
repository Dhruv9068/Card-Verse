"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import "./ChatbotWidget.css"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: number
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize chatbot with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: `bot-${Date.now()}`,
      text: "Hi there! I'm your CardVerse assistant. How can I help you today?",
      sender: "bot",
      timestamp: Date.now(),
    }

    setMessages([welcomeMessage])

    // Initialize speech synthesis
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthesisRef.current = new SpeechSynthesisUtterance()

      // Set voice properties
      speechSynthesisRef.current.volume = 1
      speechSynthesisRef.current.rate = 1
      speechSynthesisRef.current.pitch = 1

      // Try to use a female voice if available
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices()
        const femaleVoice = voices.find((voice) => voice.name.includes("female") || voice.name.includes("Female"))
        if (femaleVoice) {
          if (speechSynthesisRef.current) {
            speechSynthesisRef.current.voice = femaleVoice
          }
        }
      }

      // Get available voices
      window.speechSynthesis.getVoices()
    }

    return () => {
      if (window.speechSynthesis && speechSynthesisRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue)

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponse,
        sender: "bot",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, botMessage])

      // Speak the response
      speakResponse(botResponse)
    }, 500)
  }

  const speakResponse = (text: string) => {
    if (!speechSynthesisRef.current || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    // Set the text to speak
    speechSynthesisRef.current.text = text

    // Start speaking
    setIsSpeaking(true)
    window.speechSynthesis.speak(speechSynthesisRef.current)

    // Reset speaking state when done
    speechSynthesisRef.current.onend = () => {
      setIsSpeaking(false)
    }
  }

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim()

    // Helper function to check if input contains any of the given terms
    const containsAny = (terms: string[]): boolean => {
      return terms.some((term) => lowerInput.includes(term))
    }

    // Check for variations of CardVerse name
    const cardVerseVariations = ["cardverse", "card verse", "code verse", "cardvers", "card-verse", "cardverce"]
    const isAskingAboutCardVerse = cardVerseVariations.some(
      (variation) =>
        lowerInput.includes(variation) || lowerInput.replace(/\s+/g, "").includes(variation.replace(/\s+/g, "")),
    )

    // About CardVerse - handle various phrasings and name variations
    if (isAskingAboutCardVerse && containsAny(["what is", "what's", "tell me about", "explain", "info"])) {
      return "CardVerse is a digital card collection platform where you can discover, collect, and organize beautiful digital cards. You can earn points, complete challenges, and create your own collections of visually stunning cards!"
    }

    if (isAskingAboutCardVerse && containsAny(["purpose", "goal", "aim", "objective", "why"])) {
      return "The purpose of CardVerse is to bring the joy of collecting cards into the digital world. We aim to create an engaging platform where users can discover beautiful digital art, organize collections, and connect with other collectors. It combines visual appeal with gamification elements like points and challenges!"
    }

    if (isAskingAboutCardVerse && containsAny(["feature", "offer", "provide", "can do", "functionality"])) {
      return "CardVerse offers many features including: card exploration and discovery, favorites collection, bookmarking, custom collections, challenges with rewards, a points system, leaderboards, voice commands, theme customization, and a personalized profile. There's always something new to discover!"
    }

    if (isAskingAboutCardVerse && containsAny(["different", "unique", "special", "stand out"])) {
      return "What makes CardVerse unique is its combination of beautiful visual design, intuitive card organization, and engaging gamification elements. We focus on creating a seamless experience with features like voice commands, smooth animations, and personalized recommendations that adapt to your preferences!"
    }

    if (isAskingAboutCardVerse && containsAny(["use", "get started", "begin", "start"])) {
      return "To get started with CardVerse, explore the cards on the home page, swipe through cards you like, and add them to your favorites. You can create collections to organize your cards, complete challenges to earn points, and customize your experience with different themes. The more you interact, the more personalized your experience becomes!"
    }

    if (isAskingAboutCardVerse && containsAny(["cost", "price", "subscription", "pay", "free"])) {
      return "CardVerse is completely free to use! You can explore all cards, create collections, and use all features without any subscription fees. We believe in making beautiful digital collections accessible to everyone."
    }

    // Greetings
    if (containsAny(["hello", "hi", "hey", "greetings"])) {
      return "Hello! How can I assist you with CardVerse today?"
    }

    if (containsAny(["good morning"])) {
      return "Good morning! Ready to explore some cards today?"
    }

    if (containsAny(["good afternoon"])) {
      return "Good afternoon! How's your card collection growing today?"
    }

    if (containsAny(["good evening"])) {
      return "Good evening! The perfect time to browse through your favorite cards!"
    }

    // About CardVerse creators
    if (containsAny(["who made", "who created", "creator", "developer", "team"])) {
      return "CardVerse was created by a team of passionate developers who wanted to bring the joy of collecting cards into the digital world. The platform combines beautiful design with engaging features to create a unique collecting experience."
    }

    if (containsAny(["how old", "when created", "when launched", "release date", "history"])) {
      return "CardVerse is a relatively new platform that's constantly evolving with new features and cards. We're excited to have you as part of our growing community!"
    }

    // Help and features
    if (containsAny(["help", "what can you do", "assist", "support"])) {
      return "I can help you with information about CardVerse, how to use the app, and answer questions about features like collections, challenges, and points. Just ask me anything about the platform! For more detailed help, check out our <a href='/help'>Help & Support</a> page."
    }

    if (containsAny(["points", "how to earn", "reward", "score"])) {
      return "You can earn points by swiping cards, adding favorites, completing challenges, and daily logins. Points help you climb the leaderboard and unlock special features! The more you interact with CardVerse, the more points you'll earn."
    }

    if (containsAny(["collection", "how to create", "organize", "group"])) {
      return "To create a collection, go to the Collections page and click 'Create New Collection'. You can then add cards to your collection by marking them as favorites and organizing them. Collections are a great way to group cards by theme, style, or any category you prefer!"
    }

    if (containsAny(["challenge", "task", "mission", "achievement"])) {
      return "Challenges are special tasks that earn you bonus points. Check the Challenges page to see available challenges and track your progress. Completing challenges is one of the fastest ways to earn points! New challenges are added regularly to keep things interesting."
    }

    if (containsAny(["favorite", "like", "heart", "love"])) {
      return "To add a card to favorites, swipe right on the card or tap the heart icon. You can view all your favorites in the Favorites page. Favorites are a great way to keep track of cards you love and they're also the first step to adding cards to your collections!"
    }

    if (containsAny(["bookmark", "save for later", "mark"])) {
      return "Bookmarks help you save cards for later viewing. Just click the bookmark icon on any card to add it to your bookmarks. You can access all your bookmarked cards from the Bookmarks page. It's perfect for cards you want to revisit but aren't ready to add to favorites yet."
    }

    if (containsAny(["voice", "speak", "command", "talk"])) {
      return "You can use voice commands by clicking the microphone button in the bottom right corner. Try saying things like 'go to favorites' or 'dark mode' to navigate and control the app hands-free! Voice commands make it easy to use CardVerse while doing other things."
    }

    if (containsAny(["theme", "color", "dark mode", "light mode", "appearance"])) {
      return "CardVerse offers multiple themes to customize your experience. You can switch between light and dark mode by clicking the theme toggle in the navigation bar. We also have special themed collections that change the color scheme to match the cards!"
    }

    if (containsAny(["profile", "account", "personal", "my info"])) {
      return "Your CardVerse profile shows your points, achievements, favorite collections, and activity history. You can access it by clicking on the profile icon in the navigation bar. It's a great way to track your progress and see your collection growth over time!"
    }

    if (containsAny(["leaderboard", "ranking", "top users", "competition"])) {
      return "The leaderboard shows the top CardVerse users ranked by points. You can see where you stand compared to other collectors and what achievements have earned them their position. It's updated in real-time as users earn points through various activities!"
    }

    if (containsAny(["explore", "discover", "find", "browse"])) {
      return "The Explore page is where you can discover new cards. You can browse by category, use filters to find specific types of cards, or just swipe through random selections. It's constantly updated with new cards to keep your collection fresh and exciting!"
    }

    // Contact and support
    if (containsAny(["contact", "reach out", "email", "message", "feedback"])) {
      return "You can contact our team through the <a href='/contact'>Contact page</a>. We're always happy to hear from our users, whether you have questions, feedback, or suggestions for improving CardVerse!"
    }

    if (containsAny(["faq", "frequently asked", "common questions"])) {
      return "You can find answers to frequently asked questions on our <a href='/help'>Help & Support page</a>. We've organized the FAQs by category to make it easy to find the information you need."
    }

    if (containsAny(["bug", "issue", "problem", "not working", "error"])) {
      return "I'm sorry to hear you're experiencing an issue. You can find troubleshooting tips on our <a href='/help#troubleshooting'>Help page</a>, or contact our support team through the <a href='/contact'>Contact page</a> with details about the problem you're facing."
    }

    // User experience
    if (containsAny(["thank", "thanks", "appreciate", "grateful"])) {
      return "You're welcome! I'm happy to help. Let me know if you have any other questions about CardVerse!"
    }

    if (containsAny(["bye", "goodbye", "see you", "farewell"])) {
      return "Goodbye! Enjoy exploring CardVerse. Come back anytime you need assistance!"
    }

    if (containsAny(["how are you", "how's it going", "how do you do"])) {
      return "I'm doing great, thanks for asking! I'm always ready to help you navigate CardVerse and make the most of your card collection. How are you enjoying the platform so far?"
    }

    // Default response - refer to help page
    return "I'm not sure I have the answer to that question. You might find what you're looking for on our <a href='/help'>Help & Support page</a>, which has detailed FAQs about CardVerse. If you need personalized assistance, please visit our <a href='/contact'>Contact page</a> to reach our support team."
  }

  return (
    <>
      <button
        className={`chatbot-toggle ${isOpen ? "open" : ""} ${isSpeaking ? "speaking" : ""}`}
        onClick={toggleChatbot}
        aria-label="Toggle chatbot"
      >
        <div className="chatbot-icon">{isOpen ? "✕" : "💬"}</div>
      </button>

      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>CardVerse Assistant</h3>
          <button className="close-button" onClick={toggleChatbot} aria-label="Close chatbot">
            ✕
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content" dangerouslySetInnerHTML={{ __html: message.text }}></div>
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input type="text" placeholder="Type your message..." value={inputValue} onChange={handleInputChange} />
          <button type="submit" aria-label="Send message">
            <span className="send-icon">➤</span>
          </button>
        </form>
      </div>
    </>
  )
}
