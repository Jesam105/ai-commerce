import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, ShoppingCart, Zap } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
    description: "Growing customer base",
  },
  {
    icon: ShoppingCart,
    value: "98.5%",
    label: "Recommendation Accuracy",
    description: "AI-powered precision",
  },
  {
    icon: TrendingUp,
    value: "35%",
    label: "Conversion Increase",
    description: "With personalization",
  },
  {
    icon: Zap,
    value: "0.2s",
    label: "Search Response Time",
    description: "Lightning fast results",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Performance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered e-commerce platform delivers exceptional results through intelligent automation and
            personalization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
