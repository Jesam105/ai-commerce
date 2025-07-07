import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { AISearchDemo } from "@/components/ai-search-demo"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Products</h1>
          <Suspense fallback={<div>Loading search...</div>}>
            <AISearchDemo />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
