"use client"

import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Calendar, Users, DollarSign, Download, Filter, Star } from "lucide-react"

function ReportsContent() {
  return (
    <AdminLayout currentPage="reports">
      <div className="min-h-screen bg-background">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground text-lg">Track your business performance and insights</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Monthly Revenue</p>
                    <p className="text-2xl font-bold">₨45,000</p>
                    <p className="text-green-600 text-sm">+22% from last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Appointments</p>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-green-600 text-sm">+15% from last month</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">New Customers</p>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-green-600 text-sm">+8% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg. Rating</p>
                    <p className="text-2xl font-bold">4.9</p>
                    <p className="text-green-600 text-sm">+0.2 from last month</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>Booking patterns and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Services */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
              <CardDescription>Most requested services this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Facial Treatment", bookings: 45, revenue: 18000 },
                  { name: "Bridal Makeup", bookings: 12, revenue: 15000 },
                  { name: "Hair Cut & Style", bookings: 38, revenue: 9500 },
                  { name: "Eyebrow Shaping", bookings: 28, revenue: 4200 },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₨{service.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function ReportsPage() {
  return (
    <AuthGuard>
      <ReportsContent />
    </AuthGuard>
  )
}
