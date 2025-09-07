"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Phone, Mail, Calendar, Star, Filter, Download, UserPlus, Eye, Edit, Trash2 } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalAppointments: number
  lastVisit: string
  totalSpent: number
  status: "active" | "inactive"
  rating: number
}

function CustomersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "Sarah Ahmed",
      email: "sarah@email.com",
      phone: "+92 300 1234567",
      totalAppointments: 8,
      lastVisit: "2024-01-15",
      totalSpent: 15000,
      status: "active",
      rating: 5,
    },
    {
      id: "2",
      name: "Fatima Khan",
      email: "fatima@email.com",
      phone: "+92 301 2345678",
      totalAppointments: 12,
      lastVisit: "2024-01-12",
      totalSpent: 22000,
      status: "active",
      rating: 4.8,
    },
    {
      id: "3",
      name: "Ayesha Ali",
      email: "ayesha@email.com",
      phone: "+92 302 3456789",
      totalAppointments: 5,
      lastVisit: "2024-01-10",
      totalSpent: 8500,
      status: "active",
      rating: 4.9,
    },
  ])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  return (
    <AdminLayout currentPage="customers">
      <div className="min-h-screen bg-background">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Customer Management</h1>
              <p className="text-muted-foreground text-lg">Manage your customer relationships</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add Customer
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search customers by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Customers</p>
                    <p className="text-2xl font-bold">{customers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Customers</p>
                    <p className="text-2xl font-bold">{customers.filter((c) => c.status === "active").length}</p>
                  </div>
                  <Star className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg. Rating</p>
                    <p className="text-2xl font-bold">4.9</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">₨45,500</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
              <CardDescription>Manage your customer database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {customer.email}
                          </span>
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {customer.phone}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{customer.totalAppointments} appointments</span>
                          <span>₨{customer.totalSpent.toLocaleString()} spent</span>
                          <span className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            {customer.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default function CustomersPage() {
  return (
    <AuthGuard>
      <CustomersContent />
    </AuthGuard>
  )
}
