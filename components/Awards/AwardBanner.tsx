import "./AwardBanner.css"

export default function AwardBanner() {
  return (
    <section className="award-banner">
      <div className="container">
        <div className="award-content">
          <div className="award-trophy">🏆</div>
          <div className="award-info">
            <h3 className="award-title">International Hackathon Winner 2023</h3>
            <p className="award-description">
              CardVerse won the Grand Prize at the International Web Innovation Hackathon for its unique approach to
              interactive content and accessibility features.
            </p>
          </div>
          <div className="award-badge">
            <span className="badge-text">#1</span>
          </div>
        </div>
      </div>
    </section>
  )
}
