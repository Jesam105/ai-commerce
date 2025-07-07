import { Suspense } from "react"
import { AdminDashboard } from "@/components/admin-dashboard"
import { InventoryManagement } from "@/components/inventory-management"
import { PricingEngine } from "@/components/pricing-engine"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your AI-powered e-commerce platform with intelligent insights and automation.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Suspense fallback={<div>Loading dashboard...</div>}>
              <AdminDashboard />
            </Suspense>
          </TabsContent>

          <TabsContent value="inventory">
            <Suspense fallback={<div>Loading inventory...</div>}>
              <InventoryManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="pricing">
            <Suspense fallback={<div>Loading pricing engine...</div>}>
              <PricingEngine />
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics">
            <Suspense fallback={<div>Loading analytics...</div>}>
              <AnalyticsDashboard />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
