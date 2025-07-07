import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Smart Fitness Tracker Pro",
    price: 199.99,
    originalPrice: 249.99,
    image: "/images/fitness-tracker.png",
    rating: 4.8,
    reviews: 1247,
    category: "Wearables",
    badge: "Best Seller",
    features: ["Heart Rate Monitor", "GPS Tracking", "7-Day Battery"],
  },
  {
    id: 2,
    name: "Wireless Charging Station",
    price: 89.99,
    originalPrice: 119.99,
    image: "/images/wireless-charger.png",
    rating: 4.6,
    reviews: 892,
    category: "Electronics",
    badge: "AI Recommended",
    features: ["Fast Charging", "Multi-Device", "LED Indicators"],
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 299.99,
    originalPrice: 399.99,
    image: "/images/office-chair.png",
    rating: 4.9,
    reviews: 2156,
    category: "Furniture",
    badge: "Top Rated",
    features: ["Lumbar Support", "Adjustable Height", "Breathable Mesh"],
  },
  {
    id: 4,
    name: "Premium Coffee Maker",
    price: 159.99,
    originalPrice: 199.99,
    image: "/images/coffee-maker.png",
    rating: 4.7,
    reviews: 634,
    category: "Kitchen",
    badge: "New Arrival",
    features: ["Programmable", "Auto-Clean", "Thermal Carafe"],
  },
]

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge
                className="absolute top-3 left-3"
                variant={product.badge === "Best Seller" ? "default" : "secondary"}
              >
                {product.badge}
              </Badge>
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <Badge variant="outline" className="text-xs mb-2">
                  {product.category}
                </Badge>
                <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                <Badge variant="destructive" className="text-xs">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>

              <div className="space-y-1">
                {product.features.map((feature, index) => (
                  <div key={index} className="text-xs text-muted-foreground flex items-center">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              <Button className="w-full" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
