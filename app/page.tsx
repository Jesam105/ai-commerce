import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { AISearchDemo } from "@/components/ai-search-demo"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Search</h2>
          <Suspense fallback={<div>Loading search...</div>}>
            <AISearchDemo />
          </Suspense>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <Suspense fallback={<div>Loading products...</div>}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Personalized for You</h2>
          <Suspense fallback={<div>Loading recommendations...</div>}>
            <PersonalizedRecommendations />
          </Suspense>
        </div>
      </section>

      <StatsSection />
    </div>
  )
}
