"use client"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import emailjs from 'emailjs-com'

export function TeamSection() {
  const [contactOpen, setContactOpen] = useState<null | 'joseph' | 'art' | 'van'>(null)
  const [bioOpen, setBioOpen] = useState<null | 'joseph' | 'art' | 'van'>(null)

  const SERVICE_ID = 'service_g5xvxps'
  const TEMPLATE_ID = 'template_ieyv5x9'
  const PUBLIC_KEY = 'KjM4ydjWIbZpDNvN_'

  const [form, setForm] = useState({ name: '', email: '', donationCause: '', message: '' })

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: form.name,
        email: form.email,
        message: form.message,
        donation_cause: form.donationCause || 'General Inquiry',
      }, PUBLIC_KEY)
      setForm({ name: '', email: '', donationCause: '', message: '' })
      setContactOpen(null)
      alert('Message sent. Thanks for reaching out!')
    } catch (err) {
      alert('Failed to send. Please try again.')
    }
  }

  return (
    <section id="team" className="w-full hf-section bg-dark-green text-light-green-text">
      <div className="hf-container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="hf-heading">Our Team</h2>
            <p className="hf-subtext text-gray-300">
              Meet the dedicated individuals behind The Human Fund.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card className="overflow-hidden bg-brand-bg-elevated text-light-green-text border border-brand-accent/30">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative overflow-hidden">
                <Image src="/images/Joseph 3.png" alt="Joseph B. Dale" fill className="object-cover object-[center_28%] scale-[1.42]" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Joseph B. Dale</CardTitle>
              <CardDescription className="text-gray-400">Founder & President</CardDescription>
              <p className="mt-4 text-gray-400">
                Founded The Human Fund to promote people-first innovation, social betterment, and holiday gift
                avoidance.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 border-brand-accent/30">
              <Button variant="brandFancy" size="sm" onClick={() => setContactOpen('joseph')}>Contact</Button>
              <Button variant="brandFancy" size="sm" onClick={() => setBioOpen('joseph')}>Bio</Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden bg-brand-bg-elevated text-light-green-text border border-brand-accent/30">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative">
                <Image src="/images/Art V 2.png" alt="Art Vandelay" fill className="object-cover object-[center_40%]" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Art Vandelay</CardTitle>
              <CardDescription className="text-gray-400">Head of Global Strategy</CardDescription>
              <p className="mt-4 text-gray-400">
                Renowned importer/exporter and part-time architect. Passionate about marine life, supply chains, and
                vague deliverables.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 border-brand-accent/30">
              <Button variant="brandFancy" size="sm" onClick={() => setContactOpen('art')}>Contact</Button>
              <Button variant="brandFancy" size="sm" onClick={() => setBioOpen('art')}>Bio</Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden bg-brand-bg-elevated text-light-green-text border border-brand-accent/30">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative">
                <Image
                  src="/images/Van Nostren 1.png"
                  alt="Dr. Van Nostrand"
                  fill
                  className="object-cover object-[center_30%]"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Dr. Van Nostrand</CardTitle>
              <CardDescription className="text-gray-400">Chief Wellness Officer</CardDescription>
              <p className="mt-4 text-gray-400">
                Licensed (somewhere) in dermatology, dentistry, and proctology. Specializes in ambiguous medical
                insights and untraceable prescriptions.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 border-brand-accent/30">
              <Button variant="brandFancy" size="sm" onClick={() => setContactOpen('van')}>Contact</Button>
              <Button variant="brandFancy" size="sm" onClick={() => setBioOpen('van')}>Bio</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Contact Modal */}
      <Dialog open={contactOpen !== null} onOpenChange={() => setContactOpen(null)}>
        <DialogContent className="bg-brand-bg-elevated text-white border border-brand-accent/30 hf-glass-strong max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Contact The Human Fund</DialogTitle>
          </DialogHeader>
          <div className="h-px bg-brand-accent/30 my-2" />
          <form onSubmit={submitContact} className="space-y-3 mt-2">
            <div>
              <label className="text-sm text-gray-300" htmlFor="tm-name">Name</label>
              <Input id="tm-name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="bg-brand-bg-elevated text-white border-brand-accent/30 focus-visible:ring-brand-accent/50" required />
            </div>
            <div>
              <label className="text-sm text-gray-300" htmlFor="tm-email">Email</label>
              <Input id="tm-email" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="bg-brand-bg-elevated text-white border-brand-accent/30 focus-visible:ring-brand-accent/50" required />
            </div>
            <div>
              <label className="text-sm text-gray-300" htmlFor="tm-cause">Donation Cause (optional)</label>
              <select id="tm-cause" value={form.donationCause} onChange={(e)=>setForm({...form,donationCause:e.target.value})} className="flex h-10 w-full rounded-md border border-brand-accent/30 bg-brand-bg-elevated px-3 py-2 text-base text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50 focus-visible:ring-offset-2 md:text-sm">
                <option value="" className="bg-brand-bg-elevated">General Inquiry</option>
                <option value="Festivus for the Rest of Us" className="bg-brand-bg-elevated">Festivus for the Rest of Us</option>
                <option value="The Anti-Dentite Defense Fund" className="bg-brand-bg-elevated">The Anti-Dentite Defense Fund</option>
                <option value="Serenity Now Research Initiative" className="bg-brand-bg-elevated">Serenity Now Research Initiative</option>
                <option value="Save the Kramerica Intern Program" className="bg-brand-bg-elevated">Save the Kramerica Intern Program</option>
                <option value="The Vandelay Industries Innovation Lab" className="bg-brand-bg-elevated">The Vandelay Industries Innovation Lab</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300" htmlFor="tm-msg">Message</label>
              <Textarea id="tm-msg" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} className="min-h-[120px] bg-brand-bg-elevated text-white border-brand-accent/30 focus-visible:ring-brand-accent/50" required />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="brandOutline" onClick={()=>setContactOpen(null)}>Cancel</Button>
              <Button type="submit" variant="brandFancy">Send Message</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Bio Modal */}
      <Dialog open={bioOpen !== null} onOpenChange={() => setBioOpen(null)}>
        <DialogContent className="bg-brand-bg-elevated text-white border border-brand-accent/30 hf-glass-strong max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{bioOpen === 'art' ? 'Art Vandelay' : bioOpen === 'van' ? 'Dr. Van Nostrand' : 'Joseph B. Dale'}</DialogTitle>
          </DialogHeader>
          <div className="h-px bg-brand-accent/30 my-2" />
          <div className="hf-prose-dark text-left space-y-4">
            {bioOpen === 'joseph' && (
              <>
                <p>Joseph B. Dale founded The Human Fund with a simple belief. When technology stays humble and people stay centered, good things happen. He thinks in systems, speaks in outcomes, and prefers clarity over hype.</p>
                <p>He keeps the organization focused on practical tools that actually help humans, not just impressive dashboards. His leadership style is light on jargon, heavy on accountability, and quietly appreciative of alternative holidays.</p>
                <p>When he is not shaping strategy, Joseph asks precise questions, rewrites long sentences to be shorter, and reminds everyone that “money for people” is not a slogan. It is the operating system.</p>
              </>
            )}
            {bioOpen === 'art' && (
              <>
                <p>Art Vandelay leads global strategy with experience in import and export and a suspicious amount of architectural knowledge. If there is a route, he will optimize it. If there is a blueprint, he will improve it, ideally with a dramatic reveal.</p>
                <p>Art turns ambiguity into action. Supply chains, partnerships, market entries. He believes every constraint hides an opportunity, and some of those opportunities involve shipping containers and latex research.</p>
                <p>Outside the office, Art likes ocean brainstorming, speculative urban planning, and short meetings that end with clear outcomes and a handshake, even when it is just him.</p>
              </>
            )}
            {bioOpen === 'van' && (
              <>
                <p>Dr. Van Nostrand brings a wide view of wellness to The Human Fund. Dermatology, dentistry, and proctology are all on the resume, along with an unusual ability to arrive exactly when needed. Credentials are complicated. The commitment to people is simple.</p>
                <p>He designs programs that reduce friction, increase dignity, and keep morale high. That means fewer forms, more humanity, and just enough mystery to keep the day interesting.</p>
                <p>When not improving outcomes, the Doctor prescribes sunshine, reminds teams to hydrate, and quietly tests the limits of professional titles.</p>
              </>
            )}
          </div>
          <div className="flex justify-end pt-3">
            <Button variant="brandFancy" onClick={()=>setBioOpen(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
