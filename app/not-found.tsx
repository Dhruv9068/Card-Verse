"use client"

import { Suspense } from "react"
import Link from "next/link"

// Client component that uses useSearchParams should be separated
function NotFoundContent() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/" className="not-found-button">
          Return to Home
        </Link>
      </div>

      <style jsx>{`
        .not-found-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          text-align: center;
          padding: 20px;
        }
        
        .not-found-container {
          max-width: 500px;
          padding: 40px;
          background-color: var(--card-bg);
          border-radius: var(--border-radius);
          box-shadow: 0 4px 20px var(--shadow);
        }
        
        .not-found-title {
          font-size: 6rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(to right, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .not-found-subtitle {
          font-size: 2rem;
          margin: 0 0 20px;
        }
        
        .not-found-text {
          margin-bottom: 30px;
          opacity: 0.8;
        }
        
        .not-found-button {
          display: inline-block;
          padding: 12px 24px;
          background-color: var(--primary);
          color: white;
          border-radius: 30px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .not-found-button:hover {
          background-color: var(--primary-light);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 180, 216, 0.2);
        }
      `}</style>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
}
