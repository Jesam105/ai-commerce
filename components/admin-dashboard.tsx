import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Package, Users, DollarSign, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const kpis = [
  {
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Orders",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    change: "+0.3",
    trend: "up",
    icon: Users,
  },
  {
    title: "AI Accuracy",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
  },
]

const alerts = [
  {
    type: "warning",
    message: "Low stock alert: Wireless Headphones (12 units remaining)",
    time: "2 hours ago",
  },
  {
    type: "success",
    message: "AI pricing optimization increased conversion by 15%",
    time: "4 hours ago",
  },
  {
    type: "info",
    message: "New personalization model deployed successfully",
    time: "6 hours ago",
  },
]

const recentActivity = [
  {
    action: "Inventory restocked",
    item: "Smart Fitness Tracker Pro",
    quantity: 150,
    time: "1 hour ago",
  },
  {
    action: "Price updated",
    item: "Wireless Charging Station",
    change: "-5%",
    time: "3 hours ago",
  },
  {
    action: "New product added",
    item: "Premium Coffee Maker",
    status: "Active",
    time: "5 hours ago",
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <kpi.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {kpi.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                {alert.type === "success" && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />}
                {alert.type === "info" && <Clock className="w-5 h-5 text-blue-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                </div>
                <div className="text-right">
                  {activity.quantity && <Badge variant="secondary">+{activity.quantity}</Badge>}
                  {activity.change && <Badge variant="outline">{activity.change}</Badge>}
                  {activity.status && <Badge variant="default">{activity.status}</Badge>}
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>AI Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Recommendation Accuracy</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Search Relevance</span>
                <span>89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pricing Optimization</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
