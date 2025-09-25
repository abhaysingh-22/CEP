import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Thermometer, Building2, Users, Leaf, TrendingDown, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Impact = () => {
  const impactCategories = [
    {
      id: "environment",
      title: "Environmental Impact",
      icon: Leaf,
      color: "text-green-500",
      impacts: [
        {
          title: "Rising Temperatures",
          description: "Global warming is changing seasonal patterns and making some destinations uncomfortably hot during traditional peak seasons.",
          severity: "High"
        },
        {
          title: "Extreme Weather Events",
          description: "Increased frequency of hurricanes, floods, and droughts disrupts travel plans and damages tourism infrastructure.",
          severity: "High"
        },
        {
          title: "Ecosystem Disruption",
          description: "Climate change affects wildlife migration patterns and breeding cycles, impacting eco-tourism experiences.",
          severity: "Medium"
        },
        {
          title: "Water Scarcity",
          description: "Changing precipitation patterns and increased temperatures lead to water shortages in popular destinations.",
          severity: "High"
        }
      ]
    },
    {
      id: "industry",
      title: "Tourism Industry Impact",
      icon: Building2,
      color: "text-blue-500",
      impacts: [
        {
          title: "Destination Loss",
          description: "Sea level rise and extreme weather threaten iconic destinations like coral reefs and ski resorts.",
          severity: "High"
        },
        {
          title: "Increased Operational Costs",
          description: "Higher energy costs for cooling, heating, and infrastructure protection due to climate changes.",
          severity: "Medium"
        },
        {
          title: "Seasonal Disruption",
          description: "Traditional travel seasons are shifting, affecting booking patterns and revenue streams.",
          severity: "Medium"
        },
        {
          title: "Insurance Costs",
          description: "Rising insurance premiums due to increased climate-related risks and damages.",
          severity: "Medium"
        }
      ]
    },
    {
      id: "communities",
      title: "Local Communities Impact",
      icon: Users,
      color: "text-purple-500",
      impacts: [
        {
          title: "Job Displacement",
          description: "Tourism-dependent communities face unemployment as destinations become less viable due to climate change.",
          severity: "High"
        },
        {
          title: "Cultural Heritage at Risk",
          description: "Rising sea levels and extreme weather threaten historical sites and cultural landmarks.",
          severity: "High"
        },
        {
          title: "Economic Instability",
          description: "Communities heavily reliant on tourism face economic uncertainty as visitor patterns change.",
          severity: "Medium"
        },
        {
          title: "Forced Migration",
          description: "Some communities may need to relocate due to sea level rise or extreme weather events.",
          severity: "High"
        }
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "text-red-500 bg-red-50";
      case "Medium": return "text-orange-500 bg-orange-50";
      case "Low": return "text-green-500 bg-green-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Climate Change Impacts
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore how climate change affects the environment, tourism industry, and local communities worldwide.
          </motion.p>
        </div>
      </section>

      {/* Impact Overview Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Understanding the Impact</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Climate change affects tourism through multiple interconnected pathways, creating challenges for destinations, businesses, and communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-gradient-card">
                    <CardHeader className="text-center">
                      <Icon className={`h-16 w-16 mx-auto mb-4 ${category.color}`} />
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <span className="text-sm text-muted-foreground">
                          {category.impacts.length} key impacts
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Impact Accordion */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Detailed Impact Analysis</h2>
            <p className="text-xl text-muted-foreground">
              Explore specific impacts within each category to understand the full scope of climate change effects on tourism.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {impactCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <AccordionItem key={category.id} value={category.id} className="border-none">
                    <Card className="shadow-card-eco border-none bg-card">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center text-left">
                          <Icon className={`h-8 w-8 mr-4 ${category.color}`} />
                          <div>
                            <h3 className="text-xl font-semibold text-card-foreground">{category.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Click to explore {category.impacts.length} specific impacts
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="space-y-4 mt-4">
                          {category.impacts.map((impact, index) => (
                            <div key={index} className="p-4 rounded-lg bg-muted/50">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-card-foreground">{impact.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(impact.severity)}`}>
                                  {impact.severity}
                                </span>
                              </div>
                              <p className="text-muted-foreground text-sm leading-relaxed">{impact.description}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-nature-warning" />
            <h2 className="text-4xl font-bold mb-6">The Time to Act is Now</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
              Understanding these impacts is the first step toward sustainable tourism. By making informed choices and supporting climate-conscious travel practices, we can help mitigate these effects and protect the destinations we love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/calculator"
                className="inline-flex items-center px-6 py-3 bg-nature-accent hover:bg-nature-accent/90 text-white rounded-md font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate Your Impact
              </motion.a>
              <motion.a
                href="/tips"
                className="inline-flex items-center px-6 py-3 border border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground rounded-md font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn Sustainable Practices
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Impact;