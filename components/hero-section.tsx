import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Zap, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="max-w-7xl mx-auto text-center">
        <Badge variant="secondary" className="mb-4">
          <Zap className="w-4 h-4 mr-2" />
          AI-Powered Commerce
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Intelligent E-commerce
          <br />
          Redefined
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Experience the future of online shopping with AI-powered recommendations, intelligent search, and automated
          inventory management that adapts to your needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" asChild>
            <Link href="/products">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/admin">View Admin Dashboard</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground text-center">
              AI analyzes user behavior to suggest perfect products
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Intelligent Search</h3>
            <p className="text-sm text-muted-foreground text-center">Natural language search with intent prediction</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Automated Management</h3>
            <p className="text-sm text-muted-foreground text-center">ML-driven inventory and pricing optimization</p>
          </div>
        </div>
      </div>
    </section>
  )
}
