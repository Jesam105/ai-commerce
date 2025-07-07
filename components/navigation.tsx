"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ShoppingBag, Search, User, Menu, Zap, BarChart3, Package, Settings } from "lucide-react"

export function Navigation() {
  const [cartItems] = useState(3)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">AI Commerce</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Categories</h4>
                        <ul className="space-y-1 text-sm">
                          <li>
                            <Link
                              href="/products?category=electronics"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              Electronics
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products?category=wearables"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              Wearables
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products?category=furniture"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              Furniture
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products?category=kitchen"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              Kitchen
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">AI Features</h4>
                        <ul className="space-y-1 text-sm">
                          <li>
                            <Link href="/recommendations" className="text-muted-foreground hover:text-foreground">
                              Personalized
                            </Link>
                          </li>
                          <li>
                            <Link href="/trending" className="text-muted-foreground hover:text-foreground">
                              Trending
                            </Link>
                          </li>
                          <li>
                            <Link href="/deals" className="text-muted-foreground hover:text-foreground">
                              Smart Deals
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[300px]">
                    <div className="space-y-2">
                      <Link href="/admin" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link href="/admin/inventory" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                        <Package className="w-4 h-4" />
                        <span>Inventory</span>
                      </Link>
                      <Link href="/admin/pricing" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                        <Settings className="w-4 h-4" />
                        <span>Pricing Engine</span>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search products...</span>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItems}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
