"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
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
  status: "upcoming" | "completed" | "cancelled" | "confirmed"
  message?: string
  createdAt: string
}

function AppointmentsContent() {
  const [appointments, setAppointments] = useState<Appointment[]>([
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
      message: "First time customer, please be gentle with sensitive skin",
      createdAt: "2024-01-10",
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
      message: "Wedding on January 13th, need early morning setup",
      createdAt: "2024-01-08",
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
      status: "confirmed",
      message: "",
      createdAt: "2024-01-12",
    },
    {
      id: "4",
      customerName: "Zara Sheikh",
      phone: "+92 303 4567890",
      email: "zara@email.com",
      service: "Skincare Treatment",
      additionalServices: ["Face Massage"],
      date: "2024-01-20",
      time: "3:00 PM",
      status: "upcoming",
      message: "Has acne-prone skin, please use gentle products",
      createdAt: "2024-01-13",
    },
    {
      id: "5",
      customerName: "Nadia Malik",
      phone: "+92 304 5678901",
      email: "nadia@email.com",
      service: "Hair Styling",
      additionalServices: ["Nail Polish Application"],
      date: "2024-01-10",
      time: "4:00 PM",
      status: "cancelled",
      message: "Party cancelled, will reschedule later",
      createdAt: "2024-01-05",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const updateAppointmentStatus = (id: string, newStatus: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === id ? { ...appointment, status: newStatus } : appointment)),
    )
  }

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    const today = new Date().toISOString().split("T")[0]
    const appointmentDate = appointment.date

    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = appointmentDate === today
    } else if (dateFilter === "upcoming") {
      matchesDate = appointmentDate >= today && appointment.status !== "completed" && appointment.status !== "cancelled"
    } else if (dateFilter === "past") {
      matchesDate = appointmentDate < today || appointment.status === "completed"
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="w-3 h-3" />
      case "confirmed":
        return <CheckCircle className="w-3 h-3" />
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      case "cancelled":
        return <XCircle className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  const appointmentStats = {
    total: appointments.length,
    upcoming: appointments.filter((a) => a.status === "upcoming").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  }

  return (
    <AdminLayout currentPage="appointments">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-rose-800 mb-2">Appointment Management</h1>
          <p className="text-rose-600">View, manage, and track all customer appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{appointmentStats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{appointmentStats.upcoming}</div>
              <div className="text-sm text-blue-600">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{appointmentStats.confirmed}</div>
              <div className="text-sm text-green-600">Confirmed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-700">{appointmentStats.completed}</div>
              <div className="text-sm text-emerald-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-700">{appointmentStats.cancelled}</div>
              <div className="text-sm text-red-600">Cancelled</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
          <CardHeader>
            <CardTitle className="text-rose-800 font-playfair flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-rose-200 focus:border-rose-400 focus:ring-rose-400">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-rose-200 focus:border-rose-400 focus:ring-rose-400">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600 flex items-center">
                Showing {filteredAppointments.length} of {appointments.length} appointments
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
          <CardHeader>
            <CardTitle className="text-rose-800 font-playfair flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Appointments ({filteredAppointments.length})
            </CardTitle>
            <CardDescription>Manage customer appointments and update their status</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-rose-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Customer Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.customerName}</h3>
                          <Badge className={`${getStatusColor(appointment.status)} flex items-center gap-1`}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              Phone:
                            </span>
                            <p className="text-gray-600">{appointment.phone}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              Email:
                            </span>
                            <p className="text-gray-600">{appointment.email}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Date & Time:
                            </span>
                            <p className="text-gray-600">
                              {appointment.date} at {appointment.time}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Service:</span>
                            <p className="text-gray-600">{appointment.service}</p>
                          </div>
                        </div>

                        {appointment.additionalServices.length > 0 && (
                          <div className="mt-2">
                            <span className="font-medium text-gray-700 text-sm">Additional Services:</span>
                            <p className="text-gray-600 text-sm">{appointment.additionalServices.join(", ")}</p>
                          </div>
                        )}

                        {appointment.message && (
                          <div className="mt-2">
                            <span className="font-medium text-gray-700 text-sm">Message:</span>
                            <p className="text-gray-600 text-sm italic">"{appointment.message}"</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:w-48">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedAppointment(appointment)}
                            className="border-rose-300 text-rose-700 hover:bg-rose-50 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteAppointment(appointment.id)}
                            className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Status Update Buttons */}
                        <div className="flex gap-1">
                          {appointment.status === "upcoming" && (
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1"
                            >
                              Confirm
                            </Button>
                          )}
                          {(appointment.status === "upcoming" || appointment.status === "confirmed") && (
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-2 py-1"
                            >
                              Complete
                            </Button>
                          )}
                          {appointment.status !== "cancelled" && appointment.status !== "completed" && (
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                              className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointment Detail Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-rose-800 font-playfair">Appointment Details</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAppointment(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700">Customer Name</label>
                    <p className="text-gray-900">{selectedAppointment.customerName}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Status</label>
                    <Badge className={`${getStatusColor(selectedAppointment.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(selectedAppointment.status)}
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900">{selectedAppointment.phone}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedAppointment.email}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Date</label>
                    <p className="text-gray-900">{selectedAppointment.date}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Time</label>
                    <p className="text-gray-900">{selectedAppointment.time}</p>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Primary Service</label>
                  <p className="text-gray-900">{selectedAppointment.service}</p>
                </div>

                {selectedAppointment.additionalServices.length > 0 && (
                  <div>
                    <label className="font-medium text-gray-700">Additional Services</label>
                    <p className="text-gray-900">{selectedAppointment.additionalServices.join(", ")}</p>
                  </div>
                )}

                {selectedAppointment.message && (
                  <div>
                    <label className="font-medium text-gray-700">Customer Message</label>
                    <p className="text-gray-900 italic">"{selectedAppointment.message}"</p>
                  </div>
                )}

                <div>
                  <label className="font-medium text-gray-700">Booking Date</label>
                  <p className="text-gray-900">{selectedAppointment.createdAt}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default function AdminAppointments() {
  return (
    <AuthGuard>
      <AppointmentsContent />
    </AuthGuard>
  )
}
