import CardDeck from "@/components/CardDeck/CardDeck"
import FeaturedCategories from "@/components/Categories/FeaturedCategories"
import RecommendationBanner from "@/components/Recommendations/RecommendationBanner"
import HeroSection from "@/components/Hero/HeroSection"
import TestimonialSection from "@/components/Testimonials/TestimonialSection"
import FeatureHighlights from "@/components/Features/FeatureHighlights"
import SmartRecommendations from "@/components/Recommendations/SmartRecommendations"
import AnimatedQuotes from "@/components/Quotes/AnimatedQuotes"
import "./home.css"

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />

      <section className="featured-categories">
        <h2 className="section-title">Featured Categories</h2>
        <FeaturedCategories />
      </section>

      <AnimatedQuotes />

      <SmartRecommendations />

      <FeatureHighlights />

      <section className="cards-section">
        <h2 className="section-title">Today's Picks</h2>
        <CardDeck />
      </section>

      <TestimonialSection />

      <RecommendationBanner />
    </div>
  )
}
