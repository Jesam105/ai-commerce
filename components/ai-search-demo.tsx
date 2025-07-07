"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, Clock } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const searchSuggestions = [
  "comfortable running shoes for marathon",
  "wireless headphones with noise cancellation",
  "eco-friendly water bottle for hiking",
  "professional laptop for video editing",
]

const mockProducts = [
  {
    id: 1,
    name: "UltraRun Pro Marathon Shoes",
    price: 159.99,
    image: "/images/running-shoes.png",
    rating: 4.8,
    category: "Athletic Footwear",
  },
  {
    id: 2,
    name: "SoundMax Wireless Headphones",
    price: 249.99,
    image: "/images/headphones.png",
    rating: 4.6,
    category: "Audio",
  },
  {
    id: 3,
    name: "EcoFlow Insulated Water Bottle",
    price: 34.99,
    image: "/images/water-bottle.png",
    rating: 4.9,
    category: "Outdoor Gear",
  },
]

export function AISearchDemo() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([])
  const [searchInsights, setSearchInsights] = useState("")

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)
    setIsSearching(true)

    try {
      // Check if OpenAI API key is available
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
        // Fallback to simulated AI insights when API key is not available
        const fallbackInsights = generateFallbackInsights(searchQuery)
        setSearchInsights(fallbackInsights)
      } else {
        // Use actual AI when API key is available
        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          prompt: `Analyze this e-commerce search query and provide insights about user intent: "${searchQuery}". 
        Focus on: 1) What the user is looking for, 2) Key features they might value, 3) Price sensitivity indicators.
        Keep response under 100 words and actionable.`,
        })
        setSearchInsights(text)
      }

      // Filter mock products based on query (simplified)
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setSearchResults(filtered.length > 0 ? filtered : mockProducts.slice(0, 2))
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults(mockProducts.slice(0, 2))
      const fallbackInsights = generateFallbackInsights(searchQuery)
      setSearchInsights(fallbackInsights)
    } finally {
      setIsSearching(false)
    }
  }

  // Add this helper function for fallback insights
  const generateFallbackInsights = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("running") || lowerQuery.includes("marathon")) {
      return "Users searching for running gear typically prioritize comfort, durability, and performance features. Consider highlighting cushioning technology, breathability, and long-distance support in product recommendations."
    } else if (lowerQuery.includes("wireless") || lowerQuery.includes("headphones")) {
      return "Audio product searches often focus on sound quality, battery life, and noise cancellation. Users may be price-sensitive but willing to pay premium for brand reputation and advanced features."
    } else if (lowerQuery.includes("water bottle") || lowerQuery.includes("hiking")) {
      return "Outdoor gear customers value durability, eco-friendliness, and practical features. They often research thoroughly before purchasing and appreciate detailed product specifications."
    } else if (lowerQuery.includes("laptop") || lowerQuery.includes("professional")) {
      return "Professional equipment buyers focus on performance specifications, warranty, and long-term value. They typically have higher budgets and prefer established brands with proven reliability."
    } else {
      return `Based on your search for "${query}", we've identified products that match your interests. Our AI considers factors like product popularity, user reviews, and seasonal trends to provide the most relevant recommendations.`
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Try: 'comfortable running shoes for marathon training'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(query)}
          className="pl-10 pr-20 h-12 text-lg"
        />
        <Button
          onClick={() => handleSearch(query)}
          disabled={isSearching || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {isSearching ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Try these:</span>
        {searchSuggestions.map((suggestion, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80"
            onClick={() => handleSearch(suggestion)}
          >
            {suggestion}
          </Badge>
        ))}
      </div>

      {searchInsights && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-2">AI Search Insights</h4>
                <p className="text-sm text-muted-foreground">{searchInsights}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <Badge variant="secondary">{product.rating} ⭐</Badge>
                </div>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
