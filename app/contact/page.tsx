"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"
import { submitContactForm } from "@/app/actions/contact"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)

    const result = await submitContactForm(formData)

    if (result.success) {
      setMessage({ type: "success", text: "Message sent successfully! We'll get back to you soon." })
      ;(e.target as HTMLFormElement).reset()
    } else {
      setMessage({ type: "error", text: result.error || "Failed to send message. Please try again." })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 p-6 md:p-8 rounded-3xl animate-in fade-in slide-in-from-left duration-700">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input name="name" placeholder="Enter your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input type="tel" name="phone" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <Input name="subject" placeholder="How can we help?" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea name="message" placeholder="Tell us more about your inquiry..." rows={5} required />
                </div>

                {message && (
                  <div
                    className={`p-4 rounded-lg ${
                      message.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      color: "from-primary to-emerald-500",
                      title: "Email",
                      lines: ["support@healthymeal.in", "business@healthymeal.in"],
                    },
                    {
                      icon: Phone,
                      color: "from-orange-500 to-amber-500",
                      title: "Phone",
                      lines: ["+91 1800-123-4567", "+91 98765-43210"],
                    },
                    {
                      icon: MapPin,
                      color: "from-yellow-500 to-orange-400",
                      title: "Head Office",
                      lines: ["123, Cloud Kitchen Complex", "Andheri East, Mumbai - 400069", "Maharashtra, India"],
                    },
                    {
                      icon: Clock,
                      color: "from-pink-500 to-rose-500",
                      title: "Business Hours",
                      lines: ["Monday - Sunday: 7:00 AM - 11:00 PM", "Customer Support: 24/7"],
                    },
                  ].map((info, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-accent/50 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        {info.lines.map((line, j) => (
                          <p key={j} className="text-sm text-muted-foreground">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/mumbai-map-location-pin.jpg" alt="Location Map" className="w-full h-64 object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="container mx-auto px-4 py-8 md:py-16 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary to-orange-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-base md:text-lg mb-6 text-white/90 px-4">
              Check out our FAQ section for quick answers to common questions.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              View FAQ
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
