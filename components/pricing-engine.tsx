"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, TrendingDown, Target, Zap, RefreshCw } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const pricingData = [
  {
    id: 1,
    name: "Smart Fitness Tracker Pro",
    currentPrice: 199.99,
    suggestedPrice: 189.99,
    competitorPrice: 195.0,
    demand: "High",
    inventory: 45,
    conversionRate: 3.2,
    profitMargin: 35,
    priceElasticity: -1.2,
  },
  {
    id: 2,
    name: "Wireless Charging Station",
    currentPrice: 89.99,
    suggestedPrice: 94.99,
    competitorPrice: 99.99,
    demand: "Medium",
    inventory: 12,
    conversionRate: 2.8,
    profitMargin: 42,
    priceElasticity: -0.8,
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    currentPrice: 299.99,
    suggestedPrice: 279.99,
    competitorPrice: 320.0,
    demand: "Low",
    inventory: 8,
    conversionRate: 1.5,
    profitMargin: 28,
    priceElasticity: -1.5,
  },
]

export function PricingEngine() {
  const [autoOptimization, setAutoOptimization] = useState(true)
  const [priceAdjustment, setPriceAdjustment] = useState([0])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationInsights, setOptimizationInsights] = useState("")

  const generatePricingInsights = async () => {
    setIsOptimizing(true)

    try {
      // Check if OpenAI API key is available
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
        // Fallback to rule-based pricing insights when API key is not available
        const fallbackInsights = generatePricingFallback()
        setOptimizationInsights(fallbackInsights)
      } else {
        // Use actual AI when API key is available
        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          prompt: `Analyze this pricing data and provide AI-powered pricing recommendations:
        
        Products with pricing opportunities:
        ${pricingData
          .map(
            (item) =>
              `${item.name}: Current $${item.currentPrice}, Suggested $${item.suggestedPrice}, Competitor $${item.competitorPrice}, Demand: ${item.demand}, Inventory: ${item.inventory}`,
          )
          .join("\n")}
        
        Provide 2-3 specific pricing strategy recommendations considering demand, competition, and inventory levels. Keep under 100 words.`,
        })
        setOptimizationInsights(text)
      }
    } catch (error) {
      console.error("Pricing optimization error:", error)
      const fallbackInsights = generatePricingFallback()
      setOptimizationInsights(fallbackInsights)
    } finally {
      setIsOptimizing(false)
    }
  }

  // Add this helper function for fallback pricing insights
  const generatePricingFallback = (): string => {
    const highDemandItems = pricingData.filter((item) => item.demand === "High")
    const lowInventoryItems = pricingData.filter((item) => item.inventory < 20)
    const competitiveAdvantage = pricingData.filter((item) => item.currentPrice < item.competitorPrice)

    let insights = ""

    if (highDemandItems.length > 0) {
      insights += `High-demand products (${highDemandItems.map((i) => i.name).join(", ")}) show potential for price optimization. `
    }

    if (lowInventoryItems.length > 0) {
      insights += `Low inventory items may benefit from strategic price increases to manage demand. `
    }

    if (competitiveAdvantage.length > 0) {
      insights += `Maintain competitive pricing advantage while monitoring market response and profit margins.`
    }

    return (
      insights ||
      "Current pricing strategy appears balanced. Monitor competitor movements and demand patterns for optimization opportunities."
    )
  }

  const getPriceChangeIcon = (current: number, suggested: number) => {
    if (suggested > current) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (suggested < current) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
    return <Target className="w-4 h-4 text-gray-500" />
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Pricing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Price</p>
                <p className="text-2xl font-bold">$196.66</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Potential Uplift</p>
                <p className="text-2xl font-bold">+8.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Margin</p>
                <p className="text-2xl font-bold">35%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Auto-Optimized</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Pricing Controls
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-optimization" checked={autoOptimization} onCheckedChange={setAutoOptimization} />
                <Label htmlFor="auto-optimization">Auto-Optimization</Label>
              </div>
              <Button onClick={generatePricingInsights} disabled={isOptimizing} size="sm">
                {isOptimizing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                Optimize Prices
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Global Price Adjustment: {priceAdjustment[0]}%</Label>
            <Slider
              value={priceAdjustment}
              onValueChange={setPriceAdjustment}
              max={20}
              min={-20}
              step={1}
              className="mt-2"
            />
          </div>

          {optimizationInsights && (
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-sm mb-2">AI Pricing Insights</h4>
              <p className="text-sm text-muted-foreground">{optimizationInsights}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Pricing Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>AI Suggested</TableHead>
                <TableHead>Competitor</TableHead>
                <TableHead>Demand</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono">${item.currentPrice}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">${item.suggestedPrice}</span>
                      {getPriceChangeIcon(item.currentPrice, item.suggestedPrice)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">${item.competitorPrice}</TableCell>
                  <TableCell>
                    <Badge variant={getDemandColor(item.demand)}>{item.demand}</Badge>
                  </TableCell>
                  <TableCell>{item.conversionRate}%</TableCell>
                  <TableCell>{item.profitMargin}%</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Apply
                      </Button>
                      <Button size="sm" variant="ghost">
                        Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Price Elasticity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Price Elasticity Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingData.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">{item.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Elasticity:</span>
                    <span className="font-mono">{item.priceElasticity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inventory:</span>
                    <span>{item.inventory} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Optimal Price:</span>
                    <span className="font-mono text-primary">${item.suggestedPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
