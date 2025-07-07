import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Filter } from "lucide-react"

const categories = [
  { name: "Electronics", count: 45 },
  { name: "Wearables", count: 23 },
  { name: "Furniture", count: 18 },
  { name: "Kitchen", count: 32 },
  { name: "Sports", count: 27 },
]

const brands = [
  { name: "TechCorp", count: 15 },
  { name: "SmartHome", count: 12 },
  { name: "FitnessPro", count: 8 },
  { name: "KitchenMaster", count: 11 },
]

export function ProductFilters() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="space-y-3">
              <Slider defaultValue={[50, 500]} max={1000} step={10} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={category.name} />
                    <label htmlFor={category.name} className="text-sm">
                      {category.name}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-medium mb-3">Brands</h4>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={brand.name} />
                    <label htmlFor={brand.name} className="text-sm">
                      {brand.name}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {brand.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="font-medium mb-3">Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                    <div className="flex mr-2">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      {Array.from({ length: 5 - rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gray-300" />
                      ))}
                    </div>
                    & up
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-transparent" variant="outline">
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
