"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { AnimatedSection } from "./animated-section"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["Liquid Blue Guest House", "Limpopo, South Africa"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+27 68 240 4462"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["liquidblueltt@gmail.com"],
  },
  {
    icon: Clock,
    title: "Reception Hours",
    details: ["24 Hours", "Check-in: 14:00", "Check-out: 10:00"],
  },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-24 bg-card relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a2e4a]/8 text-[#1a2e4a] font-semibold tracking-wider uppercase text-xs">
            Get In Touch
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground text-balance">
            Contact Us
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Have questions or ready to book? We&apos;d love to hear from you.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <AnimatedSection>
            <h3 className="font-serif text-2xl font-medium text-foreground mb-8">
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 100}>
                  <div className="flex gap-4 group p-4 rounded-xl transition-all duration-300 hover:bg-secondary/5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center transition-all duration-300 group-hover:from-secondary group-hover:to-accent group-hover:shadow-lg group-hover:shadow-secondary/25">
                      <item.icon className="h-6 w-6 text-secondary transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-secondary transition-colors duration-300">{item.title}</h4>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Map Placeholder */}
            <AnimatedSection delay={400}>
              <div className="mt-8 h-64 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-center text-muted-foreground relative z-10">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-secondary" />
                  </div>
                  <p className="font-medium">Interactive map coming soon</p>
                  <p className="text-sm mt-1">Limpopo, South Africa</p>
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl p-8 shadow-lg border border-border/50 backdrop-blur-sm">
              <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} noValidate aria-label="Send us a message">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">
                      Full Name <span aria-hidden="true" className="text-red-600 ml-0.5">*</span>
                    </FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      aria-required="true"
                      autoComplete="name"
                      className="h-12 border-2 transition-all duration-300 focus:border-[#1a2e4a]"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">
                      Email Address <span aria-hidden="true" className="text-red-600 ml-0.5">*</span>
                    </FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      aria-required="true"
                      autoComplete="email"
                      className="h-12 border-2 transition-all duration-300 focus:border-[#1a2e4a]"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 68 240 4462"
                      autoComplete="tel"
                      className="h-12 border-2 transition-all duration-300 focus:border-[#1a2e4a]"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="message">
                      Message <span aria-hidden="true" className="text-red-600 ml-0.5">*</span>
                    </FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={4}
                      required
                      aria-required="true"
                      className="border-2 transition-all duration-300 focus:border-[#1a2e4a] resize-none"
                    />
                  </Field>

                  <p className="text-xs text-[#5c6a7a]">
                    Fields marked <span aria-hidden="true" className="text-red-600">*</span>
                    <span className="sr-only">with an asterisk</span> are required.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                    className="btn-brand w-full h-12 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          role="status"
                          aria-label="Sending message…"
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send Message
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </FieldGroup>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
