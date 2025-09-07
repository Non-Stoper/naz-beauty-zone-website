"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Save, Bell, Clock, Palette } from "lucide-react"

function SettingsContent() {
  const [settings, setSettings] = useState({
    businessName: "Naz Beauty Zone",
    email: "admin@nazbeautyzone.com",
    phone: "+92 300 1234567",
    address: "123 Beauty Street, Lahore, Pakistan",
    description: "Professional beauty salon offering premium services",
    workingHours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "Closed",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      appointmentReminders: true,
      marketingEmails: false,
    },
    appearance: {
      primaryColor: "#ec4899",
      darkMode: false,
    },
  })

  const handleSave = () => {
    // Save settings logic here
    alert("Settings saved successfully!")
  }

  return (
    <AdminLayout currentPage="settings">
      <div className="min-h-screen bg-background">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground text-lg">Manage your business settings and preferences</p>
            </div>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Business Information
              </CardTitle>
              <CardDescription>Update your business details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Working Hours
              </CardTitle>
              <CardDescription>Set your business operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(settings.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between">
                    <Label className="capitalize font-medium w-24">{day}</Label>
                    <Input
                      value={hours}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          workingHours: { ...settings.workingHours, [day]: e.target.value },
                        })
                      }
                      className="max-w-xs"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNotifications: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.notifications.smsNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, smsNotifications: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders to customers</p>
                </div>
                <Switch
                  checked={settings.notifications.appointmentReminders}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, appointmentReminders: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of your admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                </div>
                <Switch
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, darkMode: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, primaryColor: e.target.value },
                      })
                    }
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.appearance.primaryColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, primaryColor: e.target.value },
                      })
                    }
                    className="max-w-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  )
}
