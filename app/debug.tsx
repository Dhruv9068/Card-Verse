"use client"

import { useState } from "react"

export default function DebugPage() {
  const [lastCommand, setLastCommand] = useState("")

  // Super simple direct navigation function
  const navigateTo = (path: string) => {
    console.log("DIRECT NAVIGATION to:", path)
    window.location.href = path
  }

  return (
    <div className="debug-page">
      <h1>Debug Tools</h1>

      <section className="debug-section">
        <h2>Direct Navigation Test</h2>
        <p>Click these buttons to test direct navigation:</p>

        <div className="debug-actions">
          <button className="debug-button" onClick={() => navigateTo("/")}>
            Go to Home
          </button>
          <button className="debug-button" onClick={() => navigateTo("/explore")}>
            Go to Explore
          </button>
          <button className="debug-button" onClick={() => navigateTo("/favorites")}>
            Go to Favorites
          </button>
          <button className="debug-button" onClick={() => navigateTo("/bookmarks")}>
            Go to Bookmarks
          </button>
          <button className="debug-button" onClick={() => navigateTo("/collections")}>
            Go to Collections
          </button>
          <button className="debug-button" onClick={() => navigateTo("/challenges")}>
            Go to Challenges
          </button>
        </div>
      </section>

      <section className="debug-section">
        <h2>Voice Command Simulator</h2>
        <p>Type a command and press "Process" to simulate voice recognition:</p>

        <div className="command-simulator">
          <input
            type="text"
            value={lastCommand}
            onChange={(e) => setLastCommand(e.target.value)}
            placeholder="Type a command (e.g., 'go to home')"
            className="command-input"
          />
          <button
            className="debug-button"
            onClick={() => {
              if (lastCommand) {
                console.log("Processing simulated command:", lastCommand)

                // Simple command processing
                const command = lastCommand.toLowerCase()

                if (command.includes("home")) {
                  navigateTo("/")
                } else if (command.includes("explore")) {
                  navigateTo("/explore")
                } else if (command.includes("favorite")) {
                  navigateTo("/favorites")
                } else if (command.includes("bookmark")) {
                  navigateTo("/bookmarks")
                } else if (command.includes("collection")) {
                  navigateTo("/collections")
                } else if (command.includes("challenge")) {
                  navigateTo("/challenges")
                } else if (command.includes("profile")) {
                  navigateTo("/profile")
                } else if (command.includes("leaderboard")) {
                  navigateTo("/leaderboard")
                } else {
                  alert("Command not recognized: " + command)
                }
              }
            }}
          >
            Process Command
          </button>
        </div>
      </section>

      <style jsx>{`
        .debug-page {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .debug-section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        
        .debug-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 0;
        }
        
        .debug-button {
          padding: 10px 15px;
          background-color: var(--primary);
          color: white;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .debug-button:hover {
          background-color: var(--primary-light);
        }
        
        .command-simulator {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        
        .command-input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}
