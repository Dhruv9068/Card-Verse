import Link from "next/link"
import "./Footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">CardVerse</h3>
            <p className="footer-description">
             CardVerse is a card-based recommendation platform for exploring, collecting, and organizing knowledge interactively.
            </p>
           
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/explore">Explore</Link>
              </li>
              <li>
                <Link href="/collections">Collections</Link>
              </li>
              <li>
                <Link href="/challenges">Challenges</Link>
              </li>
              <li>
                <Link href="/leaderboard">Leaderboard</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li>
                <Link href="/help">Help & Support</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/help#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/help#troubleshooting">Troubleshooting</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">𝕏</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📸</span>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <span className="social-icon">🐙</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span className="social-icon">💼</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
         
          <p className="credits">Designed and Developed by Dhruv Chaturvedi</p>
        </div>
      </div>
    </footer>
  )
}
