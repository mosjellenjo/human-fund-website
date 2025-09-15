"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Reveal } from "@/components/reveal"
import { useEffect, useState } from "react"

const impactData = [
  { year: "2018", volunteers: 240, projects: 12 },
  { year: "2019", volunteers: 450, projects: 18 },
  { year: "2020", volunteers: 650, projects: 24 },
  { year: "2021", volunteers: 1200, projects: 36 },
  { year: "2022", volunteers: 2100, projects: 48 },
  { year: "2023", volunteers: 3800, projects: 62 },
]

export function ImpactSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading skeleton
  }

  return (
    <section id="impact" className="w-full hf-section bg-dark-green text-light-green-text">
      <div className="hf-container">
        <Reveal className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="hf-heading">Our Impact</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how your support has made a difference in the lives of people everywhere.
            </p>
          </div>
        </Reveal>
        <Reveal className="mx-auto max-w-4xl py-12">
          <Tabs defaultValue="volunteers" className="w-full">
            <TabsList aria-label="Impact charts" className="grid w-full grid-cols-2 bg-brand-bg-elevated text-light-green-text">
              <TabsTrigger value="volunteers" className="data-[state=active]:bg-brand-bg data-[state=active]:text-light-green-text">Volunteers</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-brand-bg data-[state=active]:text-light-green-text">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="volunteers" className="pt-4">
              <Card className="hf-glass text-light-green-text">
                <CardHeader>
                  <CardTitle>Annual Volunteers</CardTitle>
                  <CardDescription className="text-gray-400">Total volunteers engaged per year</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto w-full">
                  <div className="min-w-[350px] sm:min-w-0 w-full bg-dark-green/70 backdrop-blur rounded-lg p-4">
                    <ChartContainer
                      config={{
                        volunteers: {
                          label: "Volunteers",
                          color: "hsl(var(--button-yellow))",
                        },
                      }}
                      className="h-[250px] sm:h-[400px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={impactData} margin={{ left: 0, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#35504a" />
                          <XAxis dataKey="year" padding={{ right: 30 }} stroke="#cbd5e1" />
                          <YAxis width={48} tickFormatter={(value) => (value / 10).toString()} stroke="#cbd5e1" />
                          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                          <Bar dataKey="volunteers" fill="hsl(var(--button-yellow))" activeBar={{ fill: "hsl(var(--button-yellow))", fillOpacity: 1, stroke: "rgba(140,255,218,0.9)", strokeWidth: 1.2 }} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects" className="pt-4">
              <Card className="hf-glass text-light-green-text">
                <CardHeader>
                  <CardTitle>Projects Completed</CardTitle>
                  <CardDescription className="text-gray-400">Number of projects completed per year</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto w-full">
                  <div className="min-w-[350px] sm:min-w-0 w-full bg-dark-green/70 backdrop-blur rounded-lg p-4">
                    <ChartContainer
                      config={{
                        projects: {
                          label: "Projects",
                          color: "hsl(var(--light-green))",
                        },
                      }}
                      className="h-[250px] sm:h-[400px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={impactData} margin={{ left: 0, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#35504a" />
                          <XAxis dataKey="year" padding={{ right: 30 }} stroke="#cbd5e1" />
                          <YAxis width={48} tickFormatter={(value) => (value / 2).toString()} stroke="#cbd5e1" />
                          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                          <Bar dataKey="projects" fill="hsl(var(--light-green))" activeBar={{ fill: "hsl(var(--light-green))", fillOpacity: 1, stroke: "rgba(140,255,218,0.9)", strokeWidth: 1.2 }} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Reveal>
        <Reveal className="grid gap-6 md:grid-cols-3">
          <Card className="hf-glass text-light-green-text">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Education Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-gray-400">Schools supported across 15 countries</p>
            </CardContent>
          </Card>
          <Card className="hf-glass text-light-green-text">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Healthcare Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-gray-400">Medical facilities funded and supported</p>
            </CardContent>
          </Card>
          <Card className="hf-glass text-light-green-text">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Festivus Celebrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">397</div>
              <p className="text-xs text-gray-400">Aluminum poles distributed worldwide</p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
