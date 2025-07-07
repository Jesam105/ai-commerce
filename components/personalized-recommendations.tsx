"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, TrendingUp, User, Clock } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const userProfiles = [
  {
    id: "fitness-enthusiast",
    name: "Fitness Enthusiast",
    interests: ["workout gear", "nutrition", "wearables"],
    recentViews: ["running shoes", "protein powder", "fitness tracker"],
  },
  {
    id: "tech-professional",
    name: "Tech Professional",
    interests: ["electronics", "productivity", "workspace"],
    recentViews: ["laptop", "wireless mouse", "standing desk"],
  },
  {
    id: "home-chef",
    name: "Home Chef",
    interests: ["kitchen appliances", "cooking tools", "ingredients"],
    recentViews: ["chef knife", "cast iron pan", "spice rack"],
  },
]

const baseRecommendations = [
  {
    id: 1,
    name: "Premium Yoga Mat",
    price: 79.99,
    image: "/images/yoga-mat.png",
    reason: "Based on your fitness activity",
    confidence: 92,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "/images/keyboard.png",
    reason: "Perfect for your workspace setup",
    confidence: 88,
  },
  {
    id: 3,
    name: "Ceramic Knife Set",
    price: 89.99,
    image: "/images/knife-set.png",
    reason: "Matches your cooking interests",
    confidence: 85,
  },
]

export function PersonalizedRecommendations() {
  const [selectedProfile, setSelectedProfile] = useState(userProfiles[0])
  const [recommendations, setRecommendations] = useState(baseRecommendations)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiInsights, setAiInsights] = useState("")

  const generatePersonalizedRecommendations = async (profile: (typeof userProfiles)[0]) => {
    setIsGenerating(true)

    try {
      // Check if OpenAI API key is available
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
        // Fallback to rule-based insights when API key is not available
        const fallbackInsights = generateProfileInsights(profile)
        setAiInsights(fallbackInsights)
      } else {
        // Use actual AI when API key is available
        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          prompt: `Generate personalized e-commerce insights for a user profile:
        Name: ${profile.name}
        Interests: ${profile.interests.join(", ")}
        Recent Views: ${profile.recentViews.join(", ")}
        
        Provide 2-3 sentences about why these product recommendations would appeal to this user, focusing on their behavior patterns and preferences. Keep it under 80 words.`,
        })
        setAiInsights(text)
      }
    } catch (error) {
      console.error("AI generation error:", error)
      const fallbackInsights = generateProfileInsights(profile)
      setAiInsights(fallbackInsights)
    } finally {
      setIsGenerating(false)
    }
  }

  // Add this helper function for fallback profile insights
  const generateProfileInsights = (profile: (typeof userProfiles)[0]): string => {
    switch (profile.id) {
      case "fitness-enthusiast":
        return "As a fitness enthusiast, you'll appreciate products that enhance your workout performance and recovery. Our recommendations focus on high-quality gear that supports your active lifestyle, with emphasis on durability and functionality."
      case "tech-professional":
        return "Your tech-focused profile indicates a preference for productivity-enhancing tools and cutting-edge technology. These recommendations prioritize performance, reliability, and features that streamline your professional workflow."
      case "home-chef":
        return "Based on your culinary interests, these products are selected to elevate your cooking experience. We've focused on quality kitchen tools and appliances that combine functionality with professional-grade performance."
      default:
        return `Recommendations tailored for ${profile.name} based on interests in ${profile.interests.join(", ")} and recent browsing behavior.`
    }
  }

  useEffect(() => {
    generatePersonalizedRecommendations(selectedProfile)
  }, [selectedProfile])

  return (
    <div className="space-y-6">
      {/* User Profile Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Select User Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {userProfiles.map((profile) => (
              <Button
                key={profile.id}
                variant={selectedProfile.id === profile.id ? "default" : "outline"}
                onClick={() => setSelectedProfile(profile)}
                className="flex items-center gap-2"
              >
                {profile.name}
                {selectedProfile.id === profile.id && <TrendingUp className="w-4 h-4" />}
              </Button>
            ))}
          </div>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Profile Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Interests:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Recent Views:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedProfile.recentViews.map((view, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {view}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                AI Personalization Insights
                {isGenerating && <RefreshCw className="w-4 h-4 animate-spin" />}
              </h4>
              {isGenerating ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{aiInsights}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Badge className="absolute top-2 right-2 bg-primary/90">{product.confidence}% Match</Badge>
              </div>

              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-primary mb-2">${product.price}</p>

              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{product.reason}</span>
              </div>

              <Button className="w-full" size="sm">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
