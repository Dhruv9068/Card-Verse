import "./FeatureHighlights.css"

export default function FeatureHighlights() {
  const features = [
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Find exactly what you're looking for with our powerful search capabilities.",
    },
    {
      icon: "🎯",
      title: "Personalized Recommendations",
      description: "Discover new cards tailored to your preferences and browsing history.",
    },
    {
      icon: "🔊",
      title: "Voice Navigation",
      description: "Control the app hands-free with our advanced voice command system.",
    },
    {
      icon: "🏆",
      title: "Points & Challenges",
      description: "Earn points and complete challenges as you explore and interact.",
    },
  ]

  return (
    <section className="feature-highlights">
      <div className="container">
        <h2 className="section-title">Why Choose CardVerse</h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
