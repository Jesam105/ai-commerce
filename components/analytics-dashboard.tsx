"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Users, Eye, MousePointer } from "lucide-react"

const salesData = [
  { month: "Jan", revenue: 45000, orders: 320 },
  { month: "Feb", revenue: 52000, orders: 380 },
  { month: "Mar", revenue: 48000, orders: 350 },
  { month: "Apr", revenue: 61000, orders: 420 },
  { month: "May", revenue: 55000, orders: 390 },
  { month: "Jun", revenue: 67000, orders: 480 },
]

const conversionData = [
  { step: "Visitors", value: 10000, rate: 100 },
  { step: "Product Views", value: 6500, rate: 65 },
  { step: "Add to Cart", value: 2100, rate: 21 },
  { step: "Checkout", value: 1200, rate: 12 },
  { step: "Purchase", value: 850, rate: 8.5 },
]

const categoryData = [
  { name: "Electronics", value: 35, color: "#8884d8" },
  { name: "Wearables", value: 25, color: "#82ca9d" },
  { name: "Furniture", value: 20, color: "#ffc658" },
  { name: "Kitchen", value: 15, color: "#ff7300" },
  { name: "Other", value: 5, color: "#00ff88" },
]

const aiMetrics = [
  {
    title: "Recommendation CTR",
    value: "12.8%",
    change: "+2.3%",
    icon: MousePointer,
  },
  {
    title: "Search Accuracy",
    value: "94.2%",
    change: "+1.8%",
    icon: Eye,
  },
  {
    title: "Personalization Score",
    value: "87.5%",
    change: "+4.1%",
    icon: Users,
  },
  {
    title: "AI Conversion Lift",
    value: "23.7%",
    change: "+5.2%",
    icon: TrendingUp,
  },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">{metric.change}</span>
                <span className="text-sm text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionData.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{step.step}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{step.value.toLocaleString()} users</span>
                    <Badge variant="secondary">{step.rate}%</Badge>
                  </div>
                </div>
                <Progress value={step.rate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Recommendation Engine</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Click-through Rate</span>
                  <span className="font-medium">12.8%</span>
                </div>
                <Progress value={12.8} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm">Conversion Rate</span>
                  <span className="font-medium">8.5%</span>
                </div>
                <Progress value={8.5} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm">Revenue Attribution</span>
                  <span className="font-medium">34.2%</span>
                </div>
                <Progress value={34.2} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Search Intelligence</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Query Understanding</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm">Result Relevance</span>
                  <span className="font-medium">89.7%</span>
                </div>
                <Progress value={89.7} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm">Zero Results Rate</span>
                  <span className="font-medium">2.1%</span>
                </div>
                <Progress value={2.1} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
