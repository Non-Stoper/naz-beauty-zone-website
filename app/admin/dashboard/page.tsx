"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  ArrowRight,
  Activity,
  Target,
  Award,
  ImageIcon,
  Plus,
  Eye,
  BarChart3,
  Phone,
  Mail,
  Sparkles,
  Heart,
  Camera,
  Settings,
} from "lucide-react"

interface Appointment {
  id: string
  customerName: string
  phone: string
  email: string
  service: string
  additionalServices: string[]
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
}

function DashboardContent() {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      customerName: "Sarah Ahmed",
      phone: "+92 300 1234567",
      email: "sarah@email.com",
      service: "Facial Treatment",
      additionalServices: ["Eyebrow Shaping", "Hair Spa"],
      date: "2024-01-15",
      time: "10:00 AM",
      status: "upcoming",
    },
    {
      id: "2",
      customerName: "Fatima Khan",
      phone: "+92 301 2345678",
      email: "fatima@email.com",
      service: "Bridal Makeup",
      additionalServices: ["Mehendi Design", "Hair Styling"],
      date: "2024-01-12",
      time: "2:00 PM",
      status: "completed",
    },
    {
      id: "3",
      customerName: "Ayesha Ali",
      phone: "+92 302 3456789",
      email: "ayesha@email.com",
      service: "Hair Cut & Style",
      additionalServices: [],
      date: "2024-01-18",
      time: "11:30 AM",
      status: "upcoming",
    },
  ])

  const upcomingAppointments = appointments.filter((a) => a.status === "upcoming")
  const completedAppointments = appointments.filter((a) => a.status === "completed")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <AdminLayout currentPage="dashboard">
      <div className="min-h-screen bg-background">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Welcome Back, Admin</h1>
                  <p className="text-muted-foreground text-lg">Here's what's happening at Naz Beauty Zone today</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => (window.location.href = "/admin/appointments")}
              >
                <Plus className="w-5 h-5 mr-2" />
                New Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-muted transition-all duration-300 bg-transparent"
                onClick={() => (window.location.href = "/")}
              >
                <Eye className="w-5 h-5 mr-2" />
                View Website
              </Button>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">Today's Appointments</p>
                    <p className="text-3xl font-bold text-card-foreground">{upcomingAppointments.length}</p>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+12% from yesterday</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">Completed This Week</p>
                    <p className="text-3xl font-bold text-card-foreground">{completedAppointments.length}</p>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+8% from last week</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">Total Customers</p>
                    <p className="text-3xl font-bold text-card-foreground">{appointments.length}</p>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+15% this month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-card-foreground">₨45,000</p>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+22% from last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-4">
              <Card className="border-border shadow-lg bg-card h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-card-foreground flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Manage your business efficiently</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-between bg-primary hover:bg-primary/90 text-primary-foreground h-12 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => (window.location.href = "/admin/appointments")}
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3" />
                      View All Appointments
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between border-border text-foreground hover:bg-muted h-12 transition-all duration-300 bg-transparent"
                    onClick={() => (window.location.href = "/admin/gallery")}
                  >
                    <span className="flex items-center">
                      <ImageIcon className="w-4 h-4 mr-3" />
                      Manage Gallery
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between border-border text-foreground hover:bg-muted h-12 transition-all duration-300 bg-transparent"
                    onClick={() => (window.location.href = "/admin/customers")}
                  >
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-3" />
                      Customer Management
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between border-border text-foreground hover:bg-muted h-12 transition-all duration-300 bg-transparent"
                    onClick={() => (window.location.href = "/admin/reports")}
                  >
                    <span className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-3" />
                      View Reports
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between border-border text-foreground hover:bg-muted h-12 transition-all duration-300 bg-transparent"
                    onClick={() => (window.location.href = "/admin/settings")}
                  >
                    <span className="flex items-center">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Appointments */}
            <div className="lg:col-span-8">
              <Card className="border-border shadow-lg bg-card">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-card-foreground flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-primary" />
                        Recent Appointments
                      </CardTitle>
                      <CardDescription className="mt-1">Latest customer bookings and updates</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                      onClick={() => (window.location.href = "/admin/appointments")}
                    >
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-all duration-300 border border-border"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                            <Star className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-card-foreground">{appointment.customerName}</h3>
                            <p className="text-primary font-medium text-sm">{appointment.service}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {appointment.date}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {appointment.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {appointment.phone}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {appointment.email}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(appointment.status)} text-xs px-2 py-1 font-medium`}>
                            {appointment.status}
                          </Badge>
                          {appointment.additionalServices.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              +{appointment.additionalServices.length} add-ons
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Performance Metrics */}
          <Card className="border-border shadow-lg bg-card">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-card-foreground flex items-center justify-center">
                <Camera className="w-6 h-6 mr-2 text-primary" />
                Business Performance
              </CardTitle>
              <CardDescription className="text-lg">Key metrics and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-card-foreground font-semibold">Customer Satisfaction</div>
                  <div className="text-muted-foreground text-sm mt-1">Based on reviews</div>
                </div>

                <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">24</div>
                  <div className="text-card-foreground font-semibold">Weekly Appointments</div>
                  <div className="text-muted-foreground text-sm mt-1">Average bookings</div>
                </div>

                <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
                  <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Star className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">4.9</div>
                  <div className="text-card-foreground font-semibold">Average Rating</div>
                  <div className="text-muted-foreground text-sm mt-1">Out of 5 stars</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
