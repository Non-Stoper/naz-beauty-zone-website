"use client"

import type React from "react"
import { GallerySection } from "@/components/gallery-section"

import { Phone, Mail, MapPin, Star, Heart, Sparkles, Calendar, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
    additionalServices: [] as string[],
  })

  const additionalServices = [
    { id: "eyebrow-shaping", label: "Eyebrow Shaping" },
    { id: "hair-wash", label: "Hair Wash & Blow Dry" },
    { id: "face-massage", label: "Face Massage" },
    { id: "hair-spa", label: "Hair Spa Treatment" },
    { id: "nail-polish", label: "Nail Polish Application" },
    { id: "mehendi", label: "Mehendi/Henna Design" },
    { id: "hair-treatment", label: "Deep Hair Treatment" },
    { id: "face-cleanup", label: "Face Cleanup" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const additionalServicesText =
      formData.additionalServices.length > 0
        ? `\nAdditional Services: ${formData.additionalServices
            .map((serviceId) => {
              const service = additionalServices.find((s) => s.id === serviceId)
              return service?.label
            })
            .join(", ")}`
        : ""

    const message = `Hello! I'd like to book an appointment at Naz Beauty Zone.
    
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service}${additionalServicesText}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Message: ${formData.message}`

    const whatsappUrl = `https://wa.me/919163255331?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: checked
        ? [...prev.additionalServices, serviceId]
        : prev.additionalServices.filter((id) => id !== serviceId),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/95 border-b border-border sticky top-0 z-50 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-playfair font-bold text-primary">Naz Beauty Zone</h1>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </nav>
            <Button variant="default" className="hidden md:inline-flex" onClick={() => scrollToSection("appointment")}>
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-card to-muted py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-playfair font-bold text-primary mb-6 text-balance">
              Where Beauty Meets Elegance
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty">
              Expert care in makeup, hair, and skincare—crafted just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => scrollToSection("appointment")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
                onClick={() => scrollToSection("contact")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/elegant-beauty-salon-interior-with-soft-pink-light.jpg')] bg-cover bg-center opacity-10"></div>
      </section>

      {/* Quick Contact Block */}
      <section id="contact" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <a href="tel:+919163255331" className="text-primary hover:underline">
                  +91 9163255331
                </a>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <a href="mailto:nazbeautyzone@gmail.com" className="text-primary hover:underline">
                  nazbeautyzone@gmail.com
                </a>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <a
                  href="https://maps.google.com/?q=near+New+Malatala,+Beramohall,+Pandua,+West+Bengal+712149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Near New Malatala, Beramohall
                  <br />
                  Pandua, West Bengal 712149
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold text-primary mb-8">Business Hours</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-medium">Saturday - Wednesday</span>
                    <span className="text-primary">8:30 AM - 8:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-medium">Thursday</span>
                    <span className="text-primary">10:00 AM - 8:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Friday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-8">About Naz Beauty Zone</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Naz Beauty Zone, we believe that every woman deserves to feel beautiful and confident. Our expert team
              combines years of experience with the latest beauty techniques to provide personalized care that enhances
              your natural beauty. From bridal makeovers to everyday styling, we're dedicated to making you look and
              feel your absolute best.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Personalized Care</h3>
                <p className="text-muted-foreground">Tailored treatments for your unique beauty needs</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Team</h3>
                <p className="text-muted-foreground">Skilled professionals with years of experience</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Premium Products</h3>
                <p className="text-muted-foreground">High-quality beauty products and treatments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">Comprehensive beauty solutions for every occasion</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Hair Styling</CardTitle>
                <CardDescription>Professional cuts, colors, and styling for all hair types</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Makeup Services</CardTitle>
                <CardDescription>Bridal, party, and everyday makeup by expert artists</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Skincare Treatments</CardTitle>
                <CardDescription>Facials, cleansing, and anti-aging treatments</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Bridal Packages</CardTitle>
                <CardDescription>Complete bridal makeover packages for your special day</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Nail Care</CardTitle>
                <CardDescription>Manicures, pedicures, and nail art services</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Threading & Waxing</CardTitle>
                <CardDescription>Professional hair removal and eyebrow shaping</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <GallerySection />

      {/* Appointment Form */}
      <section id="appointment" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Book Your Appointment</h2>
              <p className="text-lg text-muted-foreground">Ready to enhance your beauty? Schedule your visit today!</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9163255331"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Primary Service</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hair">Hair Styling</SelectItem>
                        <SelectItem value="makeup">Makeup Services</SelectItem>
                        <SelectItem value="skincare">Skincare Treatment</SelectItem>
                        <SelectItem value="bridal">Bridal Package</SelectItem>
                        <SelectItem value="nails">Nail Care</SelectItem>
                        <SelectItem value="threading">Threading & Waxing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Additional Services (Optional)</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select any additional services you'd like to add to your appointment
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {additionalServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={service.id}
                            checked={formData.additionalServices.includes(service.id)}
                            onCheckedChange={(checked) => handleAdditionalServiceChange(service.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={service.id} className="text-sm font-medium cursor-pointer">
                              {service.label}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Any special requests or questions?"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>
                  <Button variant="default" type="submit" className="w-full" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4">Naz Beauty Zone</h3>
              <p className="mb-4">Where Beauty Meets Elegance</p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/nazbeautyzone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://facebook.com/nazbeautyzone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com/nazbeautyzone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href="tel:+919163255331">+91 9163255331</a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:nazbeautyzone@gmail.com">nazbeautyzone@gmail.com</a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-1" />
                  <span className="text-sm">
                    Near New Malatala, Beramohall
                    <br />
                    Pandua, West Bengal 712149
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sat - Wed:</span>
                  <span>8:30 AM - 8:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Thursday:</span>
                  <span>10:00 AM - 8:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm">&copy; 2024 Naz Beauty Zone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
