"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, TrendingUp, AlertTriangle, RefreshCw, Search, Filter } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const inventoryData = [
  {
    id: 1,
    name: "Smart Fitness Tracker Pro",
    sku: "SFT-001",
    currentStock: 45,
    reorderPoint: 20,
    forecastDemand: 85,
    category: "Wearables",
    status: "In Stock",
    lastRestocked: "2024-01-15",
    supplier: "TechCorp",
  },
  {
    id: 2,
    name: "Wireless Charging Station",
    sku: "WCS-002",
    currentStock: 12,
    reorderPoint: 15,
    forecastDemand: 35,
    category: "Electronics",
    status: "Low Stock",
    lastRestocked: "2024-01-10",
    supplier: "ElectroSupply",
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    sku: "EOC-003",
    currentStock: 8,
    reorderPoint: 10,
    forecastDemand: 25,
    category: "Furniture",
    status: "Critical",
    lastRestocked: "2024-01-05",
    supplier: "FurniturePlus",
  },
  {
    id: 4,
    name: "Premium Coffee Maker",
    sku: "PCM-004",
    currentStock: 67,
    reorderPoint: 25,
    forecastDemand: 40,
    category: "Kitchen",
    status: "In Stock",
    lastRestocked: "2024-01-18",
    supplier: "KitchenPro",
  },
]

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isGeneratingForecast, setIsGeneratingForecast] = useState(false)
  const [forecastInsights, setForecastInsights] = useState("")

  const generateAIForecast = async () => {
    setIsGeneratingForecast(true)

    try {
      const lowStockItems = inventoryData.filter((item) => item.status === "Low Stock" || item.status === "Critical")

      // Check if OpenAI API key is available
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
        // Fallback to rule-based forecasting when API key is not available
        const fallbackForecast = generateInventoryFallback(lowStockItems)
        setForecastInsights(fallbackForecast)
      } else {
        // Use actual AI when API key is available
        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          prompt: `Analyze this inventory data and provide AI-powered insights:
        
        Low stock items: ${lowStockItems.map((item) => `${item.name} (${item.currentStock} units, reorder point: ${item.reorderPoint})`).join(", ")}
        
        Provide 2-3 actionable recommendations for inventory optimization, considering demand forecasting and reorder strategies. Keep under 100 words.`,
        })
        setForecastInsights(text)
      }
    } catch (error) {
      console.error("Forecast generation error:", error)
      const lowStockItems = inventoryData.filter((item) => item.status === "Low Stock" || item.status === "Critical")
      const fallbackForecast = generateInventoryFallback(lowStockItems)
      setForecastInsights(fallbackForecast)
    } finally {
      setIsGeneratingForecast(false)
    }
  }

  // Add this helper function for fallback inventory insights
  const generateInventoryFallback = (lowStockItems: typeof inventoryData): string => {
    if (lowStockItems.length === 0) {
      return "Inventory levels are healthy across all products. Continue monitoring demand patterns and maintain current reorder schedules. Consider seasonal adjustments for upcoming quarters."
    }

    const criticalItems = lowStockItems.filter((item) => item.status === "Critical").length
    const lowStockCount = lowStockItems.filter((item) => item.status === "Low Stock").length

    let insights = `Immediate attention needed: ${criticalItems} critical items require urgent restocking. `

    if (lowStockCount > 0) {
      insights += `${lowStockCount} items approaching reorder points. `
    }

    insights +=
      "Recommend increasing safety stock for high-demand categories and establishing automated reorder triggers to prevent stockouts."

    return insights
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default"
      case "Low Stock":
        return "secondary"
      case "Critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{inventoryData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold">
                  {inventoryData.filter((item) => item.status === "In Stock").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold">
                  {inventoryData.filter((item) => item.status === "Low Stock").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold">
                  {inventoryData.filter((item) => item.status === "Critical").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Forecast Insights */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AI Inventory Forecast
            </span>
            <Button onClick={generateAIForecast} disabled={isGeneratingForecast} size="sm">
              {isGeneratingForecast ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Generate Forecast
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {forecastInsights ? (
            <p className="text-sm">{forecastInsights}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Generate Forecast" to get AI-powered inventory insights and recommendations.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Forecast Demand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.currentStock}</span>
                      {item.currentStock <= item.reorderPoint && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.forecastDemand}</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
