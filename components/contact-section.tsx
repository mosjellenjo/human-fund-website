"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import emailjs from 'emailjs-com'

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    donationCause: "",
    submitted: false,
    error: false,
  })

  const SERVICE_ID = 'service_g5xvxps'
  const TEMPLATE_ID = 'template_ieyv5x9'
  const PUBLIC_KEY = 'KjM4ydjWIbZpDNvN_'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState({ ...formState, error: false })
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      name: formState.name,
      email: formState.email,
      message: formState.message,
      donation_cause: formState.donationCause || 'General Inquiry',
    }, PUBLIC_KEY)
      .then(() => {
    setFormState({
      name: "",
      email: "",
      message: "",
          donationCause: "",
          submitted: true,
          error: false,
        })
      }, (error) => {
        setFormState({ ...formState, error: true })
        alert('Failed to send message. Please try again.')
    })
  }

  return (
    <section id="contact" className="w-full hf-section bg-dark-green text-white">
      <div className="hf-container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="hf-heading">Contact & Donations</h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions or want to make a donation? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <Card className="bg-brand-bg-elevated text-light-green-text border border-brand-accent/30">
              <CardHeader>
                {/* Removed Contact Us title and description for clarity */}
              </CardHeader>
              <CardContent>
                {formState.submitted ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                      <p className="text-light-green-text">Your message has been received. We'll be in touch soon.</p>
                    </div>
                    <Button onClick={() => setFormState({ ...formState, submitted: false })} variant="brand">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-green-text"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                        className="bg-brand-bg-elevated text-white border-brand-accent/30 focus-visible:ring-brand-accent/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-green-text"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        className="bg-brand-bg-elevated text-white border-brand-accent/30 focus-visible:ring-brand-accent/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="donation-cause"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-green-text"
                      >
                        Donation Cause (optional)
                      </label>
                      <select
                        id="donation-cause"
                        name="donation_cause"
                        value={formState.donationCause || ''}
                        onChange={e => setFormState({ ...formState, donationCause: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-brand-accent/30 bg-brand-bg-elevated px-3 py-2 text-base text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50 focus-visible:ring-offset-2 md:text-sm"
                      >
                        <option value="" className="bg-brand-bg-elevated">General Inquiry</option>
                        <option value="Festivus for the Rest of Us" className="bg-brand-bg-elevated">Festivus for the Rest of Us — Keep the tradition alive — aluminum poles aren't cheap.</option>
                        <option value="The Anti-Dentite Defense Fund" className="bg-brand-bg-elevated">The Anti-Dentite Defense Fund — Fighting unfair bias against dentists everywhere.</option>
                        <option value="Serenity Now Research Initiative" className="bg-brand-bg-elevated">Serenity Now Research Initiative — Advancing anger management through loud shouting.</option>
                        <option value="Save the Kramerica Intern Program" className="bg-brand-bg-elevated">Save the Kramerica Intern Program — One intern. One oil bladder. Endless possibilities.</option>
                        <option value="The Vandelay Industries Innovation Lab" className="bg-brand-bg-elevated">The Vandelay Industries Innovation Lab — Supporting latex research and import-export operations.</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-green-text"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Enter your message"
                        className="min-h-[120px] bg-brand-bg-elevated text-white border-brand-accent/30 focus-visible:ring-brand-accent/50"
                        required
                      />
                    </div>
                    <Button type="submit" variant="brand" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white">Visit Us</h3>
              <address className="not-italic text-light-green-text mt-2">
                <p>The Human Fund</p>
                <p>42 Integrity Street</p>
                <p>0170 Oslo, Norway</p>
              </address>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              <div className="text-light-green-text mt-2">
                <p>Email: jo@humanfund.no</p>
                <p>Phone: +47 815 HUMAN</p>
                <p>Festivus Hotline: +47 815 POLE</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Hours</h3>
              <div className="text-light-green-text mt-2">
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday: 10am - 2pm</p>
                <p>Sunday: Closed</p>
                <p className="italic mt-2">Extended hours during Festivus season</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
